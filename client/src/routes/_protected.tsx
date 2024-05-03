import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppLayout } from "../components/AppLayout";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ context }) => {
    const { isLogged } = context.auth;
    if (!isLogged) {
      throw redirect({ to: "/login" });
    }
  },
  component: () => <AppLayout />,
});
