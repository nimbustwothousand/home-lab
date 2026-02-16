import { prisma } from "@home-lab/db";
import { compare } from "bcrypt";

/** User shape returned on successful auth (no password hash). */
export type AuthenticatedUser = { id: number; username: string };

/**
 * Authenticates a user by username and plain-text password.
 * Compares the given password with the stored bcrypt hash (constant-time).
 * Returns the user without sensitive fields, or null if credentials are invalid.
 */
export async function authenticateUser(
  username: string,
  password: string,
): Promise<AuthenticatedUser | null> {
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user) {
    return null;
  }
  const matches = await compare(password, user.passwordHash);
  if (!matches) {
    return null;
  }
  return { id: user.id, username: user.username };
}
