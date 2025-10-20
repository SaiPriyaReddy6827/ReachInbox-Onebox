import axios from "axios";

export async function queryEmailsWithAI(question: string, emails: any[]) {
  const OPENAI_KEY = process.env.GEMINI_API_KEY;

  const prompt = `Answer this question based on these emails:\n${JSON.stringify(emails)}\nQuestion: ${question}`;

  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      model: "text-davinci-003",
      prompt,
      max_tokens: 500
    },
    {
      headers: { Authorization: `Bearer ${OPENAI_KEY}` }
    }
  );

  return response.data.choices[0].text;
}
