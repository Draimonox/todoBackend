"use client";
import { useEffect, useState } from "react";
import { Button, Center, Input, List, Text } from "@mantine/core";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface Todo {
  id: string;
  todo: string;
  author: string;
}

function TodoApp() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState<string | null>(null);
  const [author, setAuthor] = useState("");

  const router = useRouter();

  useEffect(() => {
    const userId = getCookie("userId");
    console.log("User ID from cookie:", userId); // Check cookie value
    if (!userId) {
      router.push("/login"); // Redirect if no user ID is found
    } else {
      setAuthor(userId as string); // Ensure author is set
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTodo(value);
    console.log(value);
  }

  async function addTodo() {
    try {
      if (!todo || !author) {
        console.error("Todo and author must be provided");
        return;
      }
      const res = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo,
          author,
        }),
        credentials: "include", // Ensure cookies are sent
      });
      const newTodo = await res.json();
      console.log(newTodo);
      if (!res.ok) {
        throw new Error(newTodo.details);
      }

      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setTodo("");
    } catch (err) {
      console.error("Error creating todo:", err);
    }
  }

  async function deleteTodo(id: string) {
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
        credentials: "include",
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
        credentials: "include", // Ensure cookies are sent
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedTodo = await res.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === currentTodoId ? updatedTodo : todo
        )
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
    deleteCookie("userId");
    router.push("/login");
  }

  useEffect(() => {
    async function fetchTodos() {
      try {
        const authorId = getCookie("userId");
        const response = await fetch("/api/todo", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `${authorId}`,
          },
          credentials: "include",
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        console.log(data);
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
          radius="xl"
          type="button"
          color="rgba(115, 5, 5, 1)"
          size="lg"
          onClick={() => {
            resetCookies();
          }}
          style={{
            float: "right",
            margin: "10px",
          }}
        >
          Log out
        </Button>
      </header>
      <div style={{ color: "white" }}>
        <Center>
          <Text td="underline" size="xl" style={{ margin: "15px" }} fw={700}>
            Personal To Do List
          </Text>
        </Center>
        <Center h={75}>
          <Input
            variant="filled"
            size="lg"
            radius="xl"
            type="text"
            placeholder="Add Todo"
            value={todo}
            onChange={handleInputChange}
            style={{ color: "white", width: "300px" }}
          />
          <Button
            radius="xl"
            size="lg"
            type="button"
            color="rgba(115, 5, 5, 1)"
            onClick={isEditing ? updateTodo : addTodo}
            style={{
              marginLeft: "5px",
            }}
          >
            {isEditing ? "Update Todo" : "Add Todo"}
          </Button>
        </Center>

        <List withPadding style={{}}>
          {todos.map((todo) => (
            <List.Item key={todo.id} style={{ cursor: "pointer" }}>
              • {todo.todo}
              <Button
                size="xs"
                radius="xl"
                type="button"
                color="rgba(115, 5, 5, 1)"
                onClick={() => deleteTodo(todo.id)}
                style={{
                  marginLeft: "10px",
                }}
              >
                Delete
              </Button>
              <Button
                size="xs"
                radius="xl"
                type="button"
                color="rgba(115, 5, 5, 1)"
                onClick={() => handleEditClick(todo)}
                style={{
                  marginLeft: "10px",
                }}
              >
                Edit
              </Button>
            </List.Item>
          ))}
        </List>
      </div>
    </>
  );
}

export default TodoApp;
