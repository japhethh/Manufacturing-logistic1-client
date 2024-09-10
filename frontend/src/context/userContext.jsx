import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const apiURL = "http://localhost:4000";

  const [token, setToken] = useState("");

  useEffect(() => {
    async function loadData() {}
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
