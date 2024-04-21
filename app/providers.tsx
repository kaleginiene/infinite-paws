"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // Set default staleTime to avoid immediate refetching
      },
    },
  });

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always create a new QueryClient
    return makeQueryClient();
  } else {
    // Client: reuse existing QueryClient if available
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

const Providers: React.FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={getQueryClient()}>
    {children}
  </QueryClientProvider>
);

export default Providers;
