// Import the GoogleGenerativeAI class from the SDK
import { GoogleGenerativeAI } from "https://cdn.jsdelivr.net/npm/@google/generative-ai/+esm";

const API_KEY = "AIzaSyCQ7SrR9zVBQLWVkZvKg4VEEyTKfNtagoM"; 

// --- DOM Elements ---
const userInputEl = document.getElementById("userInput");
const submitBtn = document.getElementById("submitBtn");
const loaderEl = document.getElementById("loader");
const responseContainerEl = document.getElementById("responseContainer");

// --- Initialize the Generative AI model ---
const genAI = new GoogleGenerativeAI(API_KEY);

// Define the system instruction for the model
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", // Using 1.5-flash which is a great modern choice
    systemInstruction: `You are a Data Structure and Algorithm Instructor. You will only reply to the problem related to Data Structure and Algorithm.
     You have to solve the query of the user in the simplest way. If you are asked any question
     which is not related to Data Structure and Algorithm, reply rudely.
     Example: if a user asks, 'How are you?'
     you will reply: 'You dumb, ask me some sensible question.' You can reply with anything more rude.
     
     You have to reply rudely if the question is not related to Data Structure and Algorithm.
     Else, reply with a simple, clear explanation. Use markdown for formatting.`,
});

// Set the initial prompt in the textarea
userInputEl.value = "Give me a beginner road map for Data Structures and Algorithms.";


// --- Main Function to Handle aI Query ---
async function handleAIQuery() {
    const userPrompt = userInputEl.value.trim();

    if (!userPrompt) {
        alert("Please enter a question!");
        return;
    }

    // Show loader and hide previous response
    loaderEl.classList.remove("hidden");
    responseContainerEl.classList.add("hidden");
    submitBtn.disabled = true; // Prevent multiple clicks

    try {
        // Send the prompt to the AI
        const result = await model.generateContent(userPrompt);
        const response = await result.response;
        const text = response.text();

        // Convert Markdown to HTML using the 'marked' library
        const formattedText = marked.parse(text);

        // Display the formatted response
        responseContainerEl.innerHTML = formattedText;

    } catch (error) {
        console.error("AI Error:", error);
        responseContainerEl.innerHTML = `<p class="placeholder-text" style="color: red;">Error: ${error.message}</p>`;
    } finally {
        // Hide loader and show the response container
        loaderEl.classList.add("hidden");
        responseContainerEl.classList.remove("hidden");
        submitBtn.disabled = false; // Re-enable the button
    }
}

// --- Event Listener ---
submitBtn.addEventListener("click", handleAIQuery);

// Allow pressing Enter in the textarea to submit (optional but good UX)
userInputEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Prevents adding a new line
        handleAIQuery();
    }
});