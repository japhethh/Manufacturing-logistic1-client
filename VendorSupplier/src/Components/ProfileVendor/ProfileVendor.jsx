import React from "react";
import { FaUser, FaEnvelope, FaEdit } from "react-icons/fa";

const Profile = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
            <FaUser className="text-4xl text-gray-600" />
          </div>

          {/* Name */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">John Doe</h2>

          {/* Email */}
          <p className="text-gray-600 flex items-center">
            <FaEnvelope className="mr-2" />
            john.doe@example.com
          </p>

          {/* Edit Profile Button */}
          <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition duration-300">
            <FaEdit className="mr-2" />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;