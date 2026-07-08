import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export interface AuthUser {
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  signIn: (email: string) => void;
  signUp: (name: string, email: string) => void;
  continueAsGuest: () => void;
  signOut: () => void;
}

const AUTH_KEY = "novalang-auth-v1";
const AuthContext = createContext<AuthContextValue | null>(null);

const initials = (name: string) => name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "LQ";

const loadUser = (): AuthUser | null => {
  try {
    const value = localStorage.getItem(AUTH_KEY);
    return value ? JSON.parse(value) as AuthUser : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(loadUser);

  const saveUser = (nextUser: AuthUser | null) => {
    setUser(nextUser);
    try {
      if (nextUser) localStorage.setItem(AUTH_KEY, JSON.stringify(nextUser));
      else localStorage.removeItem(AUTH_KEY);
    } catch { /* Authentication still works for the current tab. */ }
  };

  const value = useMemo<AuthContextValue>(() => ({
    user,
    signIn: (email) => {
      const name = email.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()) || "Explorer";
      saveUser({ name, email, avatar: initials(name) });
    },
    signUp: (name, email) => saveUser({ name: name.trim(), email, avatar: initials(name) }),
    continueAsGuest: () => saveUser({ name: "Language Explorer", email: "guest@novalang.local", avatar: "NE" }),
    signOut: () => saveUser(null)
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
