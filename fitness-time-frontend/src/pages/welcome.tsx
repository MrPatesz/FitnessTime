import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AuthService from "../services/AuthService";
import {
  Button,
  TextInput,
  PasswordInput,
  Group,
  Modal,
  Stack,
  Card,
} from "@mantine/core";
import { IconKey, IconUser } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";

export default function WelcomePage() {
  const [openCreate, setOpenCreate] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const authService = AuthService();
  const router = useRouter();
  const { data: session } = useSession();

  const goToLoginPage = () => signIn(undefined, { callbackUrl: "/" });

  if (session) {
    router.replace("/");
  }

  return (
    <Stack align="center" justify="center" sx={{ height: "100vh" }}>
      <Card withBorder>
        <h1 style={{ marginTop: 0 }}>Welcome to Fitness Time!</h1>
        <Group position="center">
          <Button onClick={() => setOpenCreate(true)}>Register</Button>
          <Button onClick={goToLoginPage}>Login</Button>
        </Group>
      </Card>
      <Modal
        opened={openCreate}
        onClose={() => setOpenCreate(false)}
        title="Registration"
        closeOnClickOutside={false}
      >
        <Stack>
          <TextInput
            label="Username"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
            withAsterisk
            icon={<IconUser />}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            withAsterisk
            icon={<IconKey />}
          />
          <Button
            onClick={() =>
              authService
                .register({ username, password })
                .then(goToLoginPage)
                .catch(() =>
                  showNotification({
                    color: "red",
                    title: "Username taken",
                    message: "This username is already in use!",
                  })
                )
            }
          >
            Register
          </Button>
        </Stack>
      </Modal>
    </Stack>
  );
}
