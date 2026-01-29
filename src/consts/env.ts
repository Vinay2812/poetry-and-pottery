import "dotenv/config";

export const DATABASE_URL = process.env.DATABASE_URL;
export const REPLICA_URL = process.env.REPLICA_URL;
export const OPTIMIZE_API_KEY = process.env.OPTIMIZE_API_KEY;

export const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
export const ENVIRONMENT = process.env.NODE_ENV;

// Business email
export const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL;

// Gmail credentials
export const GMAIL_USER = process.env.GMAIL_USER;
export const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

// Cloudflare R2 configuration
export const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
export const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
export const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
export const R2_BUCKET = process.env.R2_BUCKET;
export const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL; // Optional: custom public URL for R2

export const MOBILE_NUMBER = process.env.NEXT_PUBLIC_MOBILE_NUMBER;

export const CLIENT_API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT!;
export const SERVER_API_ENDPOINT = process.env.API_ENDPOINT!;

export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN!;

export const CLIENT_GRAPHQL_ENDPOINT = `${CLIENT_API_ENDPOINT}/graphql`;
export const SERVER_GRAPHQL_ENDPOINT = `${SERVER_API_ENDPOINT}/graphql`;
