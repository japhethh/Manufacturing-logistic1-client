import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

// READ ME ==============>>>>>>>>>>
// token
// userData
// allUsers
// searchResults
// loading
// error
// fetchUserData
// searchUsers
// setToken
// logout
export const apiURL =
  window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "https://manufacturing-logistic1-client-api.onrender.com";

const verifyStore = create((set) => ({
  token: localStorage.getItem("token") || null,
  userData: null,
  allUsers: null,
  searchResults: [],
  loading: false,
  error: null,
  notifications: [],

  fetchUserData: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ error: "Token not found in localStorage", loading: false });
      return;
    }

    try {
      set({ loading: true });
      const response = await axios.get(`${apiURL}/api/vendor`, {
        headers: { token },
      });

      if (!response.data.success) {
        toast.error("Failed to fetch user data");
      }

      set({ userData: response.data.data, loading: false, error: null });
    } catch (error) {
      set({ error: "Failed to fetch user data", loading: false });
    }
  },
  searchUsers: async (query) => {
    if (!query) {
      set({ allUsers: [], error: null });
      return null;
    }
    try {
      set({ loading: true });
      const response = await axios.get(
        `${apiURL}/api/user/userSearch?search=${query}`
      );
      if (!response.data.success) {
        toast.error("Search not Found");
      }

      set({ allUsers: response.data.data, loading: false, error: null });
    } catch (error) {
      toast.error(error.message);
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
  // Add a new notification
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),

  // Remove a notification
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  // Clear all notifications
  clearNotifications: () => set({ notifications: [] }),
}));

export default verifyStore;
