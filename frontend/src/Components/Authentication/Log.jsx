import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/userContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Log = () => {
  const context = useContext(UserContext);
  if (!context) {
    return null;
  }
  
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { apiURL, setToken } = context;
  const { register, handleSubmit, formState: { errors } } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    console.log(data);
    if (!data.userName || !data.password) {
      toast.warning('Please fill all fields');
      return;
    }
    try {
      const response = await axios.post(`${apiURL}/api/user/login`, data);
      // Set token in context and localStorage
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      console.log(response.data.token);
      // toast.success('Login successful');
      // navigate('/');
      window.location.href = '/';
      // window.location.reload();
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Login failed. Please try again.'
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center md:flex-row items-center px-4 sm:px-6 md:px-56 w-full bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="flex flex-col md:flex-row gap-6 items-center w-full">
        {/* LOG IN */}
        <div className="bg-white shadow-2xl rounded-lg px-8 py-8 max-w-sm w-full mt-8 md:mt-0">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
            Login
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="userName"
                className="shadow-sm rounded-md w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your username..."
                {...register('userName', { required: 'Username is required' })}
              />
              {errors.userName && (
                <span className="text-red-500">{errors.userName.message}</span>
              )}
            </div>
            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="shadow-sm rounded-md w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                {...register('password', { required: 'Password is required' })}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
              <a href="#" className="text-xs text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Forgot Password?
              </a>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:outline-none"
                  defaultChecked
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
        </div>
        {/* "Logistic 1" Text */}
        <div className="text-center md:text-left mt-8 md:mt-0">
          <p className="text-6xl sm:text-7xl md:text-8xl font-bold text-white">
            Logistic 1
          </p>
          <p className="text-white/70 mt-4 text-base sm:text-lg font-medium">
            Sign in to access your account and manage your preferences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Log;
