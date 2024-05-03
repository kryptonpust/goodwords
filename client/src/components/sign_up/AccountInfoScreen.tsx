import {
  Anchor,
  Button,
  Center,
  Container,
  Group,
  Paper,
  PasswordInput,
  Space,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSignUpStore } from "../../hooks/zustand/useSignUpStore";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { SIGN_UP_USER } from "../../utils/mutations";
import { useAuthStore } from "../../hooks/zustand/useAuthStore";
import { Gender } from "../../__generated__/graphql";

export function AccountInfoScreen() {
  const [signUpUser, { data, loading }] = useMutation(SIGN_UP_USER);
  const [setToken] = useAuthStore((state) => [state.setToken]);
  const navigate = useNavigate();
  const [firstName, lastName, dob, gender, email, setEmail, resetSignUpStore] =
    useSignUpStore((state) => [
      state.firstName,
      state.lastName,
      state.dob,
      state.gender,
      state.email,
      state.setEmail,
      state.reset,
    ]);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: email,
      password: "",
      confirmPassword: "",
    },
    onValuesChange: (values) => {
      setEmail(values.email);
    },
    validate: (values) => ({
      email: !values.email ? "Email is required" : null,
      password: !values.password ? "Password is required" : null,
      confirmPassword:
        values.password !== values.confirmPassword
          ? "Passwords do not match"
          : null,
    }),
  });

  useEffect(() => {
    if (data) {
      setToken(data.register.token, data.register.user.fullName);
      navigate({ to: "/posts" });
      resetSignUpStore();
    }
  }, [data, navigate, resetSignUpStore, setToken]);
  const handleNext = (values: typeof form.values) => {
    console.log(firstName, lastName, dob, gender, email, values.password);
    signUpUser({
      variables: {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dob,
        gender: gender as Gender,
        email: email,
        password: values.password,
      },
    });
  };
  const handlePrev = () => {
    navigate({ to: "/sign_up/additional-info" });
  };
  return (
    <Container size={420} my={"15vh"}>
      <Title ta="center">Sign Up</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleNext)}>
          <TextInput
            label="Email"
            placeholder="Your email"
            required
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            type="password"
            required
            mt="md"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            required
            mt="md"
            key={form.key("confirmPassword")}
            {...form.getInputProps("confirmPassword")}
          />
          <Center>
            <Group>
              <Button mt="xl" onClick={handlePrev}>
                Previous
              </Button>
              <Button
                mt="xl"
                type="submit"
                loading={loading}
                loaderProps={{ type: "dots" }}
              >
                Sign up
              </Button>
            </Group>
          </Center>
          <Space h={10} />
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Already have an Account?{" "}
            <Link to="/" style={{ textDecoration: "none" }}>
              <Anchor size="sm" component="button">
                Sign In
              </Anchor>
            </Link>
          </Text>
        </form>
      </Paper>
    </Container>
  );
}
