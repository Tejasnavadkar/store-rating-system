import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
   const navigate = useNavigate()
  return (
    <div className='flex justify-between px-4 mt-4'>
      <span className='font-bold text-xl'>Store Rating</span>
      <button onClick={()=>navigate('/')} className='px-4 py-1 bg-red-600 text-white rounded-md cursor-pointer'>Logout</button>
    </div>
  )
}

export default NavBar
