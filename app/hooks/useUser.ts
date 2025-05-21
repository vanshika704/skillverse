// utils/auth.ts
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  email: string;
  exp: number;
  iat: number;
}

export function getUserId(): string | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded?.id || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
