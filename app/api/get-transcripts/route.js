export async function POST(req) {
    const reqBody = await req.json().catch((err) => {
        console.error("error parsing request to get transcripts", err);
        throw err
    });;

    try {
        const res = await fetch(`https://financialmodelingprep.com/api/v3/earning_call_transcript/${reqBody.symbol}?year=${reqBody.year}&quarter=${reqBody.quarter}}&apikey=${process.env.FMP_API_KEY}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
        }});
        const responseBody = await res.json().catch((err) => {
            console.error("error parsing FMP response", err);
            throw err
        });

        return Response.json({
            transcriptContent: '\n\nThe transcript for the relevant earnings call' + 
                `(company: ${responseBody[0].symbol}, year: ${responseBody[0].year}, quarter: ${responseBody[0].quarter})` +
                `is is added below: \n\n${responseBody[0].content}`
        });
    } catch (err) {
        console.error("error getting the transcripts", err);
        throw err
    }
};