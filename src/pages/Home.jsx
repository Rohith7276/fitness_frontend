
import React, { useEffect, useState, useRef } from 'react'
import { useGSAP } from "@gsap/react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
const Home = () => {
  const { contextSafe } = useGSAP();
  useEffect(() => {

    const animation = contextSafe(() => {
      gsap.to(".homeScreenImg", {
        duration: 5,
        y: -30,
        ease: 'power2.out',
      });
      gsap.to(".homeText", {
        duration: 5,
        opacity: 1,
        y: -30,
        ease: 'power2.out',
      });
      // gsap.to(".homeScreenImg", {
      //     duration: 5,
      //     opacity: 0,
      //     y: -30,
      //     ease: 'power2.out',
      //   });

    });


    animation();
  }, []);

  return (
    <div className=''>
      <div className='h-screen overflow-hidden relative'>

        <img src="https://images.unsplash.com/photo-1554344728-77cf90d9ed26?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-screen absolute homeScreenImg h-fit mt-[4rem]' />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b homeText opacity-0 from-base-100/40 via-base-100/85 to-base-100 mt-[4vh] text-content ">

        <h1 className="text-center text-5xl font-bold mt-[37vh] ">Welcome to RapidFit</h1>
        <p className="text-center text-5xl mt-2 ">Your journey to fitness starts here!</p>
      </div>



      <div className='flex h-screen z-[10] homeScreenImg relative flex-wrap justify-center gap-8 -mt-[12rem]'>
        <a href='/community'
          className="flex items-center  text-center justify-center cursor-pointer w-[20rem] h-[11rem] transition-all ease-in-out  hover:scale-105 bg-gray-200 rounded shadow-md bg-cover bg-center"
          style={{
            backgroundImage: "url('https://plus.unsplash.com/premium_photo-1663036263525-3059e0c47b96?q=80&w=2092&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",

          }}
        >
          <div className='bg-base-100/50 w-full h-full flex items-center text-content flex-col justify-center rounded'>

            <h2 className="text-xl font-bold text-content">Community Hub</h2>
            <p className="text-sm text-content">Join our community and share your fitness journey.</p>
          </div>



        </a>
        <a href='/workout'
          className="flex items-center  text-center justify-center cursor-pointer w-[20rem] h-[11rem] transition-all ease-in-out  hover:scale-105 bg-gray-200 rounded shadow-md bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",

          }}
        >
          <div className='bg-base-100/50 w-full h-full flex items-center text-content flex-col justify-center rounded'>

            <h2 className="text-xl font-bold text-content">Start Workout</h2>
            <p className="text-sm text-content">Join our community and share your fitness journey.</p>
          </div>



        </a>        <a href='/food'
          className="flex items-center  text-center justify-center cursor-pointer w-[20rem] h-[11rem] transition-all ease-in-out  hover:scale-105 bg-gray-200 rounded shadow-md bg-cover bg-center"
          style={{
            backgroundImage: "url('https://plus.unsplash.com/premium_photo-1663858367108-9150fe5ce9bd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",

          }}
        >
          <div className='bg-base-100/50 w-full h-full flex items-center text-content flex-col justify-center rounded'>

            <h2 className="text-xl font-bold text-content">Add your food</h2>
            <p className="text-sm text-content">Join our community and share your fitness journey.</p>
          </div>



        </a>        <a href=''
          className="flex items-center  text-center justify-center cursor-pointer w-[20rem] h-[11rem] transition-all ease-in-out  hover:scale-105 bg-gray-200 rounded shadow-md bg-cover bg-center"
          style={{
            backgroundImage: "url('https://plus.unsplash.com/premium_photo-1663036263525-3059e0c47b96?q=80&w=2092&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",

          }}
        >
          <div className='bg-base-100/50 w-full h-full flex items-center text-content flex-col justify-center rounded'>

            <h2 className="text-xl font-bold text-content">Community Hub</h2>
            <p className="text-sm text-content">Join our community and share your fitness journey.</p>
          </div>



        </a>
      </div>
      <section>
        <h1>Your Analytics</h1>
        
      </section>
    </div>
  )
}

export default Home
