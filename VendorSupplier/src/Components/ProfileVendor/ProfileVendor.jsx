import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Profile = () => {
  return (
    <div className="flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Hello, <span className="text-blue-600">Super Admin</span>
        </h1>
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          Change your profile information & password from here...
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Image & Contact Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Profile Image *
              </label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-lg bg-gray-200 flex items-center justify-center shadow-md">
                  <FaUser className="text-3xl text-gray-600" />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                  Change Image
                </button>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Contact Person *
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Super Admin"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email *
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="super.admin@gmail.com"
                />
              </div>
            </div>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 w-full">
              Update Profile
            </button>
          </div>

          {/* Password Update Section */}
          <div className="space-y-4">
            {[
              {
                label: "Current Password",
                icon: <FaLock />,
                type: "password",
                placeholder: "Enter current password",
              },
              {
                label: "New Password",
                icon: <FaLock />,
                type: "password",
                placeholder: "Enter new password",
              },
              {
                label: "Confirm Password",
                icon: <FaLock />,
                type: "password",
                placeholder: "Confirm new password",
              },
            ].map((field, index) => (
              <div key={index}>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  {field.label} *
                </label>
                <div className="relative">
                  {field.icon && (
                    <div className="absolute left-3 top-3 text-gray-400">
                      {field.icon}
                    </div>
                  )}
                  <input
                    type={field.type}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={field.placeholder}
                  />
                </div>
              </div>
            ))}
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300 w-full">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
