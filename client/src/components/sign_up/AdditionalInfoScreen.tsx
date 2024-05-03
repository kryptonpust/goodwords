import {
  Button,
  Center,
  Container,
  Group,
  Paper,
  Select,
  Title,
  Text,
  Anchor,
  Space,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSignUpStore } from "../../hooks/useSignUpStore";
import { DatePickerInput } from "@mantine/dates";
export function AdditionalInfoScreen() {
  const navigate = useNavigate();
  const [dob, gender, setAdditionalInfo] = useSignUpStore((state) => [
    state.dob,
    state.gender,
    state.setAdditionalInfo,
  ]);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      dob: dob,
      gender: gender,
    },
    onValuesChange: (values) => {
      setAdditionalInfo(values.dob, values.gender);
    },
    validate: (values) => ({
      dob: !values.dob ? "Date of birth is required" : null,
      gender: !values.gender ? "Gender is required" : null,
    }),
  });

  const handleNext = () => {
    navigate({ to: "/sign_up/account-info" });
  };

  const handlePrev = () => {
    navigate({ to: "/sign_up" });
  };

  return (
    <Container size={420} my={"15vh"}>
      <Title ta="center">Sign Up</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleNext)}>
          <DatePickerInput
            label="Date of Birth"
            placeholder="Your date of birth"
            required
            key={form.key("dob")}
            {...form.getInputProps("dob")}
          />
          <Select
            label="Gender"
            placeholder="Your gender"
            required
            mt="md"
            data={[{value: "MALE", label: "Male"}, {value: "FEMALE", label: "Female"}]}
            key={form.key("gender")}
            {...form.getInputProps("gender")}
          />
          <Center>
            <Group>
              <Button mt="xl" onClick={handlePrev}>
                {" "}
                Previous{" "}
              </Button>
              <Button mt="xl" type="submit">
                Next
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
