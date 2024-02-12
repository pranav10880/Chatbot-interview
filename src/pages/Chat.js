import React, { useState, useRef, useEffect } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import "./Chat.css"; // Import the CSS file for styling

const Chat = () => {
  const questions = [
    "What position are you hiring for?",
    "What are the skills required for this position?",
    "How many years of experience is needed?",
    "What is the minimum educational requirement?",
    "What location is this position based in?",
    "Is this position remote?"
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [completed, setCompleted] = useState(false); // Track if all questions are completed
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (!textAreaRef.current) return;
    
    // Focus on the textarea when current question index changes
    textAreaRef.current.focus();
  }, [currentQuestionIndex]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission behavior
      handleResponse(); // Call handleResponse function when Enter key is pressed
    }
  };

  const handleResponse = async () => {
    const response = currentResponse.trim();
    if (!response) return; // Ignore empty responses

    const updatedUserResponses = [...userResponses, response];
    setUserResponses(updatedUserResponses);

    // Log the user response to the console
    console.log(`Question: ${questions[currentQuestionIndex]}`);
    console.log(`User Response: ${response}`);

    // Clear current response
    setCurrentResponse('');

    // Move to the next question if available
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Display "Thank you" message and disable textbox
      setUserResponses([...updatedUserResponses, <strong key="thank-you">Thank you!</strong>]);
      setCompleted(true); // Mark all questions completed
    }

    try {
      // Make an HTTP POST request to the server with the user's response
      await axios.post("/api/chat", {
        question: questions[currentQuestionIndex],
        response
      });
      console.log('Response sent successfully');
      // You can add further logic here, such as displaying a success message to the user
    } catch (error) {
      console.error('Error sending response:', error);
      // You can handle errors here, such as displaying an error message to the user
    }
  };

  return (
    <div className="chat-container" tabIndex="0">
    
      <div className="chat">
        {userResponses.map((response, index) => (
          <div key={index}>
            <p><strong>{questions[index]}</strong></p>
            <p>{response}</p>
          </div>
        ))}
        {currentQuestionIndex < questions.length && !completed && (
          <>
            <div className="question">{"Assistant: "+questions[currentQuestionIndex]}</div>
            <textarea
              rows="1"
              placeholder="Type here"
              value={currentResponse}
              onChange={(e) => setCurrentResponse(e.target.value)}
              onKeyPress={handleKeyPress}
              ref={textAreaRef}
              autoFocus // Ensure that the textarea is focused
            />
            <button onClick={handleResponse}>
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
