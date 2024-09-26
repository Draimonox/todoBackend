"use client";
import { Anchor, Button, Center, Input } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import { PasswordInput } from "@mantine/core";
import { Divider } from "@mantine/core";
import { setCookie } from "cookies-next";

function LogInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  async function handleRegistration(event: React.FormEvent) {
    event.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.ok) {
        console.log(await response.json());
        setCookie("email", email);
        setCookie("password", password);
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
    if (name === "email") {
      setEmail(value);
      console.log(email);
    } else if (name === "password") {
      setPassword(value);
      console.log(password);
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
          <Divider
            my="xs"
            label={
              <Anchor
                onClick={() => {
                  router.push("/registration");
                }}
                target="_self"
                inherit
              >
                Register
              </Anchor>
            }
          />
          <Input
            name="email"
            style={{ marginTop: "5px" }}
            radius="xl"
            placeholder="Email"
            onChange={handleOnChange}
            value={email}
          />
          <PasswordInput
            radius="xl"
            name="password"
            placeholder="Password"
            style={{ marginTop: "5px" }}
            onChange={handleOnChange}
            value={password}
          />
          <Button
            variant="filled"
            radius="xl"
            type="button"
            onClick={handleOnClick}
            style={{ marginTop: "5px" }}
          >
            Log In
          </Button>{" "}
        </form>
      </Center>
    </>
  );
}

export default LogInForm;
