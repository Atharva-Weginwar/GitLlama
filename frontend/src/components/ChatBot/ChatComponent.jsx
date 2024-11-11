// // src/Chatbot.js
// import React, { useState, useRef } from 'react';
// import { Helmet } from 'react-helmet'; // Import Helmet
// import './Chat.css';
// import userImage from '../../assets/chatBot/user-1.png'; // Adjust the path accordingly
// import chatbotImage from '../../assets/chatBot/RAG.png'; // Adjust the path accordingly

// const API_URL = "https://api.openai.com/v1/chat/completions";
// const OPENAI_API_KEY = "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"; // Replace with your actual API key


// const Chatbot = () => {
//     const [messages, setMessages] = useState([]);
//     const messageBarRef = useRef(null);

//     const sendMessage = () => {
//         event.preventDefault();
//         const userTypedMessage = messageBarRef.current.value;
//         if (userTypedMessage.length > 0) {
//             messageBarRef.current.value = "";
//             const userMessage = { role: "user", content: userTypedMessage };
//             setMessages((prevMessages) => [...prevMessages, userMessage]);

//             const botResponse = { role: "bot", content: "..." };
//             setMessages((prevMessages) => [...prevMessages, botResponse]);

//             const requestOptions = {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${OPENAI_API_KEY}`,
//                 },
//                 body: JSON.stringify({
//                     model: "gpt-3.5-turbo",
//                     messages: [{ role: "user", content: userTypedMessage }],
//                 }),
//             };

//             fetch(API_URL, requestOptions)
//                 .then((res) => res.json())
//                 .then((data) => {
//                     const botMessageContent = data.choices[0].message.content;
//                     setMessages((prevMessages) => {
//                         const updatedMessages = [...prevMessages];
//                         updatedMessages[updatedMessages.length - 1] = { role: "bot", content: botMessageContent };
//                         return updatedMessages;
//                     });
//                 })
//                 .catch(() => {
//                     setMessages((prevMessages) => {
//                         const updatedMessages = [...prevMessages];
//                         updatedMessages[updatedMessages.length - 1] = {
//                             role: "bot",
//                             content: "Oops! An error occurred. Please try again.",
//                         };
//                         return updatedMessages;
//                     });
//                 });
//         }
//     };

//     const renderMessageContent = (content) => {
//         // Render code blocks
//         const parts = content.split(/(```[\s\S]*?```|`[^`]+`)/g);
//         return parts.map((part, index) => {
//             if (part.startsWith("```")) {
//                 // Render multi-line code block
//                 return <pre key={index} className="code-block">{part.slice(3, -3).trim()}</pre>;
//             } else if (part.startsWith("`")) {
//                 // Render inline code
//                 return <code key={index} className="inline-code">{part.slice(1, -1)}</code>;
//             } else {
//                 return part; // Regular text
//             }
//         });
//     };

//     return (
//         <>
//             <Helmet>
//                 <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
//                 <link rel="preconnect" href="https://fonts.googleapis.com" />
//                 <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
//                 <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet" />
//             </Helmet>
//             <div className="chatbox-wrapper">
//                 <div className="message-box">
//                     {messages.map((message, index) => (
//                         <div key={index} className={`chat ${message.role === "bot" ? "response" : "message"}`}>
//                             <img id="avatar" src={message.role === "bot" ? chatbotImage : userImage} alt={message.role} />
//                             <span>{renderMessageContent(message.content)}</span>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="messagebar">
//                     <form className="bar-wrapper" onSubmit={sendMessage}>
//                         <input
//                             type="text"
//                             placeholder="Enter your message..."
//                             ref={messageBarRef}
//                         />
//                         <button type="submit" className="send-button">
//                             <span className="material-symbols-rounded">send</span>
//                         </button>
//                         <button 
//                             type="button" 
//                             className="summary-button"
//                             onClick={() => {
//                                 // Add your summary function here
//                                 console.log("Summary button clicked");
//                             }}
//                         >
//                             Repo Summary
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Chatbot;

////////////////////////////////////////////////////////////////

// import React, { useState, useRef, useEffect } from 'react';
// import { Helmet } from 'react-helmet';
// import './Chat.css';
// import userImage from '../../assets/chatBot/user-1.png';
// import chatbotImage from '../../assets/chatBot/RAG.png';
// import repoURL from './url.txt?raw';

// const Chatbot = () => {
//     const [messages, setMessages] = useState([]);
//     const messageBarRef = useRef(null);

//     // Add this to check the URL when component mounts
//     useEffect(() => {
//         console.log('Loaded URL:', repoURL);
//     }, []);

//     const handleRepoSummary = async () => {
//         const trimmedURL = repoURL.trim();
//         console.log('Using URL:', trimmedURL); // Debug log

//         if (!trimmedURL) {
//             setMessages(prev => [...prev, { 
//                 role: "bot", 
//                 content: "No repository URL found. Please try again." 
//             }]);
//             return;
//         }

//         setMessages(prev => [...prev, { 
//             role: "bot", 
//             content: "Analyzing repository..." 
//         }]);

//         try {
//             const apiURL = `http://localhost:8000/api/analyze-repository?url=${encodeURIComponent(trimmedURL)}`;
//             console.log('Making API call to:', apiURL); // Debug log

//             const response = await fetch(apiURL);
//             console.log('Response status:', response.status); // Debug log
            
//             if (!response.ok) {
//                 const errorText = await response.text();
//                 console.log('Error response:', errorText); // Debug log
//                 throw new Error(`Failed to fetch repository analysis: ${errorText}`);
//             }

//             // Receive response as plain text
//             const data = await response.text();
//             console.log('Received data:', data); // Debug log
            
//             setMessages(prev => {
//                 const newMessages = [...prev];
//                 newMessages[newMessages.length - 1] = {
//                     role: "bot",
//                     content: data
//                 };
//                 return newMessages;
//             });
//         } catch (error) {
//             console.error('Detailed error:', error); // More detailed error log
//             setMessages(prev => {
//                 const newMessages = [...prev];
//                 newMessages[newMessages.length - 1] = {
//                     role: "bot",
//                     content: `Analysis failed: ${error.message}`
//                 };
//                 return newMessages;
//             });
//         }
//     };

//     const renderMessageContent = (content) => {
//         if (typeof content !== 'string') {
//             content = JSON.stringify(content, null, 2);
//         }
        
//         const parts = content.split(/(```[\s\S]*?```|`[^`]+`)/g);
//         return parts.map((part, index) => {
//             if (part.startsWith("```")) {
//                 return <pre key={index} className="code-block">{part.slice(3, -3).trim()}</pre>;
//             } else if (part.startsWith("`")) {
//                 return <code key={index} className="inline-code">{part.slice(1, -1)}</code>;
//             } else {
//                 return part;
//             }
//         });
//     };

//     return (
//         <>
//             <Helmet>
//                 <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
//                 <link rel="preconnect" href="https://fonts.googleapis.com" />
//                 <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
//                 <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet" />
//             </Helmet>
//             <div className="chatbox-wrapper">
//                 <div className="message-box">
//                     {messages.map((message, index) => (
//                         <div key={index} className={`chat ${message.role === "bot" ? "response" : "message"}`}>
//                             <img id="avatar" src={message.role === "bot" ? chatbotImage : userImage} alt={message.role} />
//                             <span>{renderMessageContent(message.content)}</span>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="messagebar">
//                     <form className="bar-wrapper">
//                     <input
//                         type="text"
//                         placeholder="Type a message..."
//                         ref={messageBarRef}
//                     />
//                         <button type="submit" className="send-button" disabled>
//                             <span className="material-symbols-rounded">send</span>
//                         </button>
//                         <button 
//                             type="button" 
//                             className="summary-button"
//                             onClick={handleRepoSummary}
//                         >
//                             Repo Summary
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Chatbot;

/////////////////////////////////////////////////////////////

// import React, { useState, useRef, useEffect } from 'react';
// import { Helmet } from 'react-helmet';
// import './Chat.css';
// import userImage from '../../assets/chatBot/user-1.png';
// import chatbotImage from '../../assets/chatBot/RAG.png';
// import repoURL from './url.txt?raw';

// const Chatbot = () => {
//     const [messages, setMessages] = useState([]);
//     const [inputText, setInputText] = useState(''); // State to track user input
//     const messageBarRef = useRef(null);

//     // Add this to check the URL when component mounts
//     useEffect(() => {
//         console.log('Loaded URL:', repoURL);
//     }, []);

//     const handleRepoSummary = async () => {
//         const trimmedURL = repoURL.trim();
//         console.log('Using URL:', trimmedURL); // Debug log

//         if (!trimmedURL) {
//             setMessages(prev => [...prev, { 
//                 role: "bot", 
//                 content: "No repository URL found. Please try again." 
//             }]);
//             return;
//         }

//         setMessages(prev => [...prev, { 
//             role: "bot", 
//             content: "Analyzing repository..." 
//         }]);

//         try {
//             const apiURL = `http://localhost:8000/api/analyze-repository?url=${encodeURIComponent(trimmedURL)}`;
//             console.log('Making API call to:', apiURL); // Debug log

//             const response = await fetch(apiURL);
//             console.log('Response status:', response.status); // Debug log
            
//             if (!response.ok) {
//                 const errorText = await response.text();
//                 console.log('Error response:', errorText); // Debug log
//                 throw new Error(`Failed to fetch repository analysis: ${errorText}`);
//             }

//             // Receive response as plain text
//             const data = await response.text();
//             console.log('Received data:', data); // Debug log
            
//             setMessages(prev => {
//                 const newMessages = [...prev];
//                 newMessages[newMessages.length - 1] = {
//                     role: "bot",
//                     content: data
//                 };
//                 return newMessages;
//             });
//         } catch (error) {
//             console.error('Detailed error:', error); // More detailed error log
//             setMessages(prev => {
//                 const newMessages = [...prev];
//                 newMessages[newMessages.length - 1] = {
//                     role: "bot",
//                     content: `Analysis failed: ${error.message}`
//                 };
//                 return newMessages;
//             });
//         }
//     };

//     const handleSendMessage = async () => {
//         if (!inputText.trim()) return; // If the input is empty, don't send

//         // Display user's message in the chat
//         setMessages(prev => [...prev, { role: "user", content: inputText }]);

//         setMessages(prev => [...prev, { role: "bot", content: "Processing your query..." }]);

//         try {
//             const apiURL = `http://localhost:8000/api/run-rag?query=${encodeURIComponent(inputText)}`;
//             console.log('Making API call to:', apiURL); // Debug log

//             const response = await fetch(apiURL);
//             console.log('Response status:', response.status); // Debug log

//             if (!response.ok) {
//                 const errorText = await response.text();
//                 console.log('Error response:', errorText); // Debug log
//                 throw new Error(`Failed to fetch query response: ${errorText}`);
//             }

//             const data = await response.text();
//             console.log('Received data:', data); // Debug log

//             setMessages(prev => {
//                 const newMessages = [...prev];
//                 newMessages[newMessages.length - 1] = {
//                     role: "bot",
//                     content: data
//                 };
//                 return newMessages;
//             });
//         } catch (error) {
//             console.error('Detailed error:', error); // More detailed error log
//             setMessages(prev => {
//                 const newMessages = [...prev];
//                 newMessages[newMessages.length - 1] = {
//                     role: "bot",
//                     content: `Query failed: ${error.message}`
//                 };
//                 return newMessages;
//             });
//         }

//         setInputText(''); // Clear the input field
//     };

//     const renderMessageContent = (content) => {
//         if (typeof content !== 'string') {
//             content = JSON.stringify(content, null, 2);
//         }
        
//         const parts = content.split(/(```[\s\S]*?```|`[^`]+`)/g);
//         return parts.map((part, index) => {
//             if (part.startsWith("```")) {
//                 return <pre key={index} className="code-block">{part.slice(3, -3).trim()}</pre>;
//             } else if (part.startsWith("`")) {
//                 return <code key={index} className="inline-code">{part.slice(1, -1)}</code>;
//             } else {
//                 return part;
//             }
//         });
//     };

//     return (
//         <>
//             <Helmet>
//                 <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
//                 <link rel="preconnect" href="https://fonts.googleapis.com" />
//                 <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
//                 <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet" />
//             </Helmet>
//             <div className="chatbox-wrapper">
//                 <div className="message-box">
//                     {messages.map((message, index) => (
//                         <div key={index} className={`chat ${message.role === "bot" ? "response" : "message"}`}>
//                             <img id="avatar" src={message.role === "bot" ? chatbotImage : userImage} alt={message.role} />
//                             <span>{renderMessageContent(message.content)}</span>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="messagebar">
//                     <form 
//                         className="bar-wrapper"
//                         onSubmit={(e) => {
//                             e.preventDefault();
//                             handleSendMessage();
//                         }}
//                     >
//                         <input
//                             type="text"
//                             placeholder="Type a message..."
//                             ref={messageBarRef}
//                             value={inputText}
//                             onChange={(e) => setInputText(e.target.value)}
//                         />
//                         <button type="submit" className="send-button">
//                             <span className="material-symbols-rounded">send</span>
//                         </button>
//                         <button 
//                             type="button" 
//                             className="summary-button"
//                             onClick={handleRepoSummary}
//                         >
//                             Repo Summary
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Chatbot;

///////////////////////////////////////////////
// import React, { useState, useRef, useEffect } from 'react';
// import { Helmet } from 'react-helmet';
// import './Chat.css';
// import userImage from '../../assets/chatBot/user-1.png';
// import chatbotImage from '../../assets/chatBot/RAG.png';
// import repoURL from './url.txt?raw';

// const Chatbot = () => {
//     const [messages, setMessages] = useState([]);
//     const [inputText, setInputText] = useState('');
//     const messageBarRef = useRef(null);

//     // Event listener for commit analysis
//     useEffect(() => {
//         const handleCommitAnalysis = async (event) => {
//             const commitId = event.detail.commitId;
            
//             setMessages(prev => [...prev, { 
//                 role: "bot", 
//                 content: "Generating commit summary..." 
//             }]);

//             try {
//                 const response = await fetch(`http://localhost:8000/api/analyze-commit?commit_id=${commitId}`);
                
//                 if (!response.ok) {
//                     throw new Error('Failed to analyze commit');
//                 }

//                 const data = await response.text();
                
//                 setMessages(prev => {
//                     const newMessages = [...prev];
//                     newMessages[newMessages.length - 1] = {
//                         role: "bot",
//                         content: data
//                     };
//                     return newMessages;
//                 });
//             } catch (error) {
//                 setMessages(prev => {
//                     const newMessages = [...prev];
//                     newMessages[newMessages.length - 1] = {
//                         role: "bot",
//                         content: "Failed to analyze commit. Please try again."
//                     };
//                     return newMessages;
//                 });
//             }
//         };

//         window.addEventListener('analyze-commit', handleCommitAnalysis);
//         return () => window.removeEventListener('analyze-commit', handleCommitAnalysis);
//     }, []);

//     const handleRepoSummary = async () => {
//         const trimmedURL = repoURL.trim();

//         if (!trimmedURL) {
//             setMessages(prev => [...prev, { 
//                 role: "bot", 
//                 content: "No repository URL found. Please try again." 
//             }]);
//             return;
//         }

//         setMessages(prev => [...prev, { 
//             role: "bot", 
//             content: "Analyzing repository..." 
//         }]);

//         try {
//             const apiURL = `http://localhost:8000/api/analyze-repository?url=${encodeURIComponent(trimmedURL)}`;
//             const response = await fetch(apiURL);
            
//             if (!response.ok) {
//                 const errorText = await response.text();
//                 throw new Error(`Failed to fetch repository analysis: ${errorText}`);
//             }

//             const data = await response.text();
            
//             setMessages(prev => {
//                 const newMessages = [...prev];
//                 newMessages[newMessages.length - 1] = {
//                     role: "bot",
//                     content: data
//                 };
//                 return newMessages;
//             });
//         } catch (error) {
//             console.error('Analysis error:', error);
//             setMessages(prev => {
//                 const newMessages = [...prev];
//                 newMessages[newMessages.length - 1] = {
//                     role: "bot",
//                     content: `Analysis failed: ${error.message}`
//                 };
//                 return newMessages;
//             });
//         }
//     };

//     const handleSendMessage = async () => {
//         if (!inputText.trim()) return;

//         setMessages(prev => [...prev, { role: "user", content: inputText }]);
//         setMessages(prev => [...prev, { role: "bot", content: "Processing your query..." }]);

//         try {
//             const apiURL = `http://localhost:8000/api/run-rag?query=${encodeURIComponent(inputText)}`;
//             const response = await fetch(apiURL);

//             if (!response.ok) {
//                 throw new Error('Failed to process query');
//             }

//             const data = await response.text();

//             setMessages(prev => {
//                 const newMessages = [...prev];
//                 newMessages[newMessages.length - 1] = {
//                     role: "bot",
//                     content: data
//                 };
//                 return newMessages;
//             });
//         } catch (error) {
//             setMessages(prev => {
//                 const newMessages = [...prev];
//                 newMessages[newMessages.length - 1] = {
//                     role: "bot",
//                     content: `Query failed: ${error.message}`
//                 };
//                 return newMessages;
//             });
//         }

//         setInputText('');
//     };

//     const renderMessageContent = (content) => {
//         if (typeof content !== 'string') {
//             content = JSON.stringify(content, null, 2);
//         }
        
//         const parts = content.split(/(```[\s\S]*?```|`[^`]+`)/g);
//         return parts.map((part, index) => {
//             if (part.startsWith("```")) {
//                 return <pre key={index} className="code-block">{part.slice(3, -3).trim()}</pre>;
//             } else if (part.startsWith("`")) {
//                 return <code key={index} className="inline-code">{part.slice(1, -1)}</code>;
//             } else {
//                 return part;
//             }
//         });
//     };

//     return (
//         <>
//             <Helmet>
//                 <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
//                 <link rel="preconnect" href="https://fonts.googleapis.com" />
//                 <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
//                 <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet" />
//             </Helmet>
//             <div className="chatbox-wrapper">
//                 <div className="message-box">
//                     {messages.map((message, index) => (
//                         <div key={index} className={`chat ${message.role === "bot" ? "response" : "message"}`}>
//                             <img id="avatar" src={message.role === "bot" ? chatbotImage : userImage} alt={message.role} />
//                             <span>{renderMessageContent(message.content)}</span>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="messagebar">
//                     <form 
//                         className="bar-wrapper"
//                         onSubmit={(e) => {
//                             e.preventDefault();
//                             handleSendMessage();
//                         }}
//                     >
//                         <input
//                             type="text"
//                             placeholder="Type a message..."
//                             ref={messageBarRef}
//                             value={inputText}
//                             onChange={(e) => setInputText(e.target.value)}
//                         />
//                         <button type="submit" className="send-button">
//                             <span className="material-symbols-rounded">send</span>
//                         </button>
//                         <button 
//                             type="button" 
//                             className="summary-button"
//                             onClick={handleRepoSummary}
//                         >
//                             Repo Summary
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Chatbot;

//////////////////////////////////////////////////////////////////////////////

// import React, { useState, useRef, useEffect } from 'react';
// import { Helmet } from 'react-helmet';
// import './Chat.css';
// import userImage from '../../assets/chatBot/user-1.png';
// import chatbotImage from '../../assets/chatBot/RAG.png';
// import repoURL from './url.txt?raw';

// // TypeWriter Component
// const TypeWriter = ({ content, onComplete }) => {
//     const [displayedContent, setDisplayedContent] = useState('');
//     const [currentIndex, setCurrentIndex] = useState(0);

//     useEffect(() => {
//         if (currentIndex < content.length) {
//             const timer = setTimeout(() => {
//                 setDisplayedContent(prev => prev + content[currentIndex]);
//                 setCurrentIndex(prev => prev + 1);
//             }, 5);
//             return () => clearTimeout(timer);
//         } else if (onComplete) {
//             onComplete();
//         }
//     }, [currentIndex, content]);

//     return renderFormattedContent(displayedContent);
// };

// // Utility function to format text
// const renderFormattedContent = (content) => {
//     if (typeof content !== 'string') {
//         content = JSON.stringify(content, null, 2);
//     }

//     // Format the content
//     content = content
//         .replace(/\\n/g, '\n')
//         .replace(/\\t/g, '    ')
//         .replace(/\n/g, '<br />')
//         .replace(/\*\*\*\*(.*?)\*\*\*\*/g, '<strong>$1</strong>')
//         .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
//         .replace(/\*\*\s*(.*?)\s*\*\*/g, '<strong>$1</strong>')
//         .replace(/\*(.*?)\*/g, '<em>$1</em>');

//     const parts = content.split(/(```[\s\S]*?```|`[^`]+`)/g);
    
//     return parts.map((part, index) => {
//         if (part.startsWith("```")) {
//             return (
//                 <pre key={index} className="code-block">
//                     {part.slice(3, -3).trim()}
//                 </pre>
//             );
//         } else if (part.startsWith("`")) {
//             return (
//                 <code key={index} className="inline-code">
//                     {part.slice(1, -1)}
//                 </code>
//             );
//         } else {
//             return (
//                 <div 
//                     key={index} 
//                     className="formatted-text"
//                     dangerouslySetInnerHTML={{ 
//                         __html: part 
//                     }}
//                 />
//             );
//         }
//     });
// };

// const Chatbot = () => {
//     const [messages, setMessages] = useState([]);
//     const [inputText, setInputText] = useState('');
//     const messageBarRef = useRef(null);

//     useEffect(() => {
//         const handleCommitAnalysis = async (event) => {
//             const commitId = event.detail.commitId;
            
//             setMessages(prev => [...prev, { 
//                 role: "bot", 
//                 content: "Generating commit summary...",
//                 isNew: true
//             }]);

//             try {
//                 const response = await fetch(`http://localhost:8000/api/analyze-commit?commit_id=${commitId}`);
                
//                 if (!response.ok) {
//                     throw new Error('Failed to analyze commit');
//                 }

//                 const data = await response.text();
                
//                 setMessages(prev => {
//                     const newMessages = [...prev];
//                     newMessages[newMessages.length - 1] = {
//                         role: "bot",
//                         content: data,
//                         isNew: true
//                     };
//                     return newMessages;
//                 });
//             } catch (error) {
//                 setMessages(prev => {
//                     const newMessages = [...prev];
//                     newMessages[newMessages.length - 1] = {
//                         role: "bot",
//                         content: "Failed to analyze commit. Please try again.",
//                         isNew: true
//                     };
//                     return newMessages;
//                 });
//             }
//         };

//         window.addEventListener('analyze-commit', handleCommitAnalysis);
//         return () => window.removeEventListener('analyze-commit', handleCommitAnalysis);
//     }, []);

//     const handleRepoSummary = async () => {
//         const trimmedURL = repoURL.trim();

//         if (!trimmedURL) {
//             setMessages(prev => [...prev, { 
//                 role: "bot", 
//                 content: "No repository URL found. Please try again.",
//                 isNew: true
//             }]);
//             return;
//         }

//         setMessages(prev => [...prev, { 
//             role: "bot", 
//             content: "Analyzing repository...",
//             isNew: true
//         }]);

//         try {
//             const apiURL = `http://localhost:8000/api/analyze-repository?url=${encodeURIComponent(trimmedURL)}`;
//             const response = await fetch(apiURL);
            
//             if (!response.ok) {
//                 throw new Error('Failed to fetch repository analysis');
//             }

//             const data = await response.text();
            
//             setMessages(prev => {
//                 const newMessages = [...prev];
//                 newMessages[newMessages.length - 1] = {
//                     role: "bot",
//                     content: data,
//                     isNew: true
//                 };
//                 return newMessages;
//             });
//         } catch (error) {
//             setMessages(prev => {
//                 const newMessages = [...prev];
//                 newMessages[newMessages.length - 1] = {
//                     role: "bot",
//                     content: `Analysis failed: ${error.message}`,
//                     isNew: true
//                 };
//                 return newMessages;
//             });
//         }
//     };

//     const handleSendMessage = async () => {
//         if (!inputText.trim()) return;

//         setMessages(prev => [...prev, { 
//             role: "user", 
//             content: inputText,
//             isNew: false
//         }]);
        
//         setMessages(prev => [...prev, { 
//             role: "bot", 
//             content: "Processing your query...",
//             isNew: true
//         }]);

//         try {
//             const apiURL = `http://localhost:8000/api/run-rag?query=${encodeURIComponent(inputText)}`;
//             const response = await fetch(apiURL);

//             if (!response.ok) {
//                 throw new Error('Failed to process query');
//             }

//             const data = await response.text();

//             setMessages(prev => {
//                 const newMessages = [...prev];
//                 newMessages[newMessages.length - 1] = {
//                     role: "bot",
//                     content: data,
//                     isNew: true
//                 };
//                 return newMessages;
//             });
//         } catch (error) {
//             setMessages(prev => {
//                 const newMessages = [...prev];
//                 newMessages[newMessages.length - 1] = {
//                     role: "bot",
//                     content: `Query failed: ${error.message}`,
//                     isNew: true
//                 };
//                 return newMessages;
//             });
//         }

//         setInputText('');
//     };

//     return (
//         <>
//             <Helmet>
//                 <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
//                 <link rel="preconnect" href="https://fonts.googleapis.com" />
//                 <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
//                 <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet" />
//             </Helmet>
//             <div className="chatbox-wrapper">
//                 <div className="message-box">
//                     {messages.map((message, index) => (
//                         <div key={index} className={`chat ${message.role === "bot" ? "response" : "message"}`}>
//                             <img id="avatar" src={message.role === "bot" ? chatbotImage : userImage} alt={message.role} />
//                             <span>
//                                 {message.role === "bot" && message.isNew ? (
//                                     <TypeWriter 
//                                         content={message.content} 
//                                         onComplete={() => {
//                                             setMessages(prev => prev.map((msg, i) => 
//                                                 i === index ? { ...msg, isNew: false } : msg
//                                             ));
//                                         }}
//                                     />
//                                 ) : (
//                                     renderFormattedContent(message.content)
//                                 )}
//                             </span>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="messagebar">
//                     <form 
//                         className="bar-wrapper"
//                         onSubmit={(e) => {
//                             e.preventDefault();
//                             handleSendMessage();
//                         }}
//                     >
//                         <input
//                             type="text"
//                             placeholder="Type a message..."
//                             ref={messageBarRef}
//                             value={inputText}
//                             onChange={(e) => setInputText(e.target.value)}
//                         />
//                         <button type="submit" className="send-button">
//                             <span className="material-symbols-rounded">send</span>
//                         </button>
//                         <button 
//                             type="button" 
//                             className="summary-button"
//                             onClick={handleRepoSummary}
//                         >
//                             Repo Summary
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Chatbot;

import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './Chat.css';
import userImage from '../../assets/chatBot/user-1.png';
import chatbotImage from '../../assets/chatBot/RAG.png';
import repoURL from './url.txt?raw';

// TypeWriter Component
const TypeWriter = ({ content, onComplete }) => {
    const [displayedContent, setDisplayedContent] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < content.length) {
            const timer = setTimeout(() => {
                setDisplayedContent(prev => prev + content[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 5); // Speed of typing
            return () => clearTimeout(timer);
        } else if (onComplete) {
            onComplete();
        }
    }, [currentIndex, content]);

    return renderFormattedContent(displayedContent);
};

// Utility function to format text with proper styling
const renderFormattedContent = (content) => {
    if (typeof content !== 'string') {
        content = JSON.stringify(content, null, 2);
    }

    // Format the content with markdown-style formatting
    content = content
        .replace(/\\n/g, '\n')
        .replace(/\\t/g, '    ')
        .replace(/\n/g, '<br />')
        .replace(/\*\*\*\*(.*?)\*\*\*\*/g, '<strong>$1</strong>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*\*\s*(.*?)\s*\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');

    const parts = content.split(/(```[\s\S]*?```|`[^`]+`)/g);
    
    return parts.map((part, index) => {
        if (part.startsWith("```")) {
            // Handle code blocks
            return (
                <pre key={index} className="code-block">
                    {part.slice(3, -3).trim()}
                </pre>
            );
        } else if (part.startsWith("`")) {
            // Handle inline code
            return (
                <code key={index} className="inline-code">
                    {part.slice(1, -1)}
                </code>
            );
        } else {
            // Handle regular text with HTML formatting
            return (
                <div 
                    key={index} 
                    className="formatted-text"
                    dangerouslySetInnerHTML={{ 
                        __html: part 
                    }}
                />
            );
        }
    });
};

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messageBarRef = useRef(null);
    const messageBoxRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
        }
    }, [messages]);

    // Handle commit analysis event
    useEffect(() => {
        const handleCommitAnalysis = async (event) => {
            const commitId = event.detail.commitId;
            
            setMessages(prev => [...prev, { 
                role: "bot", 
                content: "Generating commit summary...",
                isNew: true
            }]);

            try {
                const response = await fetch(`http://localhost:8000/api/analyze-commit?commit_id=${commitId}`);
                
                if (!response.ok) {
                    throw new Error('Failed to analyze commit');
                }

                const data = await response.text();
                
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = {
                        role: "bot",
                        content: data,
                        isNew: true
                    };
                    return newMessages;
                });
            } catch (error) {
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = {
                        role: "bot",
                        content: "Failed to analyze commit. Please try again.",
                        isNew: true
                    };
                    return newMessages;
                });
            }
        };

        window.addEventListener('analyze-commit', handleCommitAnalysis);
        return () => window.removeEventListener('analyze-commit', handleCommitAnalysis);
    }, []);

    const handleRepoSummary = async () => {
        if (isLoading) return;

        const trimmedURL = repoURL.trim();
        if (!trimmedURL) {
            setMessages(prev => [...prev, { 
                role: "bot", 
                content: "No repository URL found. Please try again.",
                isNew: true
            }]);
            return;
        }

        setIsLoading(true);
        setMessages(prev => [...prev, { 
            role: "bot", 
            content: "Analyzing repository...",
            isNew: true
        }]);

        try {
            const apiURL = `http://localhost:8000/api/analyze-repository?url=${encodeURIComponent(trimmedURL)}`;
            const response = await fetch(apiURL);
            
            if (!response.ok) {
                throw new Error('Failed to fetch repository analysis');
            }

            const data = await response.text();
            
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                    role: "bot",
                    content: data,
                    isNew: true
                };
                return newMessages;
            });
        } catch (error) {
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                    role: "bot",
                    content: `Analysis failed: ${error.message}`,
                    isNew: true
                };
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputText.trim() || isLoading) return;

        setIsLoading(true);
        setMessages(prev => [...prev, { 
            role: "user", 
            content: inputText,
            isNew: false
        }]);
        
        setMessages(prev => [...prev, { 
            role: "bot", 
            content: "Processing your query...",
            isNew: true
        }]);

        try {
            const apiURL = `http://localhost:8000/api/run-rag?query=${encodeURIComponent(inputText)}`;
            const response = await fetch(apiURL);

            if (!response.ok) {
                throw new Error('Failed to process query');
            }

            const data = await response.text();
            
            // Parse and clean the RAG response
            try {
                const parsedData = JSON.parse(data);
                let cleanResponse = parsedData.response;
                
                // Clean up the response text
                cleanResponse = cleanResponse
                    .replace(/\\n/g, '\n')
                    .replace(/\\t/g, '\t')
                    .replace(/\\"/g, '"')
                    .replace(/\\/g, '')
                    .trim();

                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = {
                        role: "bot",
                        content: cleanResponse,
                        isNew: true
                    };
                    return newMessages;
                });
            } catch (parseError) {
                // If JSON parsing fails, use the raw text
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = {
                        role: "bot",
                        content: data,
                        isNew: true
                    };
                    return newMessages;
                });
            }
        } catch (error) {
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                    role: "bot",
                    content: `Query failed: ${error.message}`,
                    isNew: true
                };
                return newMessages;
            });
        } finally {
            setIsLoading(false);
            setInputText('');
        }
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
                <div className="message-box" ref={messageBoxRef}>
                    {messages.map((message, index) => (
                        <div key={index} className={`chat ${message.role === "bot" ? "response" : "message"}`}>
                            <img 
                                id="avatar" 
                                src={message.role === "bot" ? chatbotImage : userImage} 
                                alt={message.role} 
                            />
                            <span>
                                {message.role === "bot" && message.isNew ? (
                                    <TypeWriter 
                                        content={message.content} 
                                        onComplete={() => {
                                            setMessages(prev => prev.map((msg, i) => 
                                                i === index ? { ...msg, isNew: false } : msg
                                            ));
                                        }}
                                    />
                                ) : (
                                    renderFormattedContent(message.content)
                                )}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="messagebar">
                    <form 
                        className="bar-wrapper"
                        onSubmit={handleSendMessage}
                    >
                        <input
                            type="text"
                            placeholder="Type a message..."
                            ref={messageBarRef}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            disabled={isLoading}
                        />
                        <button 
                            type="submit" 
                            className="send-button"
                            disabled={isLoading || !inputText.trim()}
                        >
                            <span className="material-symbols-rounded">send</span>
                        </button>
                        <button 
                            type="button" 
                            className="summary-button"
                            onClick={handleRepoSummary}
                            disabled={isLoading}
                        >
                            Repo Summary
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Chatbot;