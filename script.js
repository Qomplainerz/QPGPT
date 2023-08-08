// Sample data
const responses = [
    	{ input: "hello", response: "Hello! How can I assist you today?" },
	{ input: "hi", response: "Hi! How can I assist you today?" },
	{ input: "hey", response: "Hey! How can I assist you today?" },
	{ input: "good morning", response: "Good morning! How can I assist you today?" },
	{ input: "good day", response: "Good day! How can I assist you today?" },
	{ input: "good afternoon", response: "Good afternoon! How can I assist you today?" },
	{ input: "good evening", response: "Good evening! How can I assist you today?" },
	{ input: "good night", response: "Good night! Hope to see you again soon!" },
	{ input: "bye", response: "Bye! Hope to see you again soon!" },
	{ input: "goodbye", response: "Goodbye! Hope to see you again soon!" },
	{ input: "good bye", response: "Goodbye! Hope to see you again soon!" },
    // Add more responses
];

const jokes = [
    	"Why don't scientists trust atoms? Because they make up everything!",
	"Why did the bicycle fall over? Because it was two-tired!",
	"Why was the maths book sad? Because it had too many problems!",
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

        // Append textarea for user feedback
        const feedbackArea = document.createElement("textarea");
        feedbackArea.rows = "4"; // Customize the number of rows as needed
        feedbackArea.cols = "40"; // Customize the number of columns as needed
        feedbackArea.placeholder = "Provide your feedback here...";

        // Append radio buttons
        const happyRadio = document.createElement("input");
        happyRadio.type = "radio";
        happyRadio.name = "feedback";
        happyRadio.value = "happy";
        const happyLabel = document.createElement("label");
        happyLabel.textContent = "I was happy";
        happyLabel.appendChild(happyRadio);

        const notHappyRadio = document.createElement("input");
        notHappyRadio.type = "radio";
        notHappyRadio.name = "feedback";
        notHappyRadio.value = "not happy";
        const notHappyLabel = document.createElement("label");
        notHappyLabel.textContent = "I was not happy";
        notHappyLabel.appendChild(notHappyRadio);

        // Append submit button
        const submitFeedbackBtn = document.createElement("button");
        submitFeedbackBtn.textContent = "Submit Feedback";
        submitFeedbackBtn.addEventListener("click", function() 
	{
            const feedbackValue = document.querySelector("input[name='feedback']:checked").value;
            const feedbackText = feedbackArea.value;
            console.log("Feedback:", feedbackValue);
            console.log("Feedback Text:", feedbackText);
        });

        // Append elements to chat display
        const chatDisplay = document.getElementById("chat-display");
        chatDisplay.appendChild(feedbackArea);
        chatDisplay.appendChild(happyLabel);
        chatDisplay.appendChild(notHappyLabel);
        chatDisplay.appendChild(submitFeedbackBtn);
    }
    // Update log.txt (simulated)
    console.log(conversationLog);
}

// Function to display messages in the chat display
function displayMessage(sender, message) 
{
    const chatDisplay = document.getElementById("chat-display");
    const messageElement = document.createElement("div");
    messageElement.className = "chat-message"; // Replace with your actual CSS class
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
