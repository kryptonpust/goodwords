import {
  AppShell,
  Avatar,
  Button,
  Flex,
  Grid,
  SegmentedControl,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../hooks/useAuthStore";

export function AppLayout() {
  const auth = useAuthStore();
  const navigate = useNavigate();
  const handleSignOut = () => {
    auth.removeToken();
    navigate({ to: "/" });
  };
  const handleNavigate = (to: string) => {
    navigate({ to });
  };
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <Grid grow align="center">
          <Grid.Col span={3}>
            <Title m={10}>GoodWords</Title>
          </Grid.Col>
          <Grid.Col span={6}>
            <Flex justify={"center"} align={"center"}>
              <SegmentedControl
                onChange={handleNavigate}
                data={[
                  {
                    label: "Posts",
                    value: "/posts",
                  },
                  {
                    label: "Activities",
                    value: "/activities",
                  },
                ]}
              />
            </Flex>
          </Grid.Col>
          <Grid.Col span={3}>
            <Flex align={"center"} justify={"flex-end"} m={10}>
              <Text>Nafiul Rony</Text>
              <Space w={10} />
              <Avatar radius={"xl"} />
              <Space w={10} />
              <Button onClick={handleSignOut} variant="outline" color="red">
                Sign Out
              </Button>
            </Flex>
          </Grid.Col>
        </Grid>
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
