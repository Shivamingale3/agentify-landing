import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  /** Public origin, server-only. Feeds metadataBase, canonical, robots, sitemap. Must be the real origin in prod. */
  FRONTEND_URL: z.url().default("http://localhost:3000"),
  NEXT_PUBLIC_APP_NAME: z.string().default("Agentify"),
  NEXT_PUBLIC_APP_TAG_LINE: z.string().default("SHIP AN AGENT, NOT A CHATBOT"),
});

// listed explicitly so Next can inline the NEXT_PUBLIC_ values
const parsed = schema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  FRONTEND_URL: process.env.FRONTEND_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_TAG_LINE: process.env.NEXT_PUBLIC_APP_TAG_LINE,
});

if (!parsed.success) {
  console.error("Invalid environment variables:", z.flattenError(parsed.error).fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
