import React from 'react'
import heroimg from './assets/hero-img.png'
import './App.css'
import Navbar from './components/Navbar'
import GenCap from './components/GenCap'
import RandomCurvyLine from './components/RandomCurvyLine'

const App = () => {
  return (
    <>
    <Navbar/>
    
    <div id="home" className='flex flex-col md:flex-row justify-center items-center h-screen w-full bg-bg p-6'>
    
      {/* Text Section */}
      <div className='flex flex-col justify-center items-start max-w-xl p-6'>
        <h1 className='text-3xl md:text-4xl text-primary mb-4 font-extrabold leading-tight'>
          Turn Every Image Into a Story With AutoCap
        </h1>
        <p className='text-secondary font-medium text-base'>
          AutoCap uses powerful AI to instantly generate engaging, creative, and scroll-stopping captions for your photos. Whether you're posting to social media, running a brand, or just looking for the perfect words — we've got your image covered. Upload your photo, get your caption, and share with confidence.
        </p>
      </div>

      {/* Image Section */}
      <div className='p-6 '>
        <img src={heroimg} alt="Hero visual" className='max-w-md w-full rounded-lg shadow-md' />
      </div>
    </div>
    <div id="generate" className="pt-20 -mt-20">
  <GenCap />
</div>
<div id="guide" className="w-full py-12 px-6 bg-gray-100 text-center ">
  <h2 className="text-2xl font-bold text-primary mb-4">How to Use AutoCap</h2>
  <p className="text-secondary max-w-2xl mx-auto">
    1. Click "Upload Image" and select a photo.<br />
    2. Let AutoCap generate creative captions.<br />
    3. Copy and share your favorite caption.<br />
  </p>
</div>
    </>
  )
}

export default App;
