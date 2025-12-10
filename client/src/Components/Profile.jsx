import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function Profile() {

const {isLoggedIn, userData} = useContext(AppContext);

  return (
    isLoggedIn? 
    <div className='relative flex justify-center items-center bg-teal-500 rounded-full size-10 text-white font-semibold mx-3 group'>
        <span>{userData.name[0].toUpperCase()}</span>
        <div className='absolute top-10 right-5 p-3 w-max bg-red-500 space-y-1 hidden group group-hover:block'>
            <p>Logout</p>
            <p>Verify Email</p>
        </div>
    </div> 
    : 
    <div>Login</div>
  )
}
