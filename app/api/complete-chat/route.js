import OpenAI from "openai"; 

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
});

export async function POST(req) {
    const body = await req.json();
    const userMessage = body.message
    const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "You are a financial researcher."},
            {"role": "user", "content": userMessage},
        ],
        model: "gpt-3.5-turbo",
      });
    return Response.json({
        chatResponse: completion.choices[0].message.content
    });
};