import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Space,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import { EMAIL_REGEX } from "../../utils/constants";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";

export function SignInScreen() {
  const [loginUser, { data, loading }] = useMutation(LOGIN_USER);
  const setToken = useAuthStore((state) => state.setToken);

  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => ({
      email: EMAIL_REGEX.test(values.email) ? null : "Invalid email",
      password: values.password.length >= 6 ? null : "Password is too short",
    }),
  });

  useEffect(() => {
    if (data) {
      notifications.show({
        title: "Sign in",
        message: "You have been successfully signed in",
        color: "teal",
      });
      setToken(data.login.token);
      navigate({ to: "/posts" });
    }
  }, [data, navigate, setToken]);
  const handleSubmit = (values: typeof form.values) => {
    loginUser({ variables: values });
  };
  return (
    <Container size={420} my={"15vh"}>
      <Title ta="center">Sign In</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="Your email address"
            required
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Button fullWidth mt="xl" type="submit" loading={loading} loaderProps={{type: 'dots'}}>
            Sign in
          </Button>
          <Space h={10} />
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Don&apos;t have an account?{" "}
            <Link to="/sign_up" style={{ textDecoration: "none" }}>
              <Anchor size="sm" component="button">
                Sign up
              </Anchor>
            </Link>
          </Text>
        </form>
      </Paper>
    </Container>
  );
}
