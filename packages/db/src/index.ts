import path from "node:path";
import { config } from "dotenv";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "./generated/prisma/client";
import WebSocket from "ws";

// Load .env from this package's directory so DATABASE_URL is set when run from any app
config({ path: path.resolve(__dirname, "../.env") });

// Node.js has no built-in WebSocket; Neon's serverless driver needs one for Prisma
neonConfig.webSocketConstructor = WebSocket as unknown as typeof globalThis.WebSocket;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Add it to packages/db/.env or the app's environment."
  );
}

const adapter = new PrismaNeon(
  { connectionString },
  { schema: "home_lab" },
);
export const prisma = new PrismaClient({ adapter });
