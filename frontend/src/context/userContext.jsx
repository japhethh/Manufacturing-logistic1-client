import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  // const apiURL = "https://manufacturing-logistic1-client-api.onrender.com"
  // const apiURL = window.location.hostname === "localhost"
  // ? "http://localhost:4000"
  // : "https://manufacturing-logistic1-client-api.onrender.com";
  const apiURL = "https://manufacturing-logistic1-client-api.onrender.com"

  // const apiURL =
  //   window.location.hostname === "localhost"
  //     ? "http://localhost:4000"
  //     : window.location.hostname ===
  //       "https://backend-logistic1.jjm-manufacturing.com"
  //     ? "https://manufacturing-logistic1-client-api.onrender.com"
  //     : "https://manufacturing-logistic1-client-api.onrender.com";

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
