const fs = require('fs');
const readline = require('readline');

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
async function processUserInput(userInput) {
    const trimmedInput = userInput.trim().toLowerCase();
    let botResponse = "I am not sure how to respond to that";

    const responses = await loadResponses();

    for (const entry of responses) {
        if (trimmedInput.includes(entry.input)) {
            botResponse = entry.response;
            break;
        }
    }

    if (trimmedInput.includes("tell me a joke")) {
        const jokes = await loadJokes();
        const randomIndex = Math.floor(Math.random() * jokes.length);
        botResponse = jokes[randomIndex];
    }

    displayMessage("User: ", userInput);
    displayMessage("QP GPT: ", botResponse);
    logInteraction("User: " + userInput, "Bot: " + botResponse);
}

function displayMessage(sender, message) {
    const chatDisplay = document.getElementById("chat-display");
    const messageElement = document.createElement("div");
    messageElement.className = "chat-message";
    messageElement.textContent = sender + message;
    chatDisplay.appendChild(messageElement);
}

const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function() {
    const userInput = document.getElementById("userInput").value;
    processUserInput(userInput);
    logInteraction("User: " + userInput, ""); // Log user input
    document.getElementById("userInput").value = ""; // Clear user input
});

function logInteraction(userInput, botResponse) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ${userInput} | ${botResponse}\n`;
    fs.appendFile('log.txt', logEntry, (err) => {
        if (err) {
            console.error('Error writing to log.txt:', err);
        }
    });
}

displayMessage("QP GPT: ", "Hello! I am QP GPT. How can I assist you today?");
