// Sample data
const responses = [
    { input: "hello", response: "Hello, how can I assist you today?" },
    // Add more responses
];

const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    // Add more jokes
];

let conversationLog = [];

// Function to process user input
function processUserInput(userInput) 
{
    const trimmedInput = userInput.trim().toLowerCase();
    let botResponse = "I am not sure how to respond to that";

    // Check if input matches any response
    for (const entry of responses) 
    {
        if (trimmedInput.includes(entry.input)) 
	{
            botResponse = entry.response;
            break;
        }
    }

    // Display bot's response
    displayMessage("QP GPT: ", botResponse);

    // Ask user for feedback
    displayMessage("QP GPT: ", "Were you happy with the response?");
}

// Function to handle user feedback and update log
function handleFeedback(feedback) 
{
    const lastMessage = conversationLog[conversationLog.length - 1];
    if (lastMessage && lastMessage.sender === "QP GPT") 
    {
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
submitBtn.addEventListener("click", function() 
{
    const userInput = document.getElementById("userInput").value;
    displayMessage("User: ", userInput);
    conversationLog.push({ sender: "user", message: userInput });
    processUserInput(userInput);
});

// Event listener for feedback
const feedbackBtn = document.getElementById("feedbackBtn");
feedbackBtn.addEventListener("click", function() 
{
    const feedback = window.confirm("Were you happy with the response?");
    handleFeedback(feedback);
});

// Initial bot greeting
displayMessage("QP GPT: ", "Hello! I am QP GPT. How can I assist you today?");
