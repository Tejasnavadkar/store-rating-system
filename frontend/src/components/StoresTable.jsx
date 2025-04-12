import React, { useEffect, useState } from 'react'

const StoresTable = () => {

    const [stores, setStores] = useState([
        {
            name: "Arjun patil",
            email: "arjun@example.com",
            address: "Pune, Maharashtra",
            ratings: 4,
        },
        {
            name: "Karan Mehta",
            email: "karan@gmail.com",
            address: "Mumbai, Maharashtra",
            role: 3,
        },
        {
            name: "Ram Sharma",
            email: "ram@yahoo.com",
            address: "Delhi, India",
            ratings: 5,
        },
    ]);

    const [sortField, setSortField] = useState('')
    const [sortOrder, setSortOrder] = useState('')


    // sorting based on fields 
    const HandleSort = React.useCallback(() => {
        if (sortField && sortOrder && sortField !== 'none') {
            if (sortOrder === 'ascending') {
                const sortedData = [...stores].sort((a, b) => a[sortField].localeCompare(b[sortField]));
                setStores(sortedData);
            }
            if (sortOrder === 'descending') {
                const sortedData = [...stores].sort((a, b) => b[sortField].localeCompare(a[sortField]));
                setStores(sortedData);
            }
        }
    }, [sortField, sortOrder, stores]);

    useEffect(() => {
        HandleSort();
    }, [HandleSort]);

    return (
        <div>
            <section className='mt-10' >
                    <div className='text-xl font-semibold text-center mb-6'>Stores</div>

                    <div className='flex justify-between'>
                        <div className='w-2xl'>
                            <input
                                type="text"
                                name=""
                                placeholder='Search by name,email,address'
                                className='border py-1 px-1 w-full'
                            />
                        </div>
                        {/* sort  */}
                        <div className='flex'>
                            <div className=''>
                                <span>Sort by:</span>
                                <select name="sortBy" onChange={(e) => setSortField(e.target.value)} className='border' id="">
                                    <option value="none">none</option>
                                    <option value="name">Name</option>
                                    <option value="email">Email</option>
                                </select>
                            </div>
                            <div className=''>
                                <select name="sortOrder" onChange={(e) => setSortOrder(e.target.value)} id="" className='border'>
                                    <option value="ascending">Ascending</option>
                                    <option value="descending">Descending</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        {/* user table col name email address role  */}

                        <div className="p-4 overflow-x-auto">
                            <h2 className="text-2xl font-bold mb-4">Stores Table</h2>
                            <table className="w-full table-auto border border-gray-300 rounded-xl overflow-hidden">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="text-left px-4 py-2">Name</th>
                                        <th className="text-left px-4 py-2">Email</th>
                                        <th className="text-left px-4 py-2">Address</th>
                                        <th className="text-left px-4 py-2">Ratings</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stores.map((user, idx) => (
                                        <tr key={idx} className="border-t border-gray-300 hover:bg-gray-50">
                                            <td className="px-4 py-2">{user.name}</td>
                                            <td className="px-4 py-2">{user.email}</td>
                                            <td className="px-4 py-2">{user.address}</td>
                                            <td className="px-4 py-2">{user.ratings}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
        </div>
    )
}

export default StoresTable
