import {
  createRootRouteWithContext,
  Outlet,
  useNavigate
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AuthState, useAuthStore } from "../hooks/zustand/useAuthStore";
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
    console.log("auth", auth, auth.isLogged());
    if(auth.isLogged()) {
      navigate({ to: "/posts" });
    }else{
      navigate({ to: "/login" });
    }
  }, [auth, navigate]);

  return (
    <>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  );
}
