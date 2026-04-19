// =====================================================================
// API route: receives request, calls APIs, and returns result as JSON
// =====================================================================

import { fetchTranscript, TranscriptResponse } from 'youtube-transcript';
import type { RecipeResult, RecipeIngredients } from '@/types/recipe';
import OpenAI from 'openai';
// This 'client' is the thing you use to talk to OpenAI
const client = new OpenAI();

export async function POST(req: Request) {
  try {
    type RequestBody = {
      url: string;
    };

    const body: RequestBody = await req.json();

    /// Recipe extraction prompt
    const instructionForGpt = `
          Determine whether the provided content is a cooking-related YouTube transcript.

          Use English only when you answer

          Decision Rules:
          - Return only "N" if the content is clearly NOT related to cooking or food preparation.
          - If the content includes cooking actions, ingredients, or food preparation (even partially), DO NOT return "N".
          - Even if the transcript is incomplete, unclear, or missing details, treat it as a cooking recipe and proceed.

          If it is cooking-related, generate a recipe using the exact format below:

          Output Format:
          title|ingredient1 (quantity), ingredient2 (quantity), ingredient3 (quantity)|step1. step2. step3.

          Formatting Rules:
          - Use exactly TWO "|" delimiters:
            - First "|" separates title and ingredients
            - Second "|" separates ingredients and instructions
          - Do NOT include "|" anywhere else in the output.
          - Ingredients must be separated by commas (",").
          - Use "#" delimiters between details in the instructions.
          - Instructions must be written as a single line with steps separated by periods (".").
          - Do NOT use line breaks.
          - Do NOT use bullet points or numbering like "1." or "-".

          Language Rules:
          - The recipe must be written in English only.

          Content Rules:
          - Base the recipe primarily on the provided transcript.
          - Extract ingredients, actions, and cooking order from the transcript.
          - If important details (quantity, time, temperature) are missing, fill them using realistic and common cooking standards.
          - Do NOT invent a completely unrelated recipe.
          - Follow the transcript structure as much as possible.

          Detail Requirements:
          - Include realistic ingredient quantities (e.g., 10g, 1 tbsp, 2 cups).
          - Include cooking time when applicable (e.g., 10 minutes, until browned).
          - Include heat level when applicable (e.g., medium heat).
          - Ensure logical cooking order.

          Strict Output Rules:
          - Return ONLY:
            - "N" OR
            - the formatted recipe string
          - Do NOT include explanations, comments, or extra text.
          - When you use 'minced', you should use like 'minced garlic', not garlic (1 tbsp, minced).

          Honey Chicken|Chicken (500g), Salt (1 tsp), Oil (2 tbsp)|Season the chicken with salt.#Heat oil over medium heat for 5 minutes.#Fry the chicken for 10 minutes until golden.
          `;

    //To get id from youtube link ex)https://www.youtube.com/watch?v=1EOmjfSAjw0, id = 1EOmjfSAjw0
    //Got this code from stack overflow(https://stackoverflow.com/questions/33249105/embed-youtube-video-from-url)
    function getVideoId(urlString: string) {
      if (urlString && URL.canParse(urlString)) {
        const url = new URL(urlString); // you can access parts like url.hostname, url.pathname, url.searchParams.
        // shorts URL
        if (urlString.includes('/shorts/')) {
          return body.url.split('/shorts/')[1];
        }
        // short version URL
        if (url.hostname === 'www.youtu.be' || url.hostname === 'youtu.be') {
          const videoId: string = url.pathname.startsWith('/')
            ? url.pathname.substring(1)
            : url.pathname;
          return videoId;
        }
        // regular version URL
        const v = url.searchParams.get('v'); // ex) https://www.youtube.com/watch?v=abc123 / you can get abc123 using this code.
        if (
          (url.hostname === 'www.youtube.com' ||
            url.hostname === 'youtube.com') &&
          v
        ) {
          return v;
        }
        // if user enters wrong url
        console.log('Error from getVideoId function');
      }
    }

    const videoId = getVideoId(body.url);

    if (!videoId) {
      return Response.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    // extract transcript from the youtube video
    // it returns an array of objects
    const transcript: TranscriptResponse[] = await fetchTranscript(videoId);

    let transcriptTextParts = '';

    // concatenate all the texts from the transcript
    for (const item of transcript) {
      transcriptTextParts += item.text;
      // Better code: const transcriptTextParts = transcript.map(item => item.text).join(' ');
    }

    // get answer from chatgpt
    const response = await client.responses.create({
      model: 'gpt-4o',
      input: transcriptTextParts + instructionForGpt,
    });

    const gptAnswer = response.output_text;

    console.log(gptAnswer);

    const splitGptAnswer = gptAnswer.split('|');
    const recipeTitle = splitGptAnswer[0];
    const allRecipeIngredients = splitGptAnswer[1].split(',');

    const recipeIngredients: RecipeIngredients[] = [];

    function parseIngredients(ingredients: string[]) {
      for (const ingredient of ingredients) {
        const ingreName = ingredient.split('(')[0].replace(')', '').trim();
        const ingreQuantity = ingredient.split('(')[1];

        const parsedQuantity = ingreQuantity
          ? ingreQuantity.replace(')', '').trim()
          : 'N';

        recipeIngredients.push({ name: ingreName, quantity: parsedQuantity });
      }
    }

    parseIngredients(allRecipeIngredients);

    console.log(recipeIngredients);

    const recipeInstruction = splitGptAnswer[2].split('#');

    // get embed url
    function youtubeUrlToEmbed(id: string) {
      const embedUrl = `https://www.youtube.com/embed/${id}`;
      return embedUrl;
    }

    const recipeResult: RecipeResult = {
      title: recipeTitle,
      ingredients: recipeIngredients,
      instruction: recipeInstruction,
      embedUrl: youtubeUrlToEmbed(videoId),
    };

    return Response.json({
      recipeResult,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
