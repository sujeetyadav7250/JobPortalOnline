import React, { useState } from 'react'
import { assets } from '../assets/assets'

const RecruiterLogin = () => {

  const [state, setState] = useState('Login')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [email, setEmail] = useState('')

  const [image, setImage] = useState(false)

  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false)

    

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <form className='relative bg-white p-10 rounded-xl text-slate-500'>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>Recruiter {state}</h1>
        <p className='text-sm'>Welcome back! Please sign in to continue</p>
        <>
            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
              <img src={assets.person_icon} alt="" />
              <input onChange={e => setName(e.target.value)} value={name} type="text" placeholder='company name' required />
            </div>

            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
              <img src={assets.email_icon} alt="" />
              <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Email Id' required />
            </div>

            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
              <img src={assets.lock_icon} alt="" />
              <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder='Password' required />
            </div>
        </>

        <button>
          {state === 'Login' ? 'Login' : 'create account'}
        </button>
      </form>
    </div>
  )
}

export default RecruiterLogin


// 3:19