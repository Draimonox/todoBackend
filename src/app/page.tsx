"use client";
import { useState } from "react";

function TodoApp() {
  const [todo, setTodo] = useState("");
  const [todoArr, setTodoArr] = useState<string[]>([]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTodo(e.currentTarget.value);
  }

  async function addTodo() {
    try {
      const res = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: {
            id: Date.now().toString(),
            content: todo,
            dateCreated: new Date().toISOString(),
          },
        }),
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      console.log("Todo created:", data);
      setTodoArr([...todoArr, data]);
    } catch (err) {
      console.error("Error creating todo:", err);
    }
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

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {todoArr.map((element, index) => (
          <li
            onClick={toggleLineThrough}
            key={index}
            style={{ cursor: "pointer" }}
          >
            - {element.todo}
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoApp;
