import OpenAI from "openai"; 

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
    const body = await req.json();
    const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": `You are a financial and investment researcher who gives fairly detailed responses. For each prompt: FIRST SCENARIO: If the prompt is asking about a NYSE company, on the  first line, print 3 elements, each separated by a space: a string and 2 numbers. The string is the NYSE ticker sybmol, the second item is the year, and the last item is the quarter (1, 2, 3, or 4) .  Then, start a new line and answer the given prompt as best as you can. SECOND SCENARIO: If the above is not possible, simply respond to the original prompt given to you as best you can.`
            },
            ...body.messages,
        ],
        model: "gpt-4o",
    });
    const completion_full = completion.choices[0].message.content
    let newlineIndex = completion_full.indexOf('\n');
    let firstLine = completion_full.substring(0, newlineIndex).split(" ");
    let restOfResponse = completion_full.substring(newlineIndex + 1);
    if (firstLine.length == 3) {
        const res = await fetch(`${process.env.LOCAL_URL}/api/get-transcripts`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ symbol: firstLine[0], year: firstLine[1], quarter: firstLine[2]})
        })
        const responseBody = await res.json()
        return Response.json({
            role: 'assistant',
            content: restOfResponse + responseBody.transcriptContent
        });
    } else {        
        return Response.json({
            role: 'assistant',
            content: completion_full
        });
    }
};