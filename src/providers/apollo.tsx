"use client";

import {
  CLIENT_GRAPHQL_ENDPOINT,
  DOMAIN,
  LOCAL_ADMIN_BYPASS_SECRET,
  allowLocalAdminBypass,
} from "@/consts/env";
import { HttpLink } from "@apollo/client";
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { SetContextLink } from "@apollo/client/link/context";
import { useAuth } from "@clerk/nextjs";

function makeApolloClient(getToken: () => Promise<string | null>) {
  const httpLink = new HttpLink({
    uri: CLIENT_GRAPHQL_ENDPOINT,
    credentials: "include",
    headers: {
      "content-type": "application/json",
      "accept-encoding": "gzip",
      origin: DOMAIN,
    },
  });

  const authLink = new SetContextLink(async ({ headers }) => {
    const token = await getToken();
    return {
      headers: {
        ...headers,
        "content-type": "application/json",
        "accept-encoding": "gzip",
        "apollo-require-preflight": "true",
        authorization: token ? `Bearer ${token}` : "",
        ...(allowLocalAdminBypass()
          ? { "x-local-admin-secret": LOCAL_ADMIN_BYPASS_SECRET }
          : {}),
      },
    };
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
        errorPolicy: "ignore",
      },
      query: {
        fetchPolicy: "network-only",
        errorPolicy: "all",
      },
    },
  });
}

export function ApolloProvider({ children }: React.PropsWithChildren) {
  const { getToken } = useAuth();

  return (
    <ApolloNextAppProvider makeClient={() => makeApolloClient(getToken)}>
      {children}
    </ApolloNextAppProvider>
  );
}
