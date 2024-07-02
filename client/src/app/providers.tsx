"use client";
import { store } from "@/store";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export function AppProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
  });

  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URI,
    // headers: {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${store.getState().auth.token}`,
    // },
    cache: new InMemoryCache(),
  })

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ApolloProvider>
    </Provider>
  );
}
