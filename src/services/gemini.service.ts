import { GoogleGenAI } from "@google/genai";
import { Product } from "../utils/types.utils";
import { createError } from "../exceptions/error.exception";
import { logger } from "../utils/logging.utils";
import { loginUserSchema } from "../dtos/user.dtos";

const genAI = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY!});

type AIResponse = {
  message: string;
  products: Product[];
};

export const sendComplaint = async(
     userComplaint: string
) => {
     const prompt = `
               You are a professional nutritionist and food expert with years of experience helping patients.
               Respond to this user complaint like a kind, helpful nutritionist. 
               Also give 5 food recommendations in the following strict JSON format only:

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
               },
               ...
               ]
               }

               The user complaint is: "${userComplaint}"

               IMPORTANT: Reply ONLY in the JSON format above. Do NOT include explanation or any other text.
               `;
     const result = await genAI.models.generateContent({
          model: "gemini-1.5-flash",
          contents: prompt
     })
     logger.info("request to gemini sent")

     const responseText = result.text?.trim()
     if (!responseText) {
          logger.error("response does not have any payload")
          throw createError("failed", "Internal server error", 500);
     }

     try {
          const json = await JSON.parse(responseText);
          return {
               message: json.message,
               products: json.products as Product[],
          } as AIResponse;
     } catch (error) {
          logger.error("Error while parsing gemini response")
          throw createError("failed", "Internal server error", 500);
     }
}