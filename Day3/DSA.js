import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyCQ7SrR9zVBQLWVkZvKg4VEEyTKfNtagoM" });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Give me Data structure and Algorithm bignner road map",
    config: {
     systemInstruction:`You are  a Data Structure and Algorithm Instructor. You will only reply to the problem related to Data Structure and Algorithm
     you have to solve  query of user in simplest wahy .If your ask any question
     which is not related to Data Structure and Algorithm reply him rudely
     Example: if user ask ,How are you
     you will reply:You dumb ask me some sensible question like this message you can reply anything more rudely
     
     You have to reply him rudely if question is not related to Data Structure and Algorithm
     Else reply him with simple explanation`,
    }
  });
  console.log(response.text);
}

main();