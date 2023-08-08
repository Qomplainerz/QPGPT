// Function to load responses from responses.txt
async function loadResponses() {
    try {
        const response = await fetch('responses.txt');
        const data = await response.text();
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading responses:', error);
        return [];
    }
}

// Function to load jokes from jokes.txt
async function loadJokes() {
    try {
        const response = await fetch('jokes.txt');
        const data = await response.text();
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading jokes:', error);
        return [];
    }
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
