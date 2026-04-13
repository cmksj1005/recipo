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
    const { language } = body;

    const instructionForGpt = `
          Determine whether the provided content contains a cooking recipe.

          - If the content is clearly non-cooking, return N
          - If the content is a cooking video or likely contains a recipe, extract the best possible recipe from the content

          Ingredients:
          - ingredient (quantity)

          Instructions:
          1. Step 1
          2. Step 2

          Requirements:
          - Use ${language} only
          - Do not include extra text
          `;
    let transcriptTextParts = '';

    // concatenate all the texts from the transcript
    for (const item of transcript) {
      transcriptTextParts += item.text;
      // Better code: const transcriptTextParts = transcript.map(item => item.text).join(' ');
    }

    const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: transcriptTextParts + instructionForGpt,
    });

    return Response.json({
      result: response.output_text,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
