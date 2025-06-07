import { GoogleGenAI } from "@google/genai";
import { Product } from "../utils/types.utils";
import { createError } from "../exceptions/error.exception";
import { logger } from "../utils/logging.utils";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

type AIResponse = {
  message: string;
  products: Product[];
};

export const sendComplaint = async (
  userComplaint: string
): Promise<AIResponse> => {
  const prompt = `
You are a professional nutritionist and food expert with years of experience helping patients.
Respond to this user complaint like a kind, helpful nutritionist. 
Also give 10 food recommendations in the following strict JSON format only:

{
  "message": "<your reply to the user>",
  "products": [
    {
      "Name": "Tempe",
      "Fat": "10.8g",
      "CloricValue": "192kcal",
      "Protein": "20.8g",
      "Iron": "2.7mg",
      "Calcium": "111mg",
      "Thiamine": "0.12mg"
    }
  ]
}

The user complaint is: "${userComplaint}"

IMPORTANT: Reply ONLY in raw JSON format. No explanations, no markdown, no escaped characters.
  `;

  const result = await genAI.models.generateContent({
    model: "gemini-1.5-flash",
    contents: prompt,
  });

  logger.info("Request to Gemini sent");

  let responseText = result.text?.trim();

  if (!responseText) {
    logger.error("No payload from Gemini");
    throw createError("failed", "Internal server error", 500);
  }

  // ⚠️ Remove wrapping markdown syntax (e.g., ```json)
  responseText = responseText
    .replace(/^```json/, "")
    .replace(/^```/, "")
    .replace(/```$/, "")
    .trim();

//   logger.info(responseText); // debug raw response

  // ✅ Parse once only!
  try {
    const json = JSON.parse(responseText);
    return {
      message: json.message,
      products: json.products as Product[],
    } as AIResponse;
  } catch (e) {
    logger.error("Error parsing Gemini response: " + e);
    throw createError("failed", "Invalid AI JSON format", 500);
  }
};
