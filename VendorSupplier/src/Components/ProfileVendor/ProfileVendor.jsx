// import React, { useState, useEffect, useContext } from "react";
// import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import axios from "axios";
// // import { AuthContext } from './context/AuthContext'; // HINDI KO MAKITA PRE HAHAHA

// const Profile = () => {
//   const { user } = useContext(AuthContext); // 🤷🏼‍♂️🤷🏼‍♂️🤷🏼‍♂️🤷🏼‍♂️
//   const [vendor, setVendor] = useState({
//     contactPerson: "",
//     email: "",
//     profileImage: "",
//   });
//   const [passwords, setPasswords] = useState({
//     current: "",
//     new: "",
//     confirm: "",
//   });
//   const [showPassword, setShowPassword] = useState({
//     current: false,
//     new: false,
//     confirm: false,
//   });

//   useEffect(() => {
//     if (user?.vendorId) {
//       fetchProfile(user.vendorId);
//     }
//   }, [user]);

//   // Fetch the vendor profile from backend
//   const fetchProfile = async (vendorId) => {
//     try {
//       const response = await axios.get(`/api/vendorProfile/${vendorId}`);
//       setVendor(response.data);
//     } catch (error) {
//       console.error("Error fetching vendor profile", error);
//     }
//   };

//   // Update the vendor profile information
//   const updateProfile = async () => {
//     try {
//       const response = await axios.put(`/api/vendorProfile/${user.vendorId}`, vendor);
//       alert("Profile updated successfully!");
//       setVendor(response.data);
//     } catch (error) {
//       console.error("Error updating profile", error);
//       alert("Failed to update profile.");
//     }
//   };

//   // Update vendor password
//   const updatePassword = async () => {
//     try {
//       if (passwords.new !== passwords.confirm) {
//         alert("New password and confirm password do not match.");
//         return;
//       }

//       await axios.put(`/api/vendorProfile/${user.vendorId}/password`, passwords);
//       alert("Password updated successfully!");
//       setPasswords({ current: "", new: "", confirm: "" });
//     } catch (error) {
//       console.error("Error updating password", error);
//       alert("Failed to update password.");
//     }
//   };

//   const togglePasswordVisibility = (field) => {
//     setShowPassword((prev) => ({
//       ...prev,
//       [field]: !prev[field],
//     }));
//   };

//   return (
//     <div className="flex items-center justify-center bg-gray-50 p-4">
//       <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full">
//         <h1 className="text-2xl font-bold text-gray-800 mb-2">
//           Hello, <span className="text-blue-600">{vendor.contactPerson || 'Super Admin'}</span>
//         </h1>
//         <p className="text-gray-600 mb-6 text-sm md:text-base">
//           Change your profile information & password from here...
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Profile Image & Contact Info */}
//           <div className="space-y-4">
//             <div>
//               <label className="block text-gray-700 text-sm font-semibold mb-2">
//                 Profile Image *
//               </label>
//               <div className="flex items-center gap-4">
//                 <div className="w-24 h-24 rounded-lg bg-gray-200 flex items-center justify-center shadow-md">
//                   {vendor.profileImage ? (
//                     <img src={vendor.profileImage} alt="Profile" className="w-full h-full object-cover rounded-lg" />
//                   ) : (
//                     <FaUser className="text-3xl text-gray-600" />
//                   )}
//                 </div>
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
//                   Change Image
//                 </button>
//               </div>
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-semibold mb-2">
//                 Contact Person *
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Super Admin"
//                 value={vendor.contactPerson}
//                 onChange={(e) => setVendor({ ...vendor, contactPerson: e.target.value })}
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-semibold mb-2">
//                 Email *
//               </label>
//               <div className="relative">
//                 <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
//                 <input
//                   type="email"
//                   className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="super.admin@gmail.com"
//                   value={vendor.email}
//                   onChange={(e) => setVendor({ ...vendor, email: e.target.value })}
//                 />
//               </div>
//             </div>
//             <button
//               onClick={updateProfile}
//               className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
//             >
//               Update Profile
//             </button>
//           </div>

//           {/* Password Update Section */}
//           <div className="space-y-4">
//             {[
//               {
//                 label: "Current Password",
//                 icon: <FaLock />,
//                 placeholder: "Enter current password",
//                 field: "current",
//               },
//               {
//                 label: "New Password",
//                 icon: <FaLock />,
//                 placeholder: "Enter new password",
//                 field: "new",
//               },
//               {
//                 label: "Confirm Password",
//                 icon: <FaLock />,
//                 placeholder: "Confirm new password",
//                 field: "confirm",
//               },
//             ].map((field, index) => (
//               <div key={index}>
//                 <label className="block text-gray-700 text-sm font-semibold mb-2">
//                   {field.label} *
//                 </label>
//                 <div className="relative">
//                   {field.icon && (
//                     <div className="absolute left-3 top-3 text-gray-400">
//                       {field.icon}
//                     </div>
//                   )}
//                   <input
//                     type={showPassword[field.field] ? "text" : "password"}
//                     className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder={field.placeholder}
//                     value={passwords[field.field]}
//                     onChange={(e) => setPasswords({ ...passwords, [field.field]: e.target.value })}
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//                     onClick={() => togglePasswordVisibility(field.field)}
//                   >
//                     {showPassword[field.field] ? <FaEyeSlash /> : <FaEye />}
//                   </button>
//                 </div>
//               </div>
//             ))}
//             <button
//               onClick={updatePassword}
//               className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300 w-full"
//             >
//               Update Password
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
