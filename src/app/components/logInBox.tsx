"use client";

// import { useState } from "react";
// import { useForm } from "@mantine/form";
// import {
//   TextInput,
//   PasswordInput,
//   Text,
//   Paper,
//   Group,
//   PaperProps,
//   Button,
//   Divider,
//   Checkbox,
//   Anchor,
//   Stack,
//   Container,
// } from "@mantine/core";
// import { upperFirst } from "@mantine/hooks";
// import { useRouter } from "next/navigation";

// props: PaperProps
export function AuthenticationForm() {
  return (
    <>
      <h1>hello</h1>
    </>
  );
  // const [type, toggle] = useToggle(["login", "register"]);
  // const form = useForm({
  //   initialValues: {
  //     email: "",
  //     name: "",
  //     password: "",
  //     terms: true,
  //   },

  //   validate: {
  //     email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
  //     password: (val) =>
  //       val.length <= 6
  //         ? "Password should include at least 6 characters"
  //         : null,
  //   },
  // });

  // const router = useRouter(); // Initialize the router

  // const handleSubmit = async (values: typeof form.values) => {
  //   const endpoint = type === "register" ? "/api/register" : "/api/login";
  //   const userInfo = {
  //     email: values.email,
  //     password: values.password,
  //   };

  //   console.log("Sending request to:", endpoint);
  //   console.log("Request body:", userInfo);

  //   try {
  //     const response = await fetch(endpoint, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         userInfo: {
  //           ...userInfo,
  //           ...(type === "register" && {
  //             name: values.name,
  //             dateCreated: new Date().toISOString(),
  //           }),
  //         },
  //       }),
  //     });

  //     const data = await response.json();

  //     console.log("Response status:", response.status);
  //     console.log("Response data:", data);

  //     if (response.ok) {
  //       console.log(`${upperFirst(type)} successful:`, data);
  //       router.push("/dashboard"); // Use an absolute path for redirection
  //     } else {
  //       console.error(`${upperFirst(type)} error:`, data.message);
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };

  // return (
  //   <Container
  //     size="xs"
  //     px="xs"
  //     style={{
  //       display: "flex",
  //       justifyContent: "center",
  //       alignItems: "center",
  //       minHeight: "90vh",
  //     }}
  //   >
  //     <Paper radius="md" p="md" withBorder {...props}>
  //       <Text size="lg" fw={500}>
  //         Welcome to the free Todo App, {type} with
  //       </Text>

  //       <Divider
  //         label="Or continue with email"
  //         labelPosition="center"
  //         my="lg"
  //       />

  //       <form onSubmit={form.onSubmit(handleSubmit)}>
  //         <Stack>
  //           {type === "register" && (
  //             <TextInput
  //               label="Name"
  //               placeholder="Your name"
  //               value={form.values.name}
  //               onChange={(event) =>
  //                 form.setFieldValue("name", event.currentTarget.value)
  //               }
  //               radius="md"
  //             />
  //           )}

  //           <TextInput
  //             required
  //             label="Email"
  //             placeholder="hello@mantine.dev"
  //             value={form.values.email}
  //             onChange={(event) =>
  //               form.setFieldValue("email", event.currentTarget.value)
  //             }
  //             error={form.errors.email && "Invalid email"}
  //             radius="md"
  //           />

  //           <PasswordInput
  //             required
  //             label="Password"
  //             placeholder="Your password"
  //             value={form.values.password}
  //             onChange={(event) =>
  //               form.setFieldValue("password", event.currentTarget.value)
  //             }
  //             error={
  //               form.errors.password &&
  //               "Password should include at least 6 characters"
  //             }
  //             radius="md"
  //           />

  //           {type === "register" && (
  //             <Checkbox
  //               label="I accept terms and conditions"
  //               checked={form.values.terms}
  //               onChange={(event) =>
  //                 form.setFieldValue("terms", event.currentTarget.checked)
  //               }
  //             />
  //           )}
  //         </Stack>

  //         <Group justify="space-between" mt="xl">
  //           <Anchor
  //             component="button"
  //             type="button"
  //             color="dimmed"
  //             onClick={() => toggle()}
  //             size="xs"
  //           >
  //             {type === "register"
  //               ? "Already have an account? Login"
  //               : "Don't have an account? Register"}
  //           </Anchor>
  //           <Button type="submit" radius="xl">
  //             {upperFirst(type)}
  //           </Button>
  //         </Group>
  //       </form>
  //     </Paper>
  //   </Container>
  // );
}

// // Custom useToggle hook
// function useToggle(initialState: string[]): [string, () => void] {
//   const [state, setState] = useState(initialState[0]);
//   const toggle = () => {
//     setState((prevState) =>
//       prevState === initialState[0] ? initialState[1] : initialState[0]
//     );
//   };
//   return [state, toggle];
// }
