import { systemConfig } from "@/utils/OpenAI/systemConfig";
import OpenAI from "openai"; 

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
    const body = await req.json().catch((err) => {
        console.error("error parsing request to complete chat", err);
        throw err
    });
    const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": systemConfig.content
            },
            ...body.messages,
        ],
        model: "gpt-4o",
    });
    const completion_full = completion.choices[0].message.content
    let newlineIndex = completion_full.indexOf('\n');
    let firstLine = completion_full.substring(0, newlineIndex).split(" ");
    let restOfResponse = completion_full.substring(newlineIndex + 1);

    if (firstLine.length == 3 && typeof firstLine[0] == "string" && !Number.isNaN(firstLine[1]) && !Number.isNaN(firstLine[2])) {
        try {
            const res = await fetch(`${process.env.LOCAL_URL}/api/get-transcripts`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ symbol: firstLine[0], year: firstLine[1], quarter: firstLine[2]})
            })
            const responseBody = await res.json().catch((err) => {
                console.error("error parsing response to complete chat", err);
                throw err
            });
            return Response.json({
                role: 'assistant',
                content: restOfResponse + responseBody.transcriptContent
            });
        } catch (err) {
            console.error("error getting the transcripts", err);
            throw err
        }
    } else {        
        return Response.json({
            role: 'assistant',
            content: completion_full
        });
    }
};