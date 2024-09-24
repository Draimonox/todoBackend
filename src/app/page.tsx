"use client";
import { useEffect, useState } from "react";

function TodoApp() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<{ id: string; todo: string }[]>([]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTodo(e.target.value);
  }

  async function addTodo() {
    try {
      const res = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo, // Matches the structure expected by the server
        }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const newTodo = await res.json();
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setTodo("");
    } catch (err) {
      console.error("Error creating todo:", err);
    }
  }

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch("/api/todo", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    }

    fetchTodos();
  }, []);

  return (
    <div style={{ color: "white" }}>
      <h1 style={{ textAlign: "center" }}>Todo List</h1>
      <input
        type="text"
        placeholder="Add Todo"
        value={todo}
        onChange={handleInputChange}
        style={{ color: "black", display: "block", margin: "auto" }}
      />
      <button
        onClick={addTodo}
        style={{
          border: "1px solid white",
          borderRadius: "25px",
          margin: "10px auto",
          display: "block",
        }}
      >
        Add Todo
      </button>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {todos.map((todoItem) => (
          <li
            key={todoItem.id}
            style={{ cursor: "pointer" }}
            onClick={() => {
              console.log(todoItem.id);
            }}
          >
            - {todoItem.todo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
