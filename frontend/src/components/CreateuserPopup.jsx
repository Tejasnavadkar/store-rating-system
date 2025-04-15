import axios from "axios";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { emailRegex, passwordRegex } from "../config";

const CreateUser = ({setCreateBoxOpen}) => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER",
        address: ""
    });
    const [validationErrors,setValidationErrors] = useState({})
    const navigate = useNavigate()

    // validate inputs
     const InputValidation = () =>{
        setValidationErrors({})
        const newErrors = {}
          
        if(data.name.length < 20 || data.name.length > 60 ){
            setValidationErrors((prev)=>({...prev,name:'name should min 20 & max 60 character'}))
           newErrors['name'] = 'name should min 20 & max 60 character'
        }
          
            if(!emailRegex.test(data.email)){
                setValidationErrors((prev)=>({...prev,email:'Enter Valid Email'}))
                newErrors['email'] = 'Enter Valid Email'
            }
            if(!passwordRegex.test(data.password)){
                setValidationErrors((prev)=>({...prev,password:`
                     8–16 characters
                     At least one uppercase letter
                     At least one special character
                    `}))
                    newErrors['password'] = '8–16 characters - At least one uppercase letter - At least one special character'
            }
            if(data.address.trim().length > 400){
                setValidationErrors((prev)=>({...prev,address:`max 400 characters`}))
                newErrors['address'] = 'max 400 characters'
            }
            return Object.keys(newErrors).length === 0
        }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("data:", data);
       
       const isValid = InputValidation()
        if(!isValid) return

        try {
             // API call 
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/signup`, data)
            if (response.status === 201) {
               alert('user created succefully')
               navigate('/admin-dashboard')
            }
    
            } catch (error) {
                alert(error.message)
                throw new Error('err create user/admin -',error)
            }
    };

    return (
        <>

            <div style={{opacity:'0.9'}} className='fixed top-0 h-full right-0 left-0 bg-black z-50 border flex justify-center items-center'>
                <button onClick={()=>setCreateBoxOpen(false)} className='text-white absolute top-5 right-7 cursor-pointer'><RxCross1 /></button>
                <div className='w-[400px] '>
                    <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-md p-10 ">
                        <div>
                            <label className="block mb-1 font-medium text-gray-950">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter name"
                            />
                            {validationErrors.name && <span className="text-sm text-red-600">{validationErrors.name}</span>}
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-950">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="you@example.com"
                            />
                            {validationErrors.email && <span className="text-sm text-red-600">{validationErrors.email}</span>}
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-950">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                            />
                            {validationErrors.password && <span className="text-sm text-red-600">{validationErrors.password}</span>}
                        </div>

                        <div>
                            <label className="block mb-1 font-medium text-gray-950">
                                Address
                            </label>

                            <textarea
                                name="address"
                                onChange={handleChange}
                                value={data.address}
                                className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter address"
                            ></textarea>
                            {validationErrors.address && <span className="text-sm text-red-600">{validationErrors.address}</span>}
                        </div>

                        <div>
                            <select onChange={handleChange} name="role" value={data.role} className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="USER">User</option>
                                <option value="OWNER">Owner</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                        >
                            Create
                        </button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default CreateUser