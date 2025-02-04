import { useState } from "react";
import { FiUser, FiMail, FiLock, FiTrash2 } from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const AccountManagementVendor = () => {
  const [username, setUsername] = useState("vendor_user");
  const [email, setEmail] = useState("vendor@example.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRole, setUserRole] = useState("Standard User");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setFeedbackMessage("New passwords do not match!");
      return;
    }
    if (newPassword.length < 6) {
      setFeedbackMessage("New password must be at least 6 characters long!");
      return;
    }
    setFeedbackMessage("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Account Management</h1>
      {feedbackMessage && (
        <div className="alert alert-info mb-4 p-4 bg-blue-100 text-blue-700 rounded-lg shadow-md">
          {feedbackMessage}
        </div>
      )}
      <div className="mb-6 bg-white shadow-lg p-6 border border-gray-200 rounded-xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Account Details</h2>
        <div className="mb-4 flex items-center gap-2">
          <FiUser className="text-gray-500" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered w-full bg-gray-50"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4 flex items-center gap-2">
          <FiMail className="text-gray-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full bg-gray-50"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4 flex items-center gap-2">
          <MdOutlineAdminPanelSettings className="text-gray-500" />
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className="select select-bordered w-full bg-gray-50"
          >
            <option>Standard User</option>
            <option>Admin</option>
            <option>Viewer</option>
          </select>
        </div>
      </div>

      <div className="mb-6 bg-white shadow-lg p-6 border border-gray-200 rounded-xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Change Password</h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="flex items-center gap-2">
            <FiLock className="text-gray-500" />
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="input input-bordered w-full bg-gray-50"
              placeholder="Enter your current password"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <FiLock className="text-gray-500" />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input input-bordered w-full bg-gray-50"
              placeholder="Enter a new password"
              required
            />
          </div>
          <p className="text-sm text-gray-500">At least 6 characters long</p>
          <div className="flex items-center gap-2">
            <FiLock className="text-gray-500" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input input-bordered w-full bg-gray-50"
              placeholder="Confirm your new password"
              required
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Change Password
          </button>
        </form>
      </div>

      <div className="mb-6 bg-white shadow-lg p-6 border border-gray-200 rounded-xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Account Actions</h2>
        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700">
          <FiTrash2 /> Delete Account
        </button>
        <p className="text-sm text-red-500 mt-2">Note: This action cannot be undone.</p>
      </div>
    </div>
  );
};

export default AccountManagementVendor;
