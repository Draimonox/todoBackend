"use client";
import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface Todo {
  id: number;
  todo: string;
}

function TodoApp() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState<number | null>(null);
  const [authCookies, setAuthCookies] = useState({ email: "", password: "" });
  const router = useRouter();

  useEffect(() => {
    const email = getCookie("email") || "";
    const password = getCookie("password") || "";
    if (!email || !password) {
      router.push("/login");
    } else {
      setAuthCookies({ email, password });
      console.log(authCookies);
      console.log(email, password);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          todo,
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

  async function deleteTodo(id: number) {
    try {
      console.log("Deleting todo with id:", id);
      const res = await fetch("/api/updateState", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Response error text:", errorText);
        throw new Error("Network Error");
      }

      await res.json();
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  }

  async function updateTodo() {
    try {
      const res = await fetch("/api/updateState", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentTodoId,
          todo,
        }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedTodo = await res.json();
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === currentTodoId ? updatedTodo : t))
      );
      setTodo("");
      setIsEditing(false);
      setCurrentTodoId(null);
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  }

  function handleEditClick(todo: Todo) {
    setIsEditing(true);
    setCurrentTodoId(todo.id);
    setTodo(todo.todo);
  }

  function resetCookies() {
    deleteCookie("email");
    deleteCookie("password");
    router.push("/login");
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
    <>
      <header>
        <Button
          onClick={() => {
            resetCookies();
          }}
          style={{
            float: "right",
            margin: "10px",
          }}
        >
          Log Out
        </Button>
      </header>
      <div style={{ color: "white" }}>
        <h1 style={{ textAlign: "center" }}>Todo List</h1>
        <input
          type="text"
          placeholder="Add Todo"
          value={todo}
          onChange={handleInputChange}
          style={{ color: "white", display: "block", margin: "auto" }}
        />
        <Button
          onClick={isEditing ? updateTodo : addTodo}
          style={{
            border: "1px solid white",
            borderRadius: "25px",
            margin: "10px auto",
            display: "block",
          }}
        >
          {isEditing ? "Update Todo" : "Add Todo"}
        </Button>

        <ul style={{ listStyleType: "none", padding: 0 }}>
          {todos.map((todo) => (
            <li key={todo.id} style={{ cursor: "pointer" }}>
              - {todo.todo}
              <Button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  border: "1px solid white",
                  borderRadius: "25px",
                  marginLeft: "10px",
                }}
              >
                Delete
              </Button>
              <Button
                onClick={() => handleEditClick(todo)}
                style={{
                  border: "1px solid white",
                  borderRadius: "25px",
                  marginLeft: "10px",
                }}
              >
                Edit
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TodoApp;
