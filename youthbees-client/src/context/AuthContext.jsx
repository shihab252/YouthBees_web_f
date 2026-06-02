import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedRole) setRole(savedRole);
    if (savedUser) setUser(savedUser);
  }, []);

  const login = (role, user) => {
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(user));

    setRole(role);
    setUser(user);
  };

  const logout = () => {
    localStorage.clear();
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);