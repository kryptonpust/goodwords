import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { useAuthStore } from "./hooks/zustand/useAuthStore";
import { routeTree } from "./routeTree.gen";
// Create a new router instance
const router = createRouter({ routeTree, context: { auth: undefined! } });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const theme = createTheme({
  // components: {
  //   Container: Container.extend({
  //     classNames: (_, { size }) => ({
  //       root: cx({ [classes.responsiveContainer]: size === "responsive" }),
  //     }),
  //   }),
  // },
});

function App() {
  const auth = useAuthStore();
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Notifications position="top-right" zIndex={1000} />
      <RouterProvider router={router} context={{ auth }} />
    </MantineProvider>
  );
}

export default App;
