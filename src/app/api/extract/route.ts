import OpenAI from 'openai';
const client = new OpenAI();

export async function POST(req: Request) {
  const body = await req.json();

  const response = await client.responses.create({
    model: 'gpt-4.1',
    input: body.url,
  });

  return Response.json({
    result: response.output_text,
  });
}
