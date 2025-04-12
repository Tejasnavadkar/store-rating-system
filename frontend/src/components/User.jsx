import React, { useEffect, useState } from 'react'
import StoresTable from './StoresTable'
import axios from 'axios';


const User = () => {

    const [stores,setStores] = useState([
        {
            id: 1,
            name: "Smart Electronics",
            address: "MG Road, Pune",
            overallRating: 4.3,
        },
        {
            id: 2,
            name: "Daily Needs Mart",
            address: "Koregaon Park, Pune",
            overallRating: 3.8,
        },
        {
            id: 3,
            name: "Gadget World",
            address: "Viman Nagar, Pune",
            overallRating: 4.7,
        },
    ]);
    const [filter,setFilter] = useState('')
    const [ratings, setRatings] = useState({});

    const loggedInUser = JSON.parse(localStorage.getItem('user'))

    const handleChange = (e, storeId) => {
        setRatings({ ...ratings, [storeId]: e.target.value });
    };

    const handleSubmit = async (storeId) => {
        const rating = ratings[storeId];
        if (!rating || rating < 1 || rating > 5) {
            alert("Please enter a rating between 1 and 5");
            return;
        }
        console.log(`Submitted rating for store ${storeId}: ${rating}`);
        // TODO: API call to submit rating

       const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/store/rateTheStore/${storeId}`,{
            score:rating
        })

        if(response.status === 201){
            alert('rating submitted successfully')
            setRatings(prev=>({...prev,[response.data.rating.storeId]:response.data.value}))
        }
    };

    const FetchStores = async () =>{

        try {
           const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/store/getAllstores`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                },
                params:{
                    filter:filter
                }
            })

            if(response.status === 201){
                setStores(response.data.allStores)
            } 
        } catch (error) {
            throw new Error('err in User-dashboard -', error);
        }
    }

    useEffect(()=>{
       FetchStores()
    },[filter])


    return (
        <div className=''>
            <div className='w-[85%] mx-auto pt-12'>
                <section>
                    <div className='text-4xl font-semibold text-center'>User Dashboard</div>
                </section>

                <section className='flex flex-col gap-3 mt-16'>

                    <div>
                        <span className='font-bold '>Name:</span>
                        <span>{loggedInUser?.name || 'N/A'}</span>
                    </div>  {/* get name from local storage/context */}

                    <div>
                        <span className='font-bold '>Email:</span>
                        <span>{loggedInUser?.email || 'N/A'}</span>
                    </div>

                    <div>
                        <span className='font-bold '>Address:</span>
                        <span className=' '>{loggedInUser?.address || 'N/A'}</span>
                    </div>

                </section>

                {/* Stores Table  */}
                <section >
                
                    <div className="p-4 overflow-x-auto mt-16">
                        <h2 className="text-2xl font-bold mb-4">Rate Stores</h2>
                        <div className='w-2xl'>
                        <input
                            type="text"
                            name=""
                            onChange={(e)=>setFilter(e.target.value)}
                            placeholder='Search by name,address'
                            className='border py-1 px-1 w-full mb-2'
                        />
                    </div>
                        <table className="w-full table-auto border border-gray-300 rounded-xl overflow-hidden">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="text-left px-4 py-2">Name</th>
                                    <th className="text-left px-4 py-2">Address</th>
                                    <th className="text-left px-4 py-2">Overall Rating</th>
                                    <th className="text-left px-4 py-2">My Rating</th>
                                    <th className="text-left px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stores.map((store) => (
                                    <tr key={store.id} className="border-t border-gray-300 hover:bg-gray-50">
                                        <td className="px-4 py-2">{store.name}</td>
                                        <td className="px-4 py-2">{store.address}</td>
                                        <td className="px-4 py-2">{store.overallRating}</td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="number"
                                                min="1"
                                                max="5"
                                                value={ratings[store.id] || ""}
                                                onChange={(e) => handleChange(e, store.id)}
                                                className="border border-gray-300 rounded-md px-2 py-1 w-20"
                                                placeholder="1-5"
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleSubmit(store.id)}
                                                className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
                                            >
                                               {ratings[store.id] ? 'update' : 'Submit'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default User
