import { useState } from "react";
import { RxCross1 } from "react-icons/rx";

const CreateUser = ({setCreateBoxOpen}) => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        address: ""
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login form submitted:", data);
        // Handle API call here
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
                    </form>
                </div>
            </div>

        </>
    )
}

export default CreateUser