import { create } from "zustand";
import axios from "axios";
// import {toast} from 'toastify'

// Zustand store for managing token and user data
const Store = create((set) => ({
  token: localStorage.getItem("token") || null, // Get token from localStorage on app load
  userData: null,
  allUsers: null, // Holds fetched user data
  loading: false, // Loading state
  error: null, // Error message state

  // Fetch user data from the backend
  fetchUserData: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ error: "Token not found in localStorage", loading: false });
      return;
    }

    try {
      set({ loading: true }); // Set loading state before fetching data
      const response = await axios.get("http://localhost:4000/api/user", {
        headers: {
          token: token,
        },
      });
      set({ userData: response.data, loading: false, error: null }); // Save data in store
    } catch (err) {
      set({ error: "Failed to fetch user data", loading: false });
    }
  },
  fetchAllUsers: async () => {
    try {
      set({ loading: true });
      const response = await axios.get(
        `http://localhost:4000/api/user/getAllUsers`
      );

      set({ allUsers: response.data.data, loading: false, error: null });
    } catch (error) {
      set({ error: "Failed to fetch all users" });
    }
  },

  // Optionally, you can allow setting token explicitly and store it in both localStorage and Zustand
  setToken: (token) => {
    localStorage.setItem("token", token); // Store token in localStorage
    set({ token }); // Store token in Zustand
  },

  // Logout function to clear the token and userData
  logout: () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    set({ token: null, userData: null }); // Clear token and user data from Zustand
  },
}));

export default Store;
