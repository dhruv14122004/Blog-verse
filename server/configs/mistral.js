import { Mistral } from "@mistralai/mistralai";

const run = async (prompt) => {
    const apiKey = process.env.MISTRAL_API_KEY

    const mistral = new Mistral({
        apiKey: apiKey,
    });

    const result = await mistral.chat.complete({
        model: "mistral-small-latest",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    return result.choices[0].message.content;
};

export default run;
