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
    },{
      role:"user",
      text:"Can you tell me my name?"
    }],
  });
  console.log(response.text);
}

main();*/

import { GoogleGenAI } from "@google/genai";

import readlineSync from "readline-sync";

const ai =new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const History =[];
async function Chatting(userProblem) {
  
  History.push({
    role:"user",
    parts:[{text:userProblem}]
  })
  
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: History,
  });

  History.push({
    role:"model",
    parts:[{text:response.text}]
  })
   console.log('\n');
  console.log(response.text);
}

async function main(){
   const userProblem = readlineSync.question("Ask me anything --> ")
   await Chatting(userProblem)//response ky wait ky liye await use kia
   main() // Call main again to continue the conversation
   // You can also add a condition to exit the loop if needed
  }
main()