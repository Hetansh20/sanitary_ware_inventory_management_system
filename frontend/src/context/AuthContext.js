import React, { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const DEMO_USERS = {
  admin: { id: 1, name: "Admin User", email: "admin@tileflow.com", role: "admin" },
  staff: { id: 2, name: "Staff User", email: "staff@tileflow.com", role: "staff" },
};

const CREDENTIALS = {
  admin: "admin123",
  staff: "staff123",
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = ({ username, password }) => {
    const normalized = username.trim().toLowerCase();
    if (!DEMO_USERS[normalized] || CREDENTIALS[normalized] !== password) {
      return { ok: false, message: "Invalid credentials." };
    }

    setCurrentUser(DEMO_USERS[normalized]);
    return { ok: true, user: DEMO_USERS[normalized] };
  };

  const logout = () => setCurrentUser(null);

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: Boolean(currentUser),
      login,
      logout,
      canEdit: currentUser?.role === "admin",
      canDoTransactions: currentUser?.role === "admin" || currentUser?.role === "staff",
    }),
    [currentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
