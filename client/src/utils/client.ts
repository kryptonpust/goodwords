import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { notifications } from "@mantine/notifications";
import { AUTH_LOCAL_STORAGE } from "./constants";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message }) => {
      if (message === "Unauthorized") {
        notifications.show({
          title: "Unauthorized",
          message: "Please login to continue",
          color: "red",
        });
        localStorage.removeItem(AUTH_LOCAL_STORAGE);
        //give time for the notification to show
        setTimeout(() => {
          window.location.reload();
        },1000);
      }
      notifications.show({
        title: "Error ",
        message: message,
        color: "red",
      });
    });
  if (networkError) {
    notifications.show({
      title: "Network Error",
      message: networkError.message,
      color: "red",
    });
  }
});
const authLink = setContext((_, { headers }) => {
  const {
    state,
  }: {
    state: { token: string };
  } = JSON.parse(localStorage.getItem(AUTH_LOCAL_STORAGE) || "{}");
  return {
    headers: {
      ...headers,
      authorization: state.token ? `Bearer ${state.token}` : "",
    },
  };
});
const httpLink = new HttpLink({ uri: import.meta.env.VITE_SERVER_URL});

export const client = new ApolloClient({
  // uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
  link: from([errorLink, authLink, httpLink]),
});
