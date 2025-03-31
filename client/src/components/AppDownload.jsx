import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto my-20'>
      <div className='relative bg-gradient-to-r from-violet-100 to-purple-200 p-8 sm:p-16 lg:p-24 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center'>
        <div className='flex-1 text-center sm:text-left'>
            <h1 className='text-2xl sm:text-4xl font-bold mb-6 max-w-md leading-tight'>Download Mobile App For Better Experience</h1>
            <div className='flex justify-center sm:justify-start gap-4'>
                <a href="#" className='inline-block'>
                    <img className='h-10 sm:h-12 transition-transform transform hover:scale-105' src={assets.play_store} alt="Play Store" />
                </a>
                <a href="#" className='inline-block'>
                    <img className='h-10 sm:h-12 transition-transform transform hover:scale-105' src={assets.app_store} alt="App Store" />
                </a>
            </div>
        </div>
        <img className='absolute w-48 sm:w-60 right-0 bottom-0 mr-10 max-lg:hidden' src={assets.app_main_img} alt="App Preview" />
      </div>
    </div>
  )
}

export default AppDownload
