import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/userSlice.js';

export default function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const [error, setError] = useState(null);


    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // Validate form data

        try {

            const result = await dispatch(loginUser({
                email: formData.email,
                password: formData.password
            })).unwrap();

            console.log(result, " Login result");
            setLoading(false);
         
            


            // Save user if remember me is checked
            if (formData.remember) {
                localStorage.setItem("loggedUser", JSON.stringify(result));
            }

            navigate("/home");
        }
        catch (err) {
            setLoading(false);
            // Handle error
            console.error("Login error:", err);
            setError(err || "Invalid Email or Password");
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white text-center">
                        <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center transform transition-transform duration-500 hover:scale-110 hover:rotate-6">
                            <User className="w-10 h-10 text-blue-500" />
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Login Here !</h2>
                        <p className="text-blue-100">Welcome back to your health portal</p>
                    </div>

                    {/* Form Content */}
                    <div className="p-8">
                        <div className="space-y-5">
                            {/* Email Field */}
                            <div className="transform transition-all duration-300">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 transition-all duration-300 group-focus-within:text-blue-600" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all duration-300 hover:border-blue-300"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="transform transition-all duration-300">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 transition-all duration-300 group-focus-within:text-blue-600" />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all duration-300 hover:border-blue-300"
                                        placeholder="Enter your password"
                                    />
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={formData.remember}
                                        onChange={handleInputChange}
                                        className="mr-2 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <span className="text-gray-600 group-hover:text-blue-600 transition-colors">
                                        Remember me
                                    </span>
                                </label>
                                <Link
                                    to="/forgot-password"
                                    className="text-blue-600 hover:text-blue-700 font-medium transition-all duration-300 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {error && <div className="text-red-500 text-sm text-center font-semibold">{error}</div>}

                            {/* Login Button */}
                            <button
                                onClick={handleLogin}
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 mt-6"
                            >
                                {loading ? "Loading...": "Login to Portal" }   
                            </button>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500">
                                        New patient?
                                    </span>
                                </div>
                            </div>

                            {/* Sign Up Link */}
                            <div className="text-center">
                                <Link
                                    to="/Signup"
                                    className="text-blue-600 font-semibold hover:text-blue-700 transition-all duration-300 hover:underline"
                                >
                                    Create an account →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Note */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        🔒 Your data is secure and encrypted
                    </p>
                </div>
            </div>

            <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
        </div>
    );
}