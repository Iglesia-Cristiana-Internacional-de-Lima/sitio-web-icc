"use client";

import { useState, useEffect } from "react";

interface User {
  id: number;
  email: string;
  nombre: string;
  rol: string;
}

// ponytail: simple hook, no context provider unless multiple consumers need sync
export function useSession() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((data) => setUser(data.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  const refresh = async () => {
    const res = await fetch("/api/auth/session");
    const data = await res.json();
    setUser(data.user ?? null);
  };

  return { user, loading, logout, refresh };
}
