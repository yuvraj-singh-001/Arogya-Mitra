import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Calendar, MapPin } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/userSlice.js';
import { useNavigate } from 'react-router-dom';


export default function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const allUsers = useSelector(state => state.user.allUsers);
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        phone: '',

    });


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = (e) => {
        e.preventDefault(); // ✅ Prevents refresh

        if (!formData.fullname || !formData.email || !formData.password) {
            return setError('Please fill in all required fields!');
        }


        if (allUsers.some(u => u.email === formData.email)) {
            return setError('Email already exists!');
        }

        const newUser = {
            userId: Date.now(),
            username: formData.email,
            password: formData.password,
            role: 'Patient',
            fullname: formData.fullname,
            phone: formData.phone,
            gender: formData.gender,
            isActive: true
        };

        dispatch(signup(newUser));
        navigate('/home'); // ✅ Redirect after signup

        setFormData({
            fullname: '',
            email: '',
            password: '',
            phone: '',
            gender: '',
        });
    };



    return (
        <>

          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-2">
                <div className="w-full max-w-[500px]">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 text-white text-center">
                            <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center transform transition-transform duration-500 hover:scale-110 hover:rotate-6">
                                <User className="w-10 h-10 text-blue-500" />
                            </div>
                            <h2 className="text-3xl font-bold mb-2">Patient Registration</h2>
                            <p className="text-blue-100">Join our healthcare portal today</p>
                        </div>

                        {/* Form Content */}
                        <div className="px-8 py-4 max-h-full">
                            <div className="space-y-2">
                                {/* Full Name */}
                                <div className="transform transition-all duration-300 animate-fadeIn">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <div className="relative group">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 transition-all duration-300 group-focus-within:text-blue-600" />
                                        <input
                                            type="text"
                                            name="fullname"
                                            value={formData.fullname}
                                            onChange={handleInputChange}
                                            className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all duration-300 hover:border-blue-300"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="transform transition-all duration-300 animate-fadeIn">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address *
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

                                {/* Password */}
                                <div className="transform transition-all duration-300 animate-fadeIn">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password *
                                    </label>
                                    <div className="relative group">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 transition-all duration-300 group-focus-within:text-blue-600" />
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all duration-300 hover:border-blue-300"
                                            placeholder="Create a strong password"
                                        />
                                    </div>
                                </div>

                                {/* Phone Number */}
                                <div className="transform transition-all duration-300 animate-fadeIn">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <div className="relative group">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 transition-all duration-300 group-focus-within:text-blue-600" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all duration-300 hover:border-blue-300"
                                            placeholder="00000 11111"
                                        />
                                    </div>
                                </div>



                                {/* Gender */}
                                <div className="transform transition-all duration-300 animate-fadeIn">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Gender *
                                    </label>
                                    <div className="flex gap-6">
                                        <label className="flex items-center cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                checked={formData.gender === 'male'}
                                                onChange={handleInputChange}
                                                className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                            />
                                            <span className="ml-2 text-gray-700 group-hover:text-blue-600 transition-colors">
                                                Male
                                            </span>
                                        </label>
                                        <label className="flex items-center cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                checked={formData.gender === 'female'}
                                                onChange={handleInputChange}
                                                className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                            />
                                            <span className="ml-2 text-gray-700 group-hover:text-blue-600 transition-colors">
                                                Female
                                            </span>
                                        </label>
                                        <label className="flex items-center cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="other"
                                                checked={formData.gender === 'other'}
                                                onChange={handleInputChange}
                                                className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                            />
                                            <span className="ml-2 text-gray-700 group-hover:text-blue-600 transition-colors">
                                                Other
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                {error && <p className='text-red-500 text-center font-semibold text-md'>{error}</p>}

                                {/* Terms & Conditions */}
                                {/* <div className="flex items-start text-sm">
                                <input
                                    type="checkbox"
                                    className="mt-1 mr-2 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                />
                                <span className="text-gray-600">
                                    I agree to the{' '}
                                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                                        Terms & Conditions
                                    </a>{' '}
                                    and{' '}
                                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                                        Privacy Policy
                                    </a>
                                </span>
                            </div> */}

                                {/* Submit Button */}
                                <button
                                    onClick={handleSignup}
                                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 mt-6"
                                >
                                    Create Account
                                </button>

                                {/* Divider */}
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-gray-500">
                                            Already have an account?
                                        </span>
                                    </div>
                                </div>

                                {/* Login Link */}
                                <div className="text-center">
                                    <a
                                        href="#"
                                        className="text-blue-600 font-semibold hover:text-blue-700 transition-all duration-300 hover:underline"
                                    >
                                        Login here →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security Note */}
                    {/* <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        🔒 Your personal information is secure and encrypted
                    </p>
                </div> */}
                </div>

         
            </div>

        </>
    );
}