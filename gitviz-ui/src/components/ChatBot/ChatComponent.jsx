// src/Chatbot.js
import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet
import './Chat.css';
import userImage from '../../assets/chatBot/user-1.png'; // Adjust the path accordingly
import chatbotImage from '../../assets/chatBot/RAG.png'; // Adjust the path accordingly

const API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY = "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"; // Replace with your actual API key


const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const messageBarRef = useRef(null);

    const sendMessage = () => {
        event.preventDefault();
        const userTypedMessage = messageBarRef.current.value;
        if (userTypedMessage.length > 0) {
            messageBarRef.current.value = "";
            const userMessage = { role: "user", content: userTypedMessage };
            setMessages((prevMessages) => [...prevMessages, userMessage]);

            const botResponse = { role: "bot", content: "..." };
            setMessages((prevMessages) => [...prevMessages, botResponse]);

            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: userTypedMessage }],
                }),
            };

            fetch(API_URL, requestOptions)
                .then((res) => res.json())
                .then((data) => {
                    const botMessageContent = data.choices[0].message.content;
                    setMessages((prevMessages) => {
                        const updatedMessages = [...prevMessages];
                        updatedMessages[updatedMessages.length - 1] = { role: "bot", content: botMessageContent };
                        return updatedMessages;
                    });
                })
                .catch(() => {
                    setMessages((prevMessages) => {
                        const updatedMessages = [...prevMessages];
                        updatedMessages[updatedMessages.length - 1] = {
                            role: "bot",
                            content: "Oops! An error occurred. Please try again.",
                        };
                        return updatedMessages;
                    });
                });
        }
    };

    const renderMessageContent = (content) => {
        // Render code blocks
        const parts = content.split(/(```[\s\S]*?```|`[^`]+`)/g);
        return parts.map((part, index) => {
            if (part.startsWith("```")) {
                // Render multi-line code block
                return <pre key={index} className="code-block">{part.slice(3, -3).trim()}</pre>;
            } else if (part.startsWith("`")) {
                // Render inline code
                return <code key={index} className="inline-code">{part.slice(1, -1)}</code>;
            } else {
                return part; // Regular text
            }
        });
    };

    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet" />
            </Helmet>
            <div className="chatbox-wrapper">
                <div className="message-box">
                    {messages.map((message, index) => (
                        <div key={index} className={`chat ${message.role === "bot" ? "response" : "message"}`}>
                            <img id="avatar" src={message.role === "bot" ? chatbotImage : userImage} alt={message.role} />
                            <span>{renderMessageContent(message.content)}</span>
                        </div>
                    ))}
                </div>
                <div className="messagebar">
                    <form className="bar-wrapper" onSubmit={sendMessage}>
                        <input
                            type="text"
                            placeholder="Enter your message..."
                            ref={messageBarRef}
                        />
                        <button type="submit">
                            <span className="material-symbols-rounded">send</span>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Chatbot;
    