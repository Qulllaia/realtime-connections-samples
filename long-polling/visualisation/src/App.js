import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  const sendMessage = async () => {
    await axios.post("http://localhost:8080/new-messages", {
      message: value,
      id: Date.now(),
    });
  };

  useEffect(() => {
    subsrcibe();
  }, []);
  const subsrcibe = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/get-messages");
      setMessages((prev) => [data, ...prev]);
      await subsrcibe();
    } catch (e) {
      setTimeout(() => {
        subsrcibe();
      }, 5000);
    }
  };

  return (
    <div className="App">
      <div className="center">
        <div className="message-column">
          {messages.map((message) => {
            return (
              <div className="message" key={message.id}>
                {message.message}
              </div>
            );
          })}
        </div>
        <div className="form">
          <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          ></input>
          <button onClick={sendMessage}>Отправить</button>
        </div>
      </div>
    </div>
  );
}

export default App;
