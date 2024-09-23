"use client";
import { useState } from "react";

function TodoApp() {
  const [todo, setTodo] = useState("");
  const [todoArr, setTodoArr] = useState<string[]>([]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTodo(e.currentTarget.value);
  }

  function addTodo() {
    setTodoArr([...todoArr, todo]);
    setTodo("");
  }

  function clearTodo() {
    setTodoArr([]);
  }

  function toggleLineThrough(e: React.MouseEvent<HTMLLIElement>) {
    const element = e.currentTarget;
    if (element.style.textDecoration === "line-through") {
      element.style.textDecoration = "none";
    } else {
      element.style.textDecoration = "line-through";
    }
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Todo List</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Add Todo"
        value={todo}
        onChange={handleInputChange}
        style={{ color: "black", display: "block", margin: "auto" }}
      />
      <button
        onClick={addTodo}
        style={{
          border: "1px",
          borderColor: "white",
          borderStyle: "solid",
          borderRadius: "25px",
          marginLeft: "45.5%",
        }}
      >
        Add Todo
      </button>
      <button
        onClick={clearTodo}
        style={{
          border: "1px",
          borderColor: "white",
          borderStyle: "solid",
          borderRadius: "25px",
        }}
      >
        Clear List
      </button>
      <ul>
        {todoArr.map((element, index) => (
          <li onClick={toggleLineThrough} key={index}>
            - {element}
          </li>
        ))}
      </ul>
    </>
  );
}
export default TodoApp;
