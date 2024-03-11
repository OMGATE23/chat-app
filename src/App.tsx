import { ChangeEvent, useEffect, useState } from "react";

import "./App.css";
import useFirestore from "./hooks/useFirestore";

function App() {
  const [name, setName] = useState<string>("");
  const [showChat, setShowChat] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [response, setResponse] = useState({
    errorOccured: false,
  });
  const [messages, setMessages] = useState({
    errorOccured: false,
    messages: [],
  });
  const { sendMessage, getMessages } = useFirestore();
  useEffect(() => {
    console.log({ messages });
  }, [messages]);
  useEffect(() => {
    console.log({ response });
  }, [response]);
  useEffect(() => {
    getMessages(setMessages);
  }, []);
  return (
    <>
      {!showChat && (
        <div className="name-modal">
          <div className="name-form">
            <label>
              Enter your name:{" "}
              <input
                type="string"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                }}
                value={name}
              />
            </label>
          </div>
          <button
            className="name-form-button"
            onClick={() => {
              setShowChat(true);
            }}
          >
            Confirm name
          </button>
        </div>
      )}

      {showChat && (
        <div className="message-display">
          <div className="message-container">
            <ul className="messages">
              {messages.messages.map((message: any) => (
                <li
                  className={`message ${name === message.name && "self"}`}
                  key={message.id}
                >
                  <span className="message-name">{message.name}</span>
                  <br></br>
                  <span className="message-content">{message.message}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="message-input-container">
            <input
              className="message-input"
              type="text"
              value={messageInput}
              placeholder="Enter Message..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setMessageInput(e.target.value);
              }}
            />

            <button
              className="send-btn"
              disabled={!messageInput}
              onClick={async () => {
                await sendMessage(name, messageInput, setResponse);
                setMessageInput("");
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
