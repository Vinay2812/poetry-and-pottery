import "dotenv/config";

export const DATABASE_URL = process.env.DATABASE_URL;
export const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
export const ENVIRONMENT = process.env.NODE_ENV;

// Cloudflare R2 configuration
export const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
export const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
export const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
export const R2_BUCKET = process.env.R2_BUCKET;
export const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL; // Optional: custom public URL for R2
