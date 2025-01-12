import { useRef, useState, useEffect } from "react";
import "./App.css";
import { MessageComponent } from "./components/MessageComponent";

function App() {
  const ws = useRef();
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [username, setUsername] = useState("username");

  const connect = () => {
    ws.current = new WebSocket("ws://localhost:8000");

    ws.current.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        username: "username",
        id: new Date(),
      };
      if (connected) ws.current.send(JSON.stringify(message));
    };

    ws.current.onmessage = (event) => {
      // console.log(event.data);
      const message = JSON.parse(event.data);
      // const message = event.data;
      setMessages((prev) => [message, ...prev]);
    };
  };

  const sendMessage = async () => {
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: "message",
    };
    setValue("");
    setMessages((prev) => [message, ...prev]);
    ws.current.send(JSON.stringify(message));
  };

  if (!connected)
    return (
      <div className="App">
        Нет подключения
        <div className="chatBox">
          <input
            onChange={(event) => setUsername(event.target.value)}
            value={username}
          ></input>
          <button className="sendButton" onClick={() => connect()}>
            Отправить
          </button>
        </div>
      </div>
    );

  return (
    <div className="App">
      {messages.map((val, _) => (
        <MessageComponent data={val} _={_}></MessageComponent>
      ))}
      <div className="chatBox">
        <input
          onChange={(event) => setValue(event.target.value)}
          value={value}
        ></input>
        <button className="sendButton" onClick={() => sendMessage()}>
          Отправить
        </button>
      </div>
    </div>
  );
}

export default App;
