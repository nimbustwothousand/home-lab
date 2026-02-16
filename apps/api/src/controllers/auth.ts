import type { Request, Response } from "express";
import { authenticateUser } from "../services/auth";

/**
 * POST body: { username: string, password: string }
 * On success: sets session (userId, username) and returns { user: { id, username } }.
 * On failure: 401 with { error: "Invalid username or password" }.
 */
export function login(req: Request, res: Response): void {
  const { username, password } = req.body as {
    username?: string;
    password?: string;
  };

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !username.trim() ||
    !password
  ) {
    res.status(400).json({
      error: "Username and password are required",
    });
    return;
  }

  authenticateUser(username.trim(), password)
    .then((user) => {
      if (!user) {
        res.status(401).json({
          error: "Invalid username or password",
        });
        return;
      }
      req.session.userId = user.id;
      req.session.username = user.username;
      res.status(200).json({ user: { id: user.id, username: user.username } });
    })
    .catch(() => {
      res.status(500).json({
        error: "Authentication failed",
      });
    });
}

/**
 * Clears the session. Returns 204 on success.
 */
export function logout(req: Request, res: Response): void {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: "Logout failed" });
      return;
    }
    res.clearCookie("home-lab.sid");
    res.status(204).send();
  });
}
