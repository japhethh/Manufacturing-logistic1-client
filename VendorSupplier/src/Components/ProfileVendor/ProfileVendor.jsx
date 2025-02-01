import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const ProfileVendor = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Hello, Super Admin</h1>
        <p className="text-gray-600 mb-8">Change your profile information & password from here...</p>

        {/* Profile Image Section */}
        <div className="mb-8">
          <label className="block text-gray-700 text-sm font-bold mb-2">Profile Image *</label>
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
              <FaUser className="text-2xl text-gray-600" />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
              Change Image
            </button>
          </div>
        </div>

        {/* Current Password Section */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Current Password *</label>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter current password"
            />
          </div>
        </div>

        {/* New Password Section */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">New Password *</label>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter new password"
            />
          </div>
        </div>

        {/* Confirm Password Section */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password *</label>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Confirm new password"
            />
          </div>
        </div>

        {/* Contact Person Section */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Contact Person *</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Super Admin"
          />
        </div>

        {/* Email Section */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email *</label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="super.admin@gmail.com"
            />
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex justify-between mt-8">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Update Password
          </button>
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileVendor;