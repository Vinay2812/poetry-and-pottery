import { DOMAIN, SERVER_GRAPHQL_ENDPOINT } from "@/consts/env";
import { HttpLink } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";
import { SetContextLink } from "@apollo/client/link/context";
import { auth } from "@clerk/nextjs/server";

// Type policies for Apollo InMemoryCache
// Defines how to normalize and merge cached data
const typePolicies = {
  Query: {
    fields: {
      // Paginated product lists - merge new pages into existing
      products: {
        keyArgs: ["filter"],
        merge(
          existing: { data: unknown[]; total: number } | undefined,
          incoming: { data: unknown[]; total: number },
          { args }: { args: { filter?: { page?: number } } | null },
        ) {
          // If this is page 1 or no existing data, replace entirely
          if (!existing || args?.filter?.page === 1) {
            return incoming;
          }
          // Otherwise merge data arrays for pagination
          return {
            ...incoming,
            data: [...existing.data, ...incoming.data],
          };
        },
      },
      // Wishlist IDs - always replace (fast lookup array)
      wishlistIds: {
        merge(_existing: number[], incoming: number[]) {
          return incoming;
        },
      },
    },
  },
  // Product type normalization
  ProductBase: {
    keyFields: ["id"],
  },
  ProductDetail: {
    keyFields: ["id"],
    fields: {
      // Reviews are fetched separately, merge them properly
      reviews: {
        merge(existing: unknown[] = [], incoming: unknown[]) {
          return incoming; // Always use latest reviews
        },
      },
    },
  },
  // Event type normalization
  EventBase: {
    keyFields: ["id"],
  },
  EventDetail: {
    keyFields: ["id"],
  },
  // Cart normalization
  Cart: {
    keyFields: [], // Singleton per user
    fields: {
      items: {
        merge(_existing: unknown[], incoming: unknown[]) {
          return incoming; // Always use latest cart items
        },
      },
    },
  },
  CartItem: {
    keyFields: ["id"],
  },
  // Wishlist item normalization
  WishlistItem: {
    keyFields: ["id"],
  },
  // Order normalization
  Order: {
    keyFields: ["id"],
  },
  OrderItem: {
    keyFields: ["id"],
  },
  // Review normalization
  Review: {
    keyFields: ["id"],
  },
  // Registration normalization
  EventRegistration: {
    keyFields: ["id"],
  },
  // Category normalization
  Category: {
    keyFields: ["id"],
  },
  // Collection normalization
  Collection: {
    keyFields: ["id"],
  },
};

export const { getClient, query: apolloClient } = registerApolloClient(() => {
  const httpLink = new HttpLink({
    uri: SERVER_GRAPHQL_ENDPOINT,
    credentials: "include",
    headers: {
      "content-type": "application/json",
      origin: DOMAIN,
    },
  });

  const authLink = new SetContextLink(async ({ headers }) => {
    try {
      const { getToken } = await auth();
      const token = await getToken();

      return {
        headers: {
          ...headers,
          "content-type": "application/json",
          "apollo-require-preflight": "true",
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    } catch {
      // auth() might fail outside of request context
      return {
        headers: {
          ...headers,
          "content-type": "application/json",
          "apollo-require-preflight": "true",
        },
      };
    }
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
});
