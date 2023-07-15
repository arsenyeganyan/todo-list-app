import Todos from "./Todos";
import "./App.css";
import { useState } from "react";
import { useStore } from "./store";

function App() {
  const date = new Date();
  const dateArr = date.toDateString().split(' ');
  const dateFormat = dateArr[0] + ', ' + dateArr[2] + ' ' + dateArr[1]
    + ' ' + dateArr[3];

  const [text, setText] = useState('');
  const addTask = useStore((store) => store.addTask);

  return (
    <div className="app">
      <div className="header">
        <h1>Write your todo</h1>
        <span className="date">{dateFormat}</span>
      </div>
      <input 
        type="text"
        placeholder="Your Todo here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="add--btn"
        onClick={(e) => {
          e.preventDefault();
          if(text !== '') {
            addTask(text, Date.now(), "pending");
          };
          setText("");
        }}
      >
        Add a Todo
      </button>
      <Todos state="pending" id={Date.now()}/>
      <Todos state="done" id={Date.now()}/>
    </div>
  )
}

export default App;