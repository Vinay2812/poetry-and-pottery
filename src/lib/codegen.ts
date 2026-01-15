import { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

const env = process.env.NODE_ENV || "local";
const envFile = `.env.${env}`;
dotenv.config({ path: envFile });

const API_ENDPOINT = process.env.API_ENDPOINT!;
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN!;

const config: CodegenConfig = {
  schema: [
    {
      [`${API_ENDPOINT}/graphql`]: {
        headers: {
          origin: DOMAIN!,
          operationname: "IntrospectionQuery",
        },
      },
    },
  ],
  documents: ["src/graphql/**/*.ts", "!src/graphql/generated/**/*/"],
  generates: {
    // Types only - safe for server components
    "src/graphql/generated/types.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        skipTypename: true,
        scalars: {
          DateTime: {
            input: "string",
            output: "Date | string",
          },
        },
      },
    },
    // Combined file for backwards compatibility (client-only)
    "src/graphql/generated/graphql.ts": {
      plugins: [
        {
          add: {
            content: '/* eslint-disable */\n// @ts-nocheck\n"use client";',
          },
        },
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        skipTypename: true,
        scalars: {
          DateTime: {
            input: "string",
            output: "Date | string",
          },
        },
        // Apollo Client 4.x: All React types and hooks are in @apollo/client/react
        apolloReactCommonImportFrom: "@apollo/client/react",
        apolloReactHooksImportFrom: "@apollo/client/react",
        // Disable incompatible features for Apollo Client 4.x
        addSuspenseQuery: false,
        withSuspenseQuery: false,
        withMutationFn: false,
        withMutationOptionsType: false,
        withResultType: false,
      },
    },
  },
};

export default config;
