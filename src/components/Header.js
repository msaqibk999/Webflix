import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../utils/Firebase'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();

  const handleSignout = () => {
    signOut(auth).then(()=> {
      navigate("/")
    }).catch((error) => {
      navigate("/error")
    })
  }

  return (
    <div className='absolute w-full px-40 py-2 z-10 flex justify-between'>
        <img className='w-48' src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo" />
        <div className='flex p-2 items-center'>
          <img src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg" alt="user-logo" className='h-12 w-12'/>
          <button onClick={handleSignout} className='font-bold pl-3'>(Sign out)</button>
        </div>
    </div>
  )
}

export default Header