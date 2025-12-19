declare global {
  interface CustomJwtSessionClaims {
    dbUserId?: number;
    environment?: "development" | "production" | "staging";
  }
}

export {};
