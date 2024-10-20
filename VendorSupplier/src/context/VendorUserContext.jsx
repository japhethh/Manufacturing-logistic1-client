import { createContext, useEffect, useState } from "react";

export const VendorUserContext = createContext();

const VendorUserContextProvider = ({ children }) => {
  // const apiURL = "https://manufacturing-logistic1-client-api.onrender.com"

  const apiURL =
    window.location.hostname === "localhost"
      ? "http://localhost:4000"
      : "https://backend-logistic1.jjm-manufacturing.com";

  console.log(apiURL);
  useEffect(() => {
    async function loadData() {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }

    loadData();
  }, []);

  const [token, setToken] = useState("");
  const [notifications, setNotifications] = useState([]);
  const contextValue = {
    setToken,
    token,
    apiURL,
  };

  return (
    <VendorUserContext.Provider value={contextValue}>
      {children}
    </VendorUserContext.Provider>
  );
};

export default VendorUserContextProvider;
