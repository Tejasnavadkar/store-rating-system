import { useState } from "react";
import { RxCross1 } from "react-icons/rx";


const CreateStore = ({setCreateStorePopUp}) =>{

    
    const [data, setData] = useState({
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
                <button onClick={()=>setCreateStorePopUp(false)} className='text-white absolute top-5 right-7 cursor-pointer'><RxCross1 /></button>
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