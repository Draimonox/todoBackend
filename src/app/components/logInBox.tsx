// // if user creating new account, push new account to DataBase
// // if user has account, you want to GET from data base

// "use client";

// import { useToggle, upperFirst } from "@mantine/hooks";
// import { useForm } from "@mantine/form";
// import {
//   TextInput,
//   PasswordInput,
//   Text,
//   Paper,
//   Group,
//   PaperProps,
//   Button,
//   Checkbox,
//   Anchor,
//   Stack,
//   Container,
// } from "@mantine/core";

// export function AuthenticationForm(props: PaperProps) {
//   const [type, toggle] = useToggle(["login", "register"]);
//   const form = useForm({
//     initialValues: {
//       email: "",
//       name: "",
//       password: "",
//       terms: true,
//     },

//     validate: {
//       email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
//       password: (val) =>
//         val.length <= 6
//           ? "Password should include at least 6 characters"
//           : null,
//     },
//   });
//   async function registerUser() {
//     const res = await fetch("../api/register");
//     const data = await res.json();
//     console.log(data);
//   }

//   return (
//     <Container
//       size="xs"
//       px="xs"
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "90vh",
//       }}
//     >
//       <Paper radius="md" p="md" withBorder {...props}>
//         <Text size="lg" fw={500}>
//           Welcome to the free Todo App, {type} with
//         </Text>

//         <form onSubmit={form.onSubmit(() => {})}>
//           <Stack>
//             {type === "register" && (
//               <TextInput
//                 label="Name"
//                 placeholder="Your name"
//                 value={form.values.name}
//                 onChange={(event) =>
//                   form.setFieldValue("name", event.currentTarget.value)
//                 }
//                 radius="md"
//               />
//             )}

//             <TextInput
//               required
//               label="Email"
//               placeholder="hello@mantine.dev"
//               value={form.values.email}
//               onChange={(event) =>
//                 form.setFieldValue("email", event.currentTarget.value)
//               }
//               error={form.errors.email && "Invalid email"}
//               radius="md"
//             />

//             <PasswordInput
//               required
//               label="Password"
//               placeholder="Your password"
//               value={form.values.password}
//               onChange={(event) =>
//                 form.setFieldValue("password", event.currentTarget.value)
//               }
//               error={
//                 form.errors.password &&
//                 "Password should include at least 6 characters"
//               }
//               radius="md"
//             />

//             {type === "register" && (
//               <Checkbox
//                 label="I accept terms and conditions"
//                 checked={form.values.terms}
//                 onChange={(event) =>
//                   form.setFieldValue("terms", event.currentTarget.checked)
//                 }
//               />
//             )}
//           </Stack>

//           <Group justify="space-between" mt="xl">
//             <Anchor
//               component="button"
//               type="button"
//               color="dimmed"
//               onClick={() => toggle()}
//               size="xs"
//             >
//               {type === "register"
//                 ? "Already have an account? Login"
//                 : "Don't have an account? Register"}
//             </Anchor>
//             <Button type="submit" radius="xl">
//               {upperFirst(type)}
//             </Button>
//           </Group>
//         </form>
//       </Paper>
//     </Container>
//   );
// }

import React from "react";

export const logInBox = () => {
  return <div>Under contruction</div>;
};
