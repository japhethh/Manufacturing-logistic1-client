import { create } from "zustand";
import axios from "axios";

const apiURL =
  window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "https://logistic1.jjm-manufacturing.com";
    // const apiURL = "https://logistic1.jjm-manufacturing.com";

const Store = create((set) => ({
  token: localStorage.getItem("token") || null,
  userData: null,
  allUsers: null,
  searchResults: [],
  loading: false,
  error: null,

  fetchUserData: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ error: "Token not found in localStorage", loading: false });
      return;
    }

    try {
      set({ loading: true });
      const response = await axios.get(`${apiURL}/api/user`, {
        headers: {
          token: token,
        },
      });
      set({ userData: response.data, loading: false, error: null });
    } catch (err) {
      set({ error: "Failed to fetch user data", loading: false });
    }
  },
  fetchAllUsers: async () => {
    // getAllUsers
    try {
      set({ loading: true });
      const response = await axios.get(`${apiURL}/api/user/getAllUsers`);

      set({ allUsers: response.data.data, loading: false, error: null });
    } catch (error) {
      set({ error: "Failed to fetch all users" });
    }
  },
  searchUsers: async (query) => {
    if (!query) {
      set({ allUsers: [], error: null });
      return;
    }

    try {
      set({ loading: true });

      const response = await axios.get(
        `${apiUrl}/api/user/userSearch?search=${query}`
      );
      set({ allUsers: response.data, loading: false, error: null });
    } catch (error) {
      set({ error: "Failed to search users", loading: false });
    }
  },
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, userData: null });
  },
}));

export default Store;
