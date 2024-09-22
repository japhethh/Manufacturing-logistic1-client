import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VendorRegistrationForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      return;
    }

    // Create a formatted message
    const message = `
      Company Name: ${companyName}
      First Name: ${name}
      Last Name: ${lastName}
      Gender: ${gender || "Not specified"}
      Email: ${email}
      Phone: ${phone || "Not provided"}
      Location: ${location || "Not provided"}
    `;

    const templateParams = {
      message: message,
      company: companyName,
      firstName: name,
      lastName: lastName,
      gender: gender,
      email: email,
      phone: phone,
      location: location,
    };

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_uo9nizh',  // Replace with your actual Service ID
          template_id: 'template_5kc1rop',  // Replace with your actual Template ID
          user_id: '82GY6MLOGFzVWmMNE',  // Replace with your actual User ID
          template_params: templateParams,
        }),
      });

      if (response.ok) {
        const result = await response.text();
        console.log("Email sent successfully!", result);
        toast.success("Email sent successfully!");
        resetForm();
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Error sending email: " + error.message);
    }
  };

  const resetForm = () => {
    setCompanyName("");
    setName("");
    setLastName("");
    setGender("");
    setEmail("");
    setPhone("");
    setLocation("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <form onSubmit={handleSubmit} className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Vendor Registration</h2>

        {error && <p className="mb-4 text-red-600 text-center">{error}</p>}

        <div className="mb-4">
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
            Company Representation
          </label>
          <input
            type="text"
            id="company"
            placeholder="Enter company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition duration-200"
          />
          <p className="text-xs text-gray-500">Name of the company the vendor represents.</p>
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter first name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition duration-200"
          />
          <p className="text-xs text-gray-500">Vendor's first name.</p>
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition duration-200"
          />
          <p className="text-xs text-gray-500">Vendor's last name.</p>
        </div>

        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition duration-200"
          >
            <option value="" disabled>Select your gender (optional)</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <p className="text-xs text-gray-500">Vendor's gender (optional).</p>
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Sample@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition duration-200"
          />
          <p className="text-xs text-gray-500">Vendor's email address for communication and verification.</p>
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="text"
            id="phone"
            placeholder="+63 999-9999-999"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition duration-200"
          />
          <p className="text-xs text-gray-500">Contact number for further communication (optional).</p>
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            id="location"
            placeholder="Metro Manila, Quezon City"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition duration-200"
          />
          <p className="text-xs text-gray-500">Vendor's business location (optional).</p>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
        >
          Submit Email
        </button>

        <NavLink to="/">
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?
            <a href="/login" className="text-blue-600 hover:underline ml-1">Log in</a>
          </p>
        </NavLink>
      </form>
      <ToastContainer />
    </div>
  );
};

export default VendorRegistrationForm;
