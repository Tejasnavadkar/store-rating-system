import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../Context/Context";

const Login = () => {
  const [loginInfo, setLogInfo] = useState({ email: "", password: "" });
  const navigate =  useNavigate()

  const {setCurrentUser} = useStore()

  const handleChange = (e) => {
    setLogInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login form submitted:", loginInfo);
    // Handle API call here
     try {
                
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, loginInfo)
            if (response.status === 201) {
                console.log('signupResponse-', response.data)

                setCurrentUser(response.data.user)  // store in context
                localStorage.setItem('user', JSON.stringify(response.data.user))
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('role', JSON.stringify(response.data.user.role))
                
                switch (response.data.user.role) {  // role based navigation
                  case "USER":
                      navigate('/user-dashboard')
                      break;
      
                  case "ADMIN":
                      navigate('/admin-dashboard')
                      break;
      
                  case "OWNER":
                      navigate('/owner-dashboard')
                      break;
      
                  default:
                      break;
              }
            }
    
            
    
            } catch (error) {
                console.log('err',error)
                throw new Error('err in login api -',error)
            }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={loginInfo.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={loginInfo.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Don't have an account? <Link to={'/signup'} className="text-blue-600">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
