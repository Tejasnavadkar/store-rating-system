import React, { useState } from 'react'

const Owner = () => {

    const [userRating] = useState([
        {
            user:'Amol',
            rating:'4'
        },
        {
            user:'Ravi',
            rating:'3'
        }
    ])
  return (
    <div className=''>
            <div className='w-[85%] mx-auto pt-12'>
                <section>
                    <div className='text-4xl font-semibold text-center'>Store Owner Dashboard</div>
                </section>

                <section className='flex flex-col gap-3 mt-16'>
                        <div className='text-xl'>Store Details</div>
                    <div>
                        
                    <div>
                        <span className='font-bold '>Name:</span>
                        <span>Nova store</span>
                    </div>  {/* get name from local storage/context */}

                    <div>
                        <span className='font-bold '>Email:</span>
                        <span>t@gmail.com</span>
                    </div>

                    <div>
                        <span className='font-bold '>Address:</span>
                        <span className=' '>pune</span>
                    </div>
                    <div>
                        <span className='font-bold '>Average Rating:</span>
                        <span className=' '>5</span>
                    </div>
                    </div>

                </section>

                {/* Stores Table  */}
                {/* name addres overallrating my rating action  */}
                <section >
                
                    <div className="p-4 overflow-x-auto mt-16">
                        <h2 className="text-2xl font-bold mb-4">Rate Stores</h2>
                        {/* <div className='w-2xl'>
                        <input
                            type="text"
                            name=""
                            placeholder='Search by name,address'
                            className='border py-1 px-1 w-full mb-2'
                        />
                    </div> */}
                        <table className="w-full table-auto border border-gray-300 rounded-xl overflow-hidden">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="text-left px-4 py-2">User</th>
                                    <th className="text-left px-4 py-2">Rating</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {userRating.map((store) => (
                                    <tr key={store.id} className="border-t border-gray-300 hover:bg-gray-50">
                                        <td className="px-4 py-2">{store.user}</td>
                                        <td className="px-4 py-2">{store.rating}</td>
                                       
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
