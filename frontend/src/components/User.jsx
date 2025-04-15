import React, { useEffect, useState } from 'react'
import StoresTable from './StoresTable'
import axios from 'axios';


const User = () => {

    const [stores,setStores] = useState([]);
    const [filter,setFilter] = useState('')
    const [ratings, setRatings] = useState({});

    const loggedInUser = JSON.parse(localStorage.getItem('user'))

    const handleChange = (e, storeId) => {
        const value = e.target.value;
    if (value === '' || (value >= 1 && value <= 5)) {
        setRatings(prev => ({ ...prev, [storeId]: value }));
    }
    };

    const handleKeyDown = (e) => {
        if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'Backspace' && e.key !== 'Delete') {
            e.preventDefault();
            alert('Please use arrow keys to change rating');
        }
    };

    const handleSubmit = async (storeId,store) => {
        const rating = ratings[storeId] || stores.map((store)=>store.ratings.filter((users)=>users.user.id == loggedInUser.id)[0].value );
        if (!rating || rating < 1 || rating > 5) {
            alert("Please enter a rating between 1 and 5");
            return;
        }
        console.log(`Submitted rating for store ${storeId}: ${rating}`);

        const existingRating = store.ratings.find(
            (rating) => rating.user.id === loggedInUser.id
        );

        let response;
        if (existingRating) {
            // Update existing rating
            response = await axios.put(
                `${import.meta.env.VITE_BASE_URL}/store/modifyRating/${storeId}`,
                {
                    score: rating
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
        } else {
            // Create new rating
            response = await axios.put(
                `${import.meta.env.VITE_BASE_URL}/store/rateTheStore/${storeId}`,
                {
                    score: rating
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
        }

        if (response.status === 201) {
            // console.log('hiiiiiiiiiiiii')
            alert(existingRating ? 'Rating updated successfully' : 'Rating submitted successfully');
            setRatings(prev => ({...prev, [response.data.rating.storeId]: response.data.rating.value}));
            // Refresh the stores list to get updated ratings
            FetchStores();
        }

        

    //     // API call to submit rating
    //    const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/store/rateTheStore/${storeId}`,{
    //         score:rating
    //     },{
    //         headers:{
    //             Authorization:`Bearer ${localStorage.getItem('token')}`
    //         }
    //     })

    //     if(response.status === 201){
    //         alert('rating submitted successfully')
    //         setRatings(prev=>({...prev,[response.data.rating.storeId]:response.data.rating.value}))
    //     }
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
                setStores(response.data.allstores)
                response.data.allstores
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
                                {stores?.map((store) => (
                                    <tr key={store.id} className="border-t border-gray-300 hover:bg-gray-50">
                                        <td className="px-4 py-2">{store?.name}</td>
                                        <td className="px-4 py-2">{store?.address}</td>
                                        <td className="px-4 py-2">{store?.overallRating}</td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="number"
                                                min="1"
                                                max="5"
                                                value={ratings[store.id] ||  (store.ratings.find(rating => rating.user.id === loggedInUser.id)?.value) || 
                                                    ''}
                                                    onKeyDown={handleKeyDown}
                                                onChange={(e) => handleChange(e, store.id)}
                                                className="border border-gray-300 rounded-md px-2 py-1 w-20"
                                                placeholder="1-5"
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleSubmit(store.id,store)}
                                                className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
                                            >
                                               {ratings[store.id] || store.ratings.filter((users)=>users.user.id == loggedInUser.id)[0].value ? 'update' : 'Submit'}
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


// store.ratings.filter((users)=>users.user.id == loggedInUser.id)[0].value