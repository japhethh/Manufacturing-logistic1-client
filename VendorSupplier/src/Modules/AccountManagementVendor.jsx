import { useState } from "react";

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
    // Logic to handle password change
    setFeedbackMessage("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Account Management
      </h1>

      {/* Feedback Message */}
      {feedbackMessage && (
        <div className="alert alert-info mb-4">{feedbackMessage}</div>
      )}

      {/* Account Details */}
      <div className="mb-8 bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Account Details
        </h2>
        <div className="mb-4">
          <label className="label text-black/70 font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered w-full bg-gray-50"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label className="label text-black/70 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full bg-gray-50"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="label text-black/70 font-medium">User Role</label>
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

      {/* Change Password Section */}
      <div className="mb-8 bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Change Password
        </h2>
        <form onSubmit={handlePasswordChange} className="space-y-6">
          <div className="mb-4">
            <label className="label text-black/70 font-medium">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="input input-bordered w-full bg-gray-50"
              placeholder="Enter your current password"
              required
            />
          </div>
          <div className="mb-4">
            <label className="label text-black/70 font-medium">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input input-bordered w-full bg-gray-50"
              placeholder="Enter a new password"
              required
            />
            <p className="text-sm text-gray-500">At least 6 characters long</p>
          </div>
          <div className="mb-4">
            <label className="label text-black/70 font-medium">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input input-bordered w-full bg-gray-50"
              placeholder="Confirm your new password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Change Password
          </button>
        </form>
      </div>

      {/* Additional Features or Actions */}
      <div className="mb-8 bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Account Actions
        </h2>
        <button className="btn btn-outline btn-danger w-full text-white border-red-600 bg-red-600 hover:bg-red-700 hover:border-red-700">
          Delete Account
        </button>
        <p className="text-sm text-red-500 mt-2">
          Note: This action cannot be undone.
        </p>
      </div>
    </div>
  );
};

export default AccountManagementVendor;
