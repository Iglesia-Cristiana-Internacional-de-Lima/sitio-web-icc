import { cookies } from "next/headers";
import { createHmac, timingSafeEqual, scryptSync, randomBytes } from "crypto";
import { NextResponse } from "next/server";
import prisma from "./prisma";

function getSecret(): string {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET env var is required. Generate one: openssl rand -base64 32");
  return s;
}
const COOKIE_NAME = "session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// ponytail: HMAC token instead of JWT lib, ~10 lines vs dependency
function sign(payload: string): string {
  const sig = createHmac("sha256", getSecret()).update(payload).digest("base64url");
  return `${Buffer.from(payload).toString("base64url")}.${sig}`;
}

function verify(token: string): string | null {
  const [payloadB64, sig] = token.split(".");
  if (!payloadB64 || !sig) return null;
  const payload = Buffer.from(payloadB64, "base64url").toString();
  const expected = createHmac("sha256", getSecret()).update(payload).digest("base64url");
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

/** Returns admin session or null */
export async function requireAdmin(): Promise<SessionUser | null> {
  const session = await getSession();
  if (!session || session.rol !== "ADMIN") return null;
  return session;
}

// ponytail: scryptSync from Node stdlib — no bcrypt dep, still slow-hash
const SCRYPT_KEYLEN = 64;
const SCRYPT_COST = { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, SCRYPT_KEYLEN, SCRYPT_COST).toString("hex");
  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, hash: string): boolean {
  // Support legacy HMAC hashes (no colon) for migration
  if (!hash.includes(":")) {
    const legacyHash = createHmac("sha256", getSecret()).update(password).digest("hex");
    try {
      return timingSafeEqual(Buffer.from(legacyHash), Buffer.from(hash));
    } catch {
      return false;
    }
  }
  const [salt, key] = hash.split(":");
  const derived = scryptSync(password, salt, SCRYPT_KEYLEN, SCRYPT_COST).toString("hex");
  try {
    return timingSafeEqual(Buffer.from(derived), Buffer.from(key));
  } catch {
    return false;
  }
}
