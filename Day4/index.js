import { GoogleGenAI } from '@google/genai';
import readlineSync from 'readline-sync';

const History = [];
const ai = new GoogleGenAI({ apiKey: "AIzaSyDPuYHgXBWmP-QlQA8PXEHiFYhPxhXsWxA" });

// Helper functions
function sum({ num1, num2 }) {
    return num1 + num2;
}

function prime({ num }) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

async function getCryptoPrice({ coin }) {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}`);
    const data = await response.json();
    return data;
}

// Function declarations
const sumDeclaration = {
    name: 'sum',
    description: 'Get the sum of 2 numbers',
    parameters: {
        type: 'OBJECT',
        properties: {
            num1: {
                type: 'NUMBER',
                description: 'First number for addition (e.g., 10)'
            },
            num2: {
                type: 'NUMBER',
                description: 'Second number for addition (e.g., 10)'
            }
        },
        required: ['num1', 'num2']
    }
};

const primeDeclaration = {
    name: 'prime',
    description: 'Check if a number is prime',
    parameters: {
        type: 'OBJECT',
        properties: {
            num: {
                type: 'NUMBER',
                description: 'Number to check for primality (e.g., 13)'
            }
        },
        required: ['num']
    }
};

const cryptoDeclaration = {
    name: 'getCryptoPrice',
    description: 'Get the current price of any cryptocurrency',
    parameters: {
        type: 'OBJECT',
        properties: {
            coin: {
                type: 'STRING',
                description: 'Cryptocurrency name (e.g., bitcoin)'
            }
        },
        required: ['coin']
    }
};

const availableTools = {
    sum: sum,
    prime: prime,
    getCryptoPrice: getCryptoPrice
};

async function runAgent(userProblem) {
    // Add user's question to history
    History.push({
        role: "user",
        parts: [{ text: userProblem }]
    });

    while (true) {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: History,
            config: { systemInstruction:`You are an Ai agent , you have access of 3 available tools to find
            sum of 2 number ,get cryptoprice of any curreny and find a number is prime or not 
            use these tools whenever required to confirm user query if user ask general question you can answer
            it directly if you donot need help of these three tools    `,
                tools: [{
                    functionDeclarations: [sumDeclaration, primeDeclaration, cryptoDeclaration]
                }],
            },
        });

        if (response.functionCalls && response.functionCalls.length > 0) {
            console.log(response.functionCalls[0])
            const { name, args } = response.functionCalls[0];
            const funCall = availableTools[name];
            const result = await funCall(args);

            // Add model's function call to history
            History.push({
                role: 'model',
                parts: [{
                    functionCall: response.functionCalls[0],
                }]
            });

            // Add function response to history
            const functionResponsePart = {
                name: name,
                response: {
                    result: result,
                },
            };

            History.push({
                role: "function",
                parts: [{
                    functionResponse: functionResponsePart,
                }],
            });
        } else {
            // Add model's response to history
            History.push({
                role: 'model',
                parts: [{ text: response.text }]
            });
            console.log(response.text);
            break;
        }
    }
}

async function main() {
    while (true) {
        const userProblem = readlineSync.question("Ask me anything (or type 'exit' to quit) --> ");
        if (userProblem.toLowerCase() === 'exit') {
            console.log("Goodbye!");
            break;
        }
        await runAgent(userProblem);
    }
}

main();