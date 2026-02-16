import { config } from "dotenv";
import express from "express";
import session from "express-session";
import { prisma } from "@home-lab/db";

config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use(
  session({
    name: "home-services.sid",
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

app.get("/", (_req, res) => {
  res.json({ message: "Hello from API" });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/user-test", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
