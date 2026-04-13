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
    let transcriptTextParts = '';

    // concatenate all the texts from the transcript
    for (const item of transcript) {
      transcriptTextParts += item.text;
      // Better code: const transcriptTextParts = transcript.map(item => item.text).join(' ');
    }

    console.log(transcriptTextParts);

    const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input:
        transcriptTextParts +
        "extract the recipe if this content has it. If not, return 'It is not cook youtube video' Do not return anything else. displayed language should be english",
    });

    return Response.json({
      result: response.output_text,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
