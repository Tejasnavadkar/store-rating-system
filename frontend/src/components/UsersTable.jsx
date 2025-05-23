import axios from 'axios';
import React, {useEffect, useState } from 'react'
import { useStore } from '../Context/Context';

const UsersTable = () => {

    const [users, setUsers] = useState([
    
    ]);
    const [sortField, setSortField] = useState('')
    const [sortOrder, setSortOrder] = useState('')
    const [filter,setFilter] = useState('')

    const {setTotalUser,setTotalUsersSubmittedRating} = useStore()


    const FetchUsers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/getAllUsers`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                params: {
                    filter: filter  // to search
                }
            });
            console.log('FetchUser response',response)
            if (response.status === 201) {
                const AllUsers = [...response.data.user]
                setUsers(response.data.user);
                setTotalUser(response.data.user.length)
               const onlyRatedUsers = AllUsers.filter((user)=> user.ratings.length > 0) // users who submit ratings
               setTotalUsersSubmittedRating(onlyRatedUsers.length)
            }
        } catch (error) {
            console.log('err-fetch users', error);
            throw new Error('err in usersTable -', error);
        }
    }

    useEffect(() => {
        FetchUsers();
    }, [filter]);


    // sorting based on fields 
    const HandleSort = React.useCallback(() => {
        if (sortField && sortOrder && sortField !== 'none') {
            if (sortOrder === 'ascending') {
                const sortedData = [...users].sort((a, b) => a[sortField].localeCompare(b[sortField]));
                setUsers(sortedData);
            }
            if (sortOrder === 'descending') {
                const sortedData = [...users].sort((a, b) => b[sortField].localeCompare(a[sortField]));
                setUsers(sortedData);
            }
        }
    }, [sortField, sortOrder]);

    useEffect(() => {
        HandleSort();
    }, [HandleSort]);

    return (
        <div>
            <section >
                <div className='text-xl font-semibold text-center mb-6'>Users</div>

                <div className='flex justify-between'>
                    <div className='w-2xl'>
                        <input
                            type="text"
                            onChange={(e)=>setFilter(e.target.value)}
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
                        <h2 className="text-2xl font-bold mb-4">User Table</h2>
                        <table className="w-full table-auto border border-gray-300 rounded-xl overflow-hidden">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="text-left px-4 py-2">Name</th>
                                    <th className="text-left px-4 py-2">Email</th>
                                    <th className="text-left px-4 py-2">Address</th>
                                    <th className="text-left px-4 py-2">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, idx) => (
                                    <tr key={idx} className="border-t border-gray-300 hover:bg-gray-50">
                                        <td className="px-4 py-2">{user.name}</td>
                                        <td className="px-4 py-2">{user.email}</td>
                                        <td className="px-4 py-2">{user.address}</td>
                                        <td className="px-4 py-2">{user.role}</td>
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

export default UsersTable


// {
//     name: "Tejas Patil",
//     email: "tejas@example.com",
//     address: "Pune, Maharashtra",
//     role: "Admin",
// },
// {
//     name: "Aryan Mehta",
//     email: "aryan@gmail.com",
//     address: "Mumbai, Maharashtra",
//     role: "User",
// },
// {
//     name: "Priya Sharma",
//     email: "priya@yahoo.com",
//     address: "Delhi, India",
//     role: "Store Owner",
// },