import {
  Anchor,
  Button,
  Container,
  Paper,
  Space,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSignUpStore } from "../../hooks/zustand/useSignUpStore";

export function PersonalInfoScreen() {
  const navigate = useNavigate();
  const [firstName, lastName, setPersonalInfo] = useSignUpStore((state) => [
    state.firstName,
    state.lastName,
    state.setPersonalInfo,
  ]);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      firstName: firstName,
      lastName: lastName,
    },
    onValuesChange: (values) => {
      setPersonalInfo(values.firstName, values.lastName);
    },
    validate: (values) => ({
      firstName: !values.firstName ? "First name is required" : null,
      lastName: !values.lastName ? "Last name is required" : null,
    }),
  });
  const handleNext = () => {
    navigate({ to: "/sign_up/additional-info" });
  };
  return (
    <Container size={420} my={"15vh"}>
      <Title ta="center">Sign Up</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleNext)}>
          <TextInput
            label="First name"
            placeholder="Your first name"
            required
            key={form.key("firstName")}
            {...form.getInputProps("firstName")}
          />
          <TextInput
            label="Last Name"
            placeholder="Your last name"
            required
            mt="md"
            key={form.key("lastName")}
            {...form.getInputProps("lastName")}
          />
          <Button fullWidth mt="xl" type="submit">
            Next
          </Button>
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
