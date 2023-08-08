let conversationLog = [];

// Function to process user input
async function processUserInput(userInput) {
    const trimmedInput = userInput.trim().toLowerCase();
    let botResponse = "I am not sure how to respond to that";

    // Load responses from responses.txt
    const responses = await loadResponses();

    // Check if input matches any response
    for (const entry of responses) {
        if (trimmedInput.includes(entry.input)) {
            botResponse = entry.response;
            break;
        }
    }

    if (trimmedInput.includes("tell me a joke")) {
        // Load jokes from jokes.txt
        const jokes = await loadJokes();

        if (jokes.length > 0) {
            // Randomly select a joke
            const randomIndex = Math.floor(Math.random() * jokes.length);
            botResponse = jokes[randomIndex];
        } else {
            botResponse = "I'm sorry, I don't have any jokes right now.";
        }
    }

    // Display bot's response
    displayMessage("QP GPT: ", botResponse);

    // Ask user for feedback
    displayMessage("QP GPT: ", "Were you happy with the response?");
}

// Function to load responses from responses.txt
async function loadResponses() {
    try {
        const response = await fetch("responses.txt");
        const text = await response.text();
        const lines = text.split("\n");

        const responses = lines.map(line => {
            const [input, response] = line.split("|");
            return { input, response };
        });

        return responses;
    } catch (error) {
        console.error("Error loading responses:", error);
        return [];
    }
}

// Function to load jokes from jokes.txt
async function loadJokes() {
    try {
        const response = await fetch("jokes.txt");
        const text = await response.text();
        const jokes = text.split("\n");

        return jokes;
    } catch (error) {
        console.error("Error loading jokes:", error);
        return [];
    }
}

// Function to handle user feedback and update log
function handleFeedback(feedback) {
    const lastMessage = conversationLog[conversationLog.length - 1];
    if (lastMessage && lastMessage.sender === "QP GPT") {
        lastMessage.feedback = feedback;
    }
    // Update log.txt (simulated)
    console.log(conversationLog);
}

// Function to display messages in the chat display
function displayMessage(sender, message) {
    const chatDisplay = document.getElementById("chat-display");
    const messageElement = document.createElement("div");

    // Replace "chat-message" with your actual CSS class for chat messages
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

    // Clear user input field
    document.getElementById("userInput").value = "";
});

// Event listener for feedback
const feedbackBtn = document.getElementById("feedbackBtn");
feedbackBtn.addEventListener("click", function() {
    const feedback = window.confirm("Were you happy with the response?");
    handleFeedback(feedback);
});

// Initial bot greeting
displayMessage("QP GPT: ", "Hello! I am QP GPT. How can I assist you today?");
