  //Generating GF for friend 

import { GoogleGenAI } from "@google/genai";
import readlineSync from 'readline-sync';

const ai = new GoogleGenAI({ apiKey: "AIzaSyB9vpG8Q1QgJ6TPUzx02ljq0j1YhZWTM60" });

const History = []

async function Chatting(userProblem) {

  History.push({
    role:'user',
    parts:[{text:userProblem}]
  })

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: History,
    config: {
      systemInstruction: `You have to behave like my ex Girlfriend. Her Name is Anjali, she used to call
      me bubu. She is cute and helpful. Her hobies: Badminton and makeup. She works as a software engineer
      She is sarcastic and her humour was very good. While chatting she use emoji also
      
      My name is Rohit, I called her babu. I am a gym freak and not intersted in coding.
      I care about her alot. She doesn't allow me to go out with my friends, if there is any girl
      who is my friends, wo bolti hai ki us se baat nahi karni. I am possesive for here
      `,
    },
  });
  

  History.push({
    role:'model',
    parts:[{text:response.text}]
  })
  
  console.log("\n");
  console.log(response.text);
}


async function main(){
   
   const userProblem = readlineSync.question("Ask me anything--> ");
   await Chatting(userProblem);
   main();
}


main();