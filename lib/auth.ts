import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";
import prisma from "./prisma";

const SECRET = process.env.AUTH_SECRET || "dev-secret-change-in-prod";
const COOKIE_NAME = "session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// ponytail: HMAC token instead of JWT lib, ~10 lines vs dependency
function sign(payload: string): string {
  const sig = createHmac("sha256", SECRET).update(payload).digest("base64url");
  return `${Buffer.from(payload).toString("base64url")}.${sig}`;
}

function verify(token: string): string | null {
  const [payloadB64, sig] = token.split(".");
  if (!payloadB64 || !sig) return null;
  const payload = Buffer.from(payloadB64, "base64url").toString();
  const expected = createHmac("sha256", SECRET).update(payload).digest("base64url");
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  } catch {
    return null;
  }
  return payload;
}

export interface SessionUser {
  id: number;
  email: string;
  nombre: string;
  rol: string;
}

export async function createSession(userId: number): Promise<void> {
  const payload = JSON.stringify({ userId, exp: Date.now() + MAX_AGE * 1000 });
  const token = sign(payload);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verify(token);
  if (!payload) return null;

  try {
    const { userId, exp } = JSON.parse(payload);
    if (Date.now() > exp) return null;

    const user = await prisma.usuario.findUnique({
      where: { id: userId },
      select: { id: true, email: true, nombre: true, rol: { select: { nombre: true } } },
    });
    if (!user) return null;
    return { ...user, rol: user.rol.nombre };
  } catch {
    return null;
  }
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// ponytail: inline hash, no bcrypt dep for now. Add bcrypt if >1000 users
export function hashPassword(password: string): string {
  return createHmac("sha256", SECRET).update(password).digest("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  const computed = hashPassword(password);
  try {
    return timingSafeEqual(Buffer.from(computed), Buffer.from(hash));
  } catch {
    return false;
  }
}
