import axios from "axios";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { emailRegex, passwordRegex } from "../config"

const CreateStore = ({ setCreateStorePopUp }) => {

    const [data, setData] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate()

    const InputValidation = () => {
        let errors = {};

        // Store validations
        if (!data.StoreName || data.StoreName.length < 3 || data.StoreName.length > 60) {
            errors.StoreName = 'Store name should be between 3 and 60 characters';
        }

        if (!data.StoreEmail || !emailRegex.test(data.StoreEmail)) {
            errors.StoreEmail = 'Enter valid store email';
        }

        if (!data.StorePassword || !passwordRegex.test(data.StorePassword)) {
            errors.StorePassword = `Password must have:
                • 8–16 characters
                • At least one uppercase letter
                • At least one special character`;
        }

        if (!data.StoreAddress || data.StoreAddress.trim().length > 400) {
            errors.StoreAddress = 'Store address must not exceed 400 characters';
        }

        // Owner validations
        if (!data.OwnerName || data.OwnerName.length < 3 || data.OwnerName.length > 60) {
            errors.OwnerName = 'Owner name should be between 3 and 60 characters';
        }

        if (!data.OwnerEmail || !emailRegex.test(data.OwnerEmail)) {
            errors.OwnerEmail = 'Enter valid owner email';
        }

        if (!data.OwnerPassword || !passwordRegex.test(data.OwnerPassword)) {
            errors.OwnerPassword = `Password must have:
                • 8–16 characters
                • At least one uppercase letter
                • At least one special character`;
        }

        if (!data.OwnerAddress || data.OwnerAddress.trim().length > 400) {
            errors.OwnerAddress = 'Owner address must not exceed 400 characters';
        }

        if (!data.role) {
            errors.role = 'Please select a role';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0; // Returns true if no errors
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("data:", data);

        const isValid = InputValidation();
        if (!isValid) return;
        try {

            // api call 
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/store/addStore`, data,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 201) {
                alert('store created succefully')
                navigate('/admin-dashboard')
            }

        } catch (error) {
            console.log('err', error)
            alert(error.message)
            throw new Error('err create store -', error)
        }
    };

    return (
        <>
            <div style={{ opacity: '0.9' }} className='fixed top-0 h-full right-0 left-0 bg-black z-50 border flex justify-center items-center'>
                <button onClick={() => setCreateStorePopUp(false)} className='text-white absolute top-5 right-7 cursor-pointer'><RxCross1 /></button>
                <div className='w-[800px] '>
                    <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-md p-10 ">
                        <div className="block mb-1 font-medium text-gray-950">
                            Store Info
                        </div>
                        <div className='w-full grid grid-cols-2 gap-2  ' >
                            <div>
                                <div>
                                    <label className="block mb-1 font-medium text-gray-950">
                                        Store Name
                                    </label>
                                    <input
                                        type="text"
                                        name="StoreName"
                                        // value={data.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter name"
                                    />

                                    {validationErrors.StoreName && (
                                        <span className="text-sm text-red-600">{validationErrors.StoreName}</span>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium text-gray-950">
                                        Store Email
                                    </label>
                                    <input
                                        type="email"
                                        name="StoreEmail"
                                        // value={data.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="you@example.com"
                                    />
                                     {validationErrors.StoreEmail && (
                            <span className="text-sm text-red-600">{validationErrors.StoreEmail}</span>
                        )}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium text-gray-950">
                                        Store Password
                                    </label>
                                    <input
                                        type="password"
                                        name="StorePassword"
                                        // value={data.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="••••••••"
                                    />
                                     {validationErrors.StorePassword && (
                            <span className="text-sm text-red-600">{validationErrors.StorePassword}</span>
                        )}
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium text-gray-950">
                                        Store Address
                                    </label>

                                    <textarea
                                        name="StoreAddress"
                                        onChange={handleChange}
                                        // value={data.address}
                                        className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter address"
                                    ></textarea>
                                     {validationErrors.StoreAddress && (
                            <span className="text-sm text-red-600">{validationErrors.StoreAddress}</span>
                        )}
                                </div>

                                {/* <div>
                            <select onChange={handleChange} name="role" id="" className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="USER">User</option>
                                <option value="OWNER">Owner</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div> */}
                                {/* <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                        >
                            Create
                        </button> */}
                            </div>

                            <div>
                                <div>
                                    <label className="block mb-1 font-medium text-gray-950">
                                        Owner Name
                                    </label>
                                    <input
                                        type="text"
                                        name="OwnerName"
                                        // value={data.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter name"
                                    />
                                     {validationErrors.OwnerName && (
                            <span className="text-sm text-red-600">{validationErrors.OwnerName}</span>
                        )}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium text-gray-950">
                                        Owner Email
                                    </label>
                                    <input
                                        type="email"
                                        name="OwnerEmail"
                                        // value={data.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="you@example.com"
                                    />
                                     {validationErrors.OwnerEmail && (
                            <span className="text-sm text-red-600">{validationErrors.OwnerEmail}</span>
                        )}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium text-gray-950">
                                        Owner Password
                                    </label>
                                    <input
                                        type="password"
                                        name="OwnerPassword"
                                        // value={data.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="••••••••"
                                    />
                                     {validationErrors.OwnerPassword && (
                            <span className="text-sm text-red-600">{validationErrors.OwnerPassword}</span>
                        )}
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium text-gray-950">
                                        Owner Address
                                    </label>

                                    <textarea
                                        name="OwnerAddress"
                                        onChange={handleChange}
                                        // value={data.address}
                                        className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter address"
                                    ></textarea>
                                     {validationErrors.OwnerAddress && (
                            <span className="text-sm text-red-600">{validationErrors.OwnerAddress}</span>
                        )}

                                </div>

                                <div>
                                    <select onChange={handleChange} name="role" id="" className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default CreateStore