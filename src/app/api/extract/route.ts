// =====================================================================
// API route: receives request, calls APIs, and returns result as JSON
// =====================================================================

import { fetchTranscript, TranscriptResponse } from 'youtube-transcript';
import OpenAI from 'openai';
import type {
  RequestBody,
  RecipeResult,
  RecipeIngredients,
} from '@/types/recipe';

// This 'client' is the thing you use to talk to OpenAI
const client = new OpenAI();

export async function POST(req: Request) {
  // return this result when the url is invalid or non-cooking-related
  function createRecipeResult(overrides: Partial<RecipeResult>): {
    recipeResult: RecipeResult;
  } {
    return {
      recipeResult: {
        invalidUrl: false,
        nonCookingRelated: false,
        title: '',
        ingredients: [],
        instruction: [],
        embedUrl: '',
        ...overrides, // copy all properties from the overrides object into here.
      },
    };
  }

  try {
    let recipeTitle: string;
    const recipeIngredients: RecipeIngredients[] = []; // I need '= []' to use .push()
    let recipeInstruction: string[];
    let recipeUrl: string;
    let userEnteredUrl: URL;
    let nonCookingRelated: boolean;
    let invalidUrl: boolean;

    /// additional prompt to make the result better
    const instructionForGpt = `
      You will receive a YouTube transcript.

      Task:
      1. If the content is NOT cooking-related, return "N".
      2. If it is cooking-related (even partially), generate a recipe.

      Output (STRICT FORMAT):
      title|ingredient1 (quantity), ingredient2 (quantity)|step1#step2#step3

      Rules:
      - Output ONLY "N" OR the formatted recipe string.
      - Use EXACTLY two "|" delimiters.
      - Do NOT include "|" anywhere else.
      - Ingredients must be separated by ",".
      - Steps must be separated by "#".
      - Must not add # at the end of your answer. # is only for separating the steps.
      - Output must be ONE LINE only (no line breaks).

      Language:
      - Use English only.

      Ingredients Rules:
      - Format: name (quantity)
      - Example: minced garlic (1 tbsp), chicken (500g)
      - Quantity must be ONE value only (no commas inside ())
      - Decorative words (minced, diced, chopped) must come BEFORE the ingredient name
      - Example: finely chopped onions (2 tbsp)
      - NOT: onions (2 tbsp, chopped)

      Content Rules:
      - Extract ingredients and steps from the transcript
      - If missing, infer realistic quantities, time, and heat
      - Maintain logical cooking order
      - Do NOT create unrelated recipes

      Notes:
      - Use decimal format (0.5 instead of 1/2)

      Example:
      Honey Chicken|chicken (500g), salt (1 tsp), oil (2 tbsp)|season the chicken with salt#heat oil over medium heat for 5 minutes#fry the chicken for 10 minutes until golden
      `;

    const body: RequestBody = await req.json();

    // check whether the url is valid or not
    function checkUrlFormat(): boolean {
      try {
        userEnteredUrl = new URL(
          body.url.startsWith('https') ? body.url : `https://${body.url}`,
        );

        const isYoutube = userEnteredUrl.hostname.includes('youtube.com');

        return isYoutube && userEnteredUrl.pathname !== '/';
      } catch (e) {
        return false;
      }
    }

    // if the url is valid
    if (checkUrlFormat()) {
      //To get id from youtube link ex)https://www.youtube.com/watch?v=1EOmjfSAjw0, id = 1EOmjfSAjw0
      //Got this code from stack overflow(https://stackoverflow.com/questions/33249105/embed-youtube-video-from-url)
      function getVideoId(urlString: string) {
        if (urlString && URL.canParse(urlString)) {
          // shorts URL
          if (urlString.includes('/shorts/')) {
            return body.url.split('/shorts/')[1];
          }
          // short version URL
          if (
            userEnteredUrl.hostname === 'www.youtu.be' ||
            userEnteredUrl.hostname === 'youtu.be'
          ) {
            const videoId: string = userEnteredUrl.pathname.startsWith('/')
              ? userEnteredUrl.pathname.substring(1)
              : userEnteredUrl.pathname;
            return videoId;
          }
          // regular version URL
          const v = userEnteredUrl.searchParams.get('v'); // ex) https://www.youtube.com/watch?v=abc123 / you can get abc123 using this code.
          if (
            (userEnteredUrl.hostname === 'www.youtube.com' ||
              userEnteredUrl.hostname === 'youtube.com') &&
            v
          ) {
            return v;
          }
        }
      }

      const videoId = getVideoId(body.url);

      console.error('Error!!!');
      console.error(videoId);

      // If videoId is undefined, it returns result for invalid url
      if (!videoId) {
        return Response.json(createRecipeResult({ invalidUrl: true }));
      }

      // Extract transcript from the youtube video
      // It returns an array of objects
      const transcript: TranscriptResponse[] = await fetchTranscript(videoId);

      let transcriptTextParts = '';

      // Concatenate all the texts from the transcript
      for (const item of transcript) {
        transcriptTextParts += item.text;
        // Better code: const transcriptTextParts = transcript.map(item => item.text).join(' ');
      }

      // Get answer from chatgpt
      const response = await client.responses.create({
        model: 'gpt-4o',
        input: transcriptTextParts + instructionForGpt,
      });

      const gptAnswer: string = response.output_text;

      // If url is non-cooking-related,
      if (gptAnswer == 'N') {
        return Response.json(createRecipeResult({ nonCookingRelated: true }));
      } else {
        invalidUrl = false;
        nonCookingRelated = false;

        // Parse gpt answer into specific information such as title, ingredients, instructions, url to make return value.
        const splitGptAnswer = gptAnswer.split('|');
        recipeTitle = splitGptAnswer[0];
        const allRecipeIngredients = splitGptAnswer[1].split(',');

        // Get name, quantity, unit from ingredients sentence from chat gpt
        function parseIngredients(ingredients: string[]) {
          for (const ingredient of ingredients) {
            const ingreName = ingredient.split('(')[0].replace(')', '').trim();
            const ingreQuantity = ingredient.split('(')[1];
            const parsedQuantity = ingreQuantity.replace(')', '').trim();

            // Divide to quantity and unit
            const match = parsedQuantity.match(
              /^(\d+(?:\.\d+)?)\s*([a-zA-Z]*)/,
            );

            const recipeQuantity: number | null = match?.[1]
              ? Number(match[1])
              : null;
            const recipeUnit: string = match?.[2] ?? '';

            recipeIngredients.push({
              name: ingreName,
              quantity: recipeQuantity,
              unit: recipeUnit,
            });
          }
        }

        parseIngredients(allRecipeIngredients);

        recipeInstruction = splitGptAnswer[2].split('#');

        // get embed url
        function youtubeUrlToEmbed(id: string) {
          const embedUrl = `https://www.youtube.com/embed/${id}`;
          return embedUrl;
        }
        recipeUrl = youtubeUrlToEmbed(videoId);
      }

      const recipeResult: RecipeResult = {
        invalidUrl: invalidUrl,
        nonCookingRelated: nonCookingRelated,
        title: recipeTitle,
        ingredients: recipeIngredients,
        instruction: recipeInstruction,
        embedUrl: recipeUrl,
      };

      return Response.json({
        recipeResult,
      });
    } else {
      // if the url is not valid
      return Response.json(createRecipeResult({ invalidUrl: true }));
    }
  } catch (err) {
    console.error('Error from route.ts: ', err);

    return Response.json(createRecipeResult({ invalidUrl: true }));
  }
}
