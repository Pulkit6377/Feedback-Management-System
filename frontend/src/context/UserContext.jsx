import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // new

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser && savedUser !== "undefined") {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Invalid user JSON:", err);
        localStorage.removeItem("user");
        setUser(null);
      }
    }
    setLoading(false); // finished loading
  }, []);

    const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading ,logout}}>
      {children}
    </UserContext.Provider>
  );
};
