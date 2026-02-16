import { config } from "dotenv";
import express from "express";
import session from "express-session";
import "./types/session";
import { authRouter } from "./routes/auth";
import cors from "cors";

config();

const app = express();
const PORT = process.env.PORT ?? 3000;

/** Comma-separated list of allowed origins, e.g. "http://localhost:5173" or "https://app.example.com,https://www.example.com" */
const allowedOrigins = (process.env.CORS_ORIGIN ?? "http://localhost:5173")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(express.json());

app.use(
  session({
    name: "home-lab.sid",
    secret: process.env.SESSION_SECRET || "dev-secret-only",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // set true in production with HTTPS
      sameSite: "lax",
    },
  }),
);

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests with no origin (e.g. same-origin, Postman, curl)
      if (!origin) {
        callback(null, true);
        return;
      }
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true,
  }),
);

app.use("/auth", authRouter);

app.get("/", (_req, res) => {
  res.json({ message: "Hello from API" });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
