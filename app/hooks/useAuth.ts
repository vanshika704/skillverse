import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  id: string;
  username: string;
  iat: number;
  exp: number;
};

export function useAuth() {
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode<DecodedToken>(token);

      // Check if token is expired
      if (decoded.exp * 1000 < Date.now()) {
        console.warn("Token expired");
        localStorage.removeItem("token");
        setUser(null);
        return;
      }

      setUser(decoded);
    } catch (error) {
      console.error("Failed to decode token", error);
      setUser(null);
    }
  }, []);

  return user;
}
