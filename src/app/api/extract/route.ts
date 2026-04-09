import OpenAI from 'openai';
//This 'client' is the thing you use to talk to OpenAI
const client = new OpenAI();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: body.url,
    });

    return Response.json({
      result: response.output_text,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
