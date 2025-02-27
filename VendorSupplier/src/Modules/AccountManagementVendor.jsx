import { useState, useEffect } from "react";
import { apiURL } from "../context/verifyStore";
import verifyStore from "../context/verifyStore";
import axios from "axios";
import { toast } from "react-toastify";

export default function AccountManagement() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [supplierData, setSupplierData] = useState(null);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { token } = verifyStore();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/supplier/supplierData`, {
        headers: { token },
      });
      setSupplierData(response?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching data");
    }
  };

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(passwords.confirmPassword);
    console.log(passwords.newPassword);

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${apiURL}/api/supplier/changePassword`,
        {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        },
        { headers: { token: token } }
      );

      toast.success(response?.data?.message || "Password changed successfully");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordForm(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to change password"
      );
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6 text-blue-800">
          Account Management
        </h1>

        {/* Vendor Information Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Account Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>Company:</strong> {supplierData?.supplierName}
            </p>
            <p>
              <strong>Id:</strong> {supplierData?._id}
            </p>
            <p>
              <strong>Contact Person:</strong> {supplierData?.contactPerson}
            </p>
            <p>
              <strong>Email:</strong> {supplierData?.email}
            </p>
            <p>
              <strong>Phone:</strong> {supplierData?.contactPhone}
            </p>
            <p>
              <strong>City:</strong> {supplierData?.address?.city}
            </p>
            <p>
              <strong>State:</strong> {supplierData?.address?.state}
            </p>
            <p>
              <strong>Zip Code:</strong> {supplierData?.address?.zipCode}
            </p>
            <p>
              <strong>Country:</strong> {supplierData?.address?.country}
            </p>
            <p>
              <strong>Status:</strong> {supplierData?.status}
            </p>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Account Actions
          </h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 mb-4"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            {showPasswordForm ? "Cancel Password Change" : "Change Password"}
          </button>

          {/* Password Form */}
          {showPasswordForm && (
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter your current password"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter a new password"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Confirm your new password"
                  required
                />
              </div>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700"
                type="submit"
              >
                Save Changes
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
