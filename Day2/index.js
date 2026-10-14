/*import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{
      role: "user",
      text:"Hi my name is Hammad Muntazir."
    },{
      role:"model",
      text:"Hi Hammad Muntazir, it's nice to meet you! How can I help you today?"
    },{main again to continue the conversation
   
      role:"user",
      text:"Can you tell me my name?"
    }],
  });
  console.log(response.text);
}

main();*/

import { GoogleGenAI } from "@google/genai";

import readlineSync from "readline-sync";

const ai = new GoogleGenAI({ apiKey:process.env.GEMINI_API_KEY });

const chat = ai.chats.create({
    model:"gemini-2.0-flash",
    history: []
  });


async function main(){
   const userProblem = readlineSync.question("Ask me anything --> ")
const response = await chat.sendMessage({
    message: userProblem,
  });
  console.log(response.text);
     main() 
  }
main()