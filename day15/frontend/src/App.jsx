import { useState } from "react";
import React from "react";

const App = () => {
  const [text, setText] = useState("");

  async function getMessage() {
    const rawMessage = await fetch("http://localhost:5000/message");
    const message = await rawMessage.json();
    setText(JSON.stringify(message, null, 2));
  }
  return (
    <div>
      <button onClick={getMessage}>Get message</button>
      <p id="result">{text}</p>
    </div>
  );
};

export default App;
