import React, { useState } from 'react'
import UsersTable from './UsersTable';
import StoresTable from './StoresTable';
import CreateUser from './CreateuserPopup';
import CreateStore from './CreateStore';
import { useStore } from '../Context/Context';

const Admin = () => {

    const [createBoxOpen, setCreateBoxOpen] = useState(false)
    const [CreateStorePopUp, setCreateStorePopUp] = useState(false)
    const { totalUser, totalStore, totalUsersSubmittedRating } = useStore()

    return (
        <div className='relative'>
            {createBoxOpen && <CreateUser setCreateBoxOpen={setCreateBoxOpen} />}
            {CreateStorePopUp && <CreateStore setCreateStorePopUp={setCreateStorePopUp} />}
            <div className='w-[85%] mx-auto pt-12'>
                <section>
                    <div className='text-4xl font-semibold text-center'>Admin Dashboard</div>
                </section>

                <section className='flex flex-col gap-3'>
                    <div className='text-3xl font-semibold'>Statistics</div>
                    <div>
                        <div className='text-lg '>Total Users:{totalUser || 0}</div>
                        <div className='text-lg '>Total Stores:{totalStore || 0}</div>
                        <div className='text-lg '>Total Users Submitted Rating:{totalUsersSubmittedRating || 0}</div>
                    </div>
                </section>

                <section >
                    <div className='text-xl font-semibold text-center'>Add User/store</div>
                    <div className='flex justify-evenly'>

                        <button onClick={() => setCreateBoxOpen(true)} type="button" className="focus:outline-none cursor-pointer text-white bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            Create user/admin</button>

                        <button onClick={() => setCreateStorePopUp(true)} type="button" className="focus:outline-none cursor-pointer text-white bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            Create Store</button>
                    </div>
                </section>

                {/* userTable  */}
                <section>
                    <UsersTable />
                </section>

                {/* Stores Table  */}
                <section>
                    <StoresTable />
                </section>
            </div>
        </div>
    )
}

export default Admin





