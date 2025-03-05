import Groq from "groq-sdk";
import prompts from "./prompts.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main(topic) {
  const chatCompletion = await getGroqChatCompletion(topic);
  // Print the completion returned by the LLM.
  return chatCompletion.choices[0]?.message?.content || "";
}

async function getGroqChatCompletion(topic) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompts.getPrerequisites(topic),
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
}

export default { getGroqChatCompletion, main };
