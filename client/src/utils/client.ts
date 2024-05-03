import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { notifications } from "@mantine/notifications";
import { AUTH_LOCAL_STORAGE } from "./constants";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message }) => {
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
  console.log(state);
  return {
    headers: {
      ...headers,
      authorization: state.token ? `Bearer ${state.token}` : "",
    },
  };
});

const httpLink = new HttpLink({ uri: "http://localhost:5000/graphql" });

export const client = new ApolloClient({
  // uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
  link: from([errorLink, authLink, httpLink]),
});
