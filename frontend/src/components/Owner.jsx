import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Owner = () => {

    // const [userRating, setUserRating] = useState([
    //     {
    //         user: 'Amol',
    //         rating: '4'
    //     },
    //     {
    //         user: 'Ravi',
    //         rating: '3'
    //     }
    // ])

    const [owner, setOwner] = useState({})
  


    const FetchStore = async () => {
        try {

            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/getUser`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.status === 201) {
                setOwner(response.data.user)

                //   Calculate average rating after fetching data
                //   const totalRatings = response.data.user?.stores[0]?.ratings?.reduce(
                //     (sum, item) => sum + item.value,
                //     0
                // );
                // const averageRating =
                //     totalRatings && response.data.user?.stores[0]?.ratings?.length
                //         ? totalRatings / response.data.user?.stores[0]?.ratings?.length
                //         : 0;
                // setAverageRatingOfStore(averageRating.toFixed(1));

            }
        } catch (error) {
            throw new Error('err in Owner-dashboard:', error);
        }
    }

    useEffect(()=>{
        FetchStore()
    },[])


    return (
        <div className=''>
            <div className='w-[85%] mx-auto pt-12'>
                <section>
                    <div className='text-4xl font-semibold text-center'>Store Owner Dashboard</div>
                </section>

                <section className='flex flex-col gap-3 mt-16'>
                    <div className='text-xl'>Store Details</div> {/* get name from local storage/context */}
                    <div>

                        <div>
                            <span className='font-bold '>Name:</span>
                           <span>{owner?.stores?.[0]?.name || 'N/A'}</span>
                        </div>  

                        <div>
                            <span className='font-bold '>Email:</span>
                            <span>{owner?.stores?.[0]?.email || 'N/A'}</span>
                        </div>

                        <div>
                            <span className='font-bold '>Address:</span>
                            <span>{owner?.stores?.[0]?.address || 'N/A'}</span>
                        </div>
                        <div>
                            <span className='font-bold '>Average Rating:</span>
                            <span className=' '>{owner?.stores?.[0]?.overAllRating || 'N/A' }</span>
                        </div>
                    </div>

                </section>

                {/* Stores Table  */}
                {/* name addres overallrating myrating action  */}
                <section >

                    <div className="p-4 overflow-x-auto mt-16">
                        <h2 className="text-2xl font-bold mb-4">Rate Stores</h2>
                        <table className="w-full table-auto border border-gray-300 rounded-xl overflow-hidden">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="text-left px-4 py-2">User</th>
                                    <th className="text-left px-4 py-2">Rating</th>

                                </tr>
                            </thead>
                            <tbody>
                                {owner?.stores?.[0].ratings?.map((store) => (
                                    <tr key={store?.id} className="border-t border-gray-300 hover:bg-gray-50">
                                        <td className="px-4 py-2">{store?.user.name}</td>
                                        <td className="px-4 py-2">{store?.value}</td>

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

export default Owner

