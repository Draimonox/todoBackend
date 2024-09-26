"use client";
import { Button, Center, Input } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";

function AuthenticationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  async function handleRegistration(event: React.FormEvent) {
    event.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (response.ok) {
        console.log(await response.json());
        router.push("/");
      } else {
        throw new Error("Response was not okay");
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  function handleOnClick(event: React.MouseEvent) {
    event.preventDefault();
    handleRegistration(event);
  }

  ///
  return (
    <>
      <Center h={500} style={{ marginTop: "2.5%" }}>
        <form>
          <Input
            name="name"
            radius="xl"
            placeholder="Name"
            onChange={handleOnChange}
            value={name}
          />
          <Input
            name="email"
            style={{ marginTop: "5px" }}
            radius="xl"
            placeholder="Email"
            onChange={handleOnChange}
            value={email}
          />
          <Input
            name="password"
            radius="xl"
            placeholder="Password"
            style={{ marginTop: "5px" }}
            onChange={handleOnChange}
            value={password}
          />
          <Button
            variant="filled"
            color="rgba(115, 5, 5, 1)"
            radius="xl"
            type="button"
            onClick={handleOnClick}
            style={{ marginTop: "5px" }}
          >
            Register
          </Button>
        </form>
      </Center>
    </>
  );
}

export default AuthenticationForm;
