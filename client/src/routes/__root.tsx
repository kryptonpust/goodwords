import {
  createRootRouteWithContext,
  Outlet,
  useNavigate
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AuthState, useAuthStore } from "../hooks/useAuthStore";
import { useEffect } from "react";

export type RouteContext = {
  auth: AuthState;
};

export const Route = createRootRouteWithContext<RouteContext>()({
  component: () => RootComponent(),
});

function RootComponent() {
  const auth = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if(auth.isLogged()) {
      navigate({ to: "/posts" });
    }else{
      navigate({ to: "/login" });
    }
  }, [auth, navigate]);

  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
