import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useStore } from "../Context/Context";
import { emailRegex, passwordRegex } from "../config";

const SignUp = () => {
    const [signupInfo, setsignUpInfo] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        address: ""
    });
    const [validationErrors,setValidationErrors] = useState({})
    const navigate = useNavigate()
    const {setCurrentUser} = useStore()


    const InputValidation = () =>{

        if(signupInfo.name.length < 20 || signupInfo.name.length > 60 ){
            setValidationErrors((prev)=>({...prev,name:'name should min 20 & max 60 character'}))
        }

        if(!emailRegex.test(signupInfo.email)){
            setValidationErrors((prev)=>({...prev,email:'Enter Valid Email'}))
        }
        if(!passwordRegex.test(signupInfo.password)){
            setValidationErrors((prev)=>({...prev,password:`
                 8–16 characters
                 At least one uppercase letter
                 At least one special character
                `}))
        }
        if(signupInfo.address.trim().length > 400){
            setValidationErrors((prev)=>({...prev,address:`max 400 charaters`}))
        }
    }

    const handleChange = (e) => {
        setsignUpInfo({ ...signupInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login form submitted:", signupInfo);
        // input validations 
         InputValidation()
        if(validationErrors !== null) return

        try {
            // API call
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/signup`, signupInfo)
        if (response.status === 201) {

            console.log('signupResponse-', response.data)

            setCurrentUser(response.data.user)  // store in context
            localStorage.setItem('user', JSON.stringify(response.data.token))
            localStorage.setItem('token', JSON.stringify(response.data.user))
            localStorage.setItem('role', JSON.stringify(response.data.user.role))
        }

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

        } catch (error) {
            console.log('err',error)
            throw new Error('err in signup api -',error)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={signupInfo.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter name"
                        />
                        {validationErrors.name && <span className="text-sm text-red-600">{validationErrors.name}</span>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={signupInfo.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                        />
                        {validationErrors.email && <span className="text-sm text-red-600">{validationErrors.email}</span>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={signupInfo.password}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                          {validationErrors.password && <span className="text-sm text-red-600">{validationErrors.password}</span>}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Address
                        </label>

                        <textarea
                            name="address"
                            onChange={handleChange}
                            value={signupInfo.address}
                            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter address"
                        ></textarea>
                        {validationErrors.address && <span className="text-sm text-red-600">{validationErrors.address}</span>}

                    </div>

                    <div>
                        <select onChange={handleChange} name="role" id="" className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="USER">User</option>
                            <option value="OWNER">Owner</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-500">
                    Already have an account? <Link to={'/'} className="text-blue-600">login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
