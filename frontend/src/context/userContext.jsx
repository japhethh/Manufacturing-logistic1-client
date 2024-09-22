import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const apiURL =
    window.location.hostname === "localhost"
      ? "http://localhost:4000"
      : "https://logistic1.jjm-manufacturing.com";
  // const apiURL = "https://logistic1.jjm-manufacturing.com";

  const [token, setToken] = useState("");

  useEffect(() => {
    async function loadData() {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }

    loadData();
  }, []);

  const contextValue = {
    setToken,
    token,
    apiURL,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
