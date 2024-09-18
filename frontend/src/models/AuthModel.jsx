// models/authModel.js

const AuthModel = {
  logout: () => {
    // Clear user data from local storage
    localStorage.removeItem("token");
    // Optional: Clear other user-related data here, if necessary
    window.location.href = "/login"; // Redirect to login page
  },

  // Additional methods for authentication can be added here
  login: (token) => {
    localStorage.setItem("token", token);
  },

  isAuthenticated: () => {
    // Check if user is authenticated (e.g., token exists in localStorage)
    return !!localStorage.getItem("token");
  },
};

export default AuthModel;
