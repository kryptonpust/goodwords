import { createLazyFileRoute } from "@tanstack/react-router";
import { SignInScreen } from "../components/sign_in/SignInScreen";

export const Route = createLazyFileRoute("/login")({
  component: Index,
});

function Index() {
  return <SignInScreen />;
}
