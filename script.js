// Ensure that the script has write permissions in the directory where the log.txt file is located

const fs = require('fs');

// Function to load responses from responses.txt
async function loadResponses() {
    return new Promise((resolve, reject) => {
        fs.readFile('responses.txt', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                const responses = JSON.parse(data);
                resolve(responses);
            }
        });
    });
}

// Function to load jokes from jokes.txt
async function loadJokes() {
    return new Promise((resolve, reject) => {
        fs.readFile('jokes.txt', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                const jokes = JSON.parse(data);
                resolve(jokes);
            }
        });
    });
}

// Function to process user input
async function processUserInput(userInput) 
{
    const trimmedInput = userInput.trim().toLowerCase();
    let botResponse = "I am not sure how to respond to that";

    // Load responses from responses.txt
    const responses = await loadResponses();

    // Check if input matches any response
    for (const entry of responses) 
    {
        if (trimmedInput.includes(entry.input)) 
        {
            botResponse = entry.response;
            break;
        }
    }

    if (trimmedInput.includes("tell me a joke")) 
    {
        // Load jokes from jokes.txt
        const jokes = await loadJokes();

        // Randomly select a joke
        const randomIndex = Math.floor(Math.random() * jokes.length);
        botResponse = jokes[randomIndex];
    }

    // Display bot's response
    displayMessage("QP GPT: ", botResponse);

    // Ask user for feedback
    displayMessage("QP GPT: ", "Were you happy with the response?");

    // Log user input, bot response, and feedback
    logInteraction(userInput, botResponse);
}

// Function to display messages in the chat display
function displayMessage(sender, message) {
    const chatDisplay = document.getElementById("chat-display");
    const messageElement = document.createElement("div");
    messageElement.className = "chat-message";
    messageElement.textContent = sender + message;
    chatDisplay.appendChild(messageElement);
}

// Event listener for user input
const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function() {
    const userInput = document.getElementById("userInput").value;
    displayMessage("User: ", userInput);
    conversationLog.push({ sender: "user", message: userInput });
    processUserInput(userInput);
    document.getElementById("userInput").value = ""; // Clear user input
});

// Function to log user interactions
function logInteraction(userInput, botResponse) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - User: ${userInput} | Bot: ${botResponse}\n`;
    fs.appendFile('log.txt', logEntry, (err) => {
        if (err) {
            console.error('Error writing to log.txt:', err);
        }
    });
}

// Initial bot greeting
displayMessage("QP GPT: ", "Hello! I am QP GPT. How can I assist you today?");
