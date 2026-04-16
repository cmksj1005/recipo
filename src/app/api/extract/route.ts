// =====================================================================
// API route: receives request, calls APIs, and returns result as JSON
// =====================================================================

import { fetchTranscript } from 'youtube-transcript';
import OpenAI from 'openai';
// This 'client' is the thing you use to talk to OpenAI
const client = new OpenAI();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // extract transcript from the youtube video
    // it returns an array of objects
    const transcript = await fetchTranscript(body.url);
    const language = body.language;

    let transcriptTextParts = '';
    const instructionForGpt = `
          Determine whether the provided content is a cooking-related YouTube transcript.

          Use ${language} only when you answer

          Decision Rules:
          - Return only "N" if the content is clearly NOT related to cooking or food preparation.
          - If the content includes cooking actions, ingredients, or food preparation (even partially), DO NOT return "N".
          - Even if the transcript is incomplete, unclear, or missing details, treat it as a cooking recipe and proceed.

          If it is cooking-related, generate a recipe using the exact format below:

          Output Format:
          title|ingredient1 (quantity), ingredient2 (quantity), ingredient3 (quantity)|step1. step2. step3.

          Use ${language} only when you answer

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
          - The recipe must be written in ${language} only.

          Content Rules:
          - Base the recipe primarily on the provided transcript.
          - Extract ingredients, actions, and cooking order from the transcript.
          - If important details (quantity, time, temperature) are missing, fill them using realistic and common cooking standards.
          - Do NOT invent a completely unrelated recipe.
          - Follow the transcript structure as much as possible.

          Use ${language} only when you answer

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

          Example Format (structure only, not content, language should be ${language}}):
          Honey Chicken|Chicken (500g), Salt (1 tsp), Oil (2 tbsp)|Season the chicken with salt.#Heat oil over medium heat for 5 minutes.#Fry the chicken for 10 minutes until golden.
          
          Use ${language} only when you answer

          When you answer, do not use other languages. You must use ${language} only!!

          Why are you sometimes use other languages!! Don't do it!!! Use only ${language}!!
          `;

    // concatenate all the texts from the transcript
    for (const item of transcript) {
      transcriptTextParts += item.text;
      // Better code: const transcriptTextParts = transcript.map(item => item.text).join(' ');
    }

    const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: transcriptTextParts + instructionForGpt,
    });

    const gptAnswer = response.output_text;

    const splitGptAnswer = gptAnswer.split('|');
    const recipeTitle = splitGptAnswer[0];
    const recipeIngredients = splitGptAnswer[1];
    const recipeInstruction = splitGptAnswer[2].split('#');

    //Got this from stack overflow(https://stackoverflow.com/questions/33249105/embed-youtube-video-from-url)
    function youtubeUrlToEmbed(
      urlString: string | undefined | null,
    ): string | null | undefined {
      const template = (v: string) => `https://www.youtube.com/embed/${v}`;
      if (urlString && URL.canParse(urlString)) {
        const url = new URL(urlString);
        // short URL
        if (url.hostname === 'www.youtu.be' || url.hostname === 'youtu.be') {
          return template(
            url.pathname.startsWith('/')
              ? url.pathname.substring(1)
              : url.pathname,
          );
        }
        // regular URL
        const v = url.searchParams.get('v');
        if (
          (url.hostname === 'www.youtube.com' ||
            url.hostname === 'youtube.com') &&
          v
        ) {
          return template(v);
        }
      }
      return urlString;
    }

    const result = {
      title: recipeTitle,
      ingredients: recipeIngredients,
      instruction: recipeInstruction,
      embedUrl: youtubeUrlToEmbed(body.url),
    };

    return Response.json({
      result,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
