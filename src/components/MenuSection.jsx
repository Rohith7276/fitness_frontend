import React, { useRef, useState, useEffect } from 'react'
import { ChevronRight, Users } from 'lucide-react';
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react";
import { Menu } from 'lucide-react';
import { LogOut, Settings, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom"; 
import { useChatStore } from '../store/useChatStore';   
const MenuSection = () => {
    const menuDiv = useRef(null);
    const { logout, authUser } = useAuthStore();
    const { addFriend } = useChatStore()
    const [createGroup, setCreateGroup] = useState(false)
    const [friendId, setFriendId] = useState("");
    const { contextSafe } = useGSAP();

    useEffect(() => {
        const googleTranslateElementInit = () => {
          if (typeof window !== "undefined" && typeof document !== "undefined") {
            new window.google.translate.TranslateElement(
              { pageLanguage: 'en' },
              'google_translate_element'
            );
          }
         
        };
    
    
        if (typeof document !== "undefined")
          document.querySelectorAll('li').forEach(element => {
            element.style.opacity = 1;
          });
    
        const addGoogleTranslateScript = () => {
          if (typeof document !== "undefined")
            var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src =
            'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
          script.async = true;
          if (typeof document !== "undefined")
            document.body.appendChild(script);
          if (typeof window !== "undefined") {
            window.googleTranslateElementInit = googleTranslateElementInit;
          }
        };
    
        addGoogleTranslateScript();
    
      }, []);
    const closeAnimation = contextSafe(() => {
        gsap.to(menuDiv.current, {
            x: "0vw"
        })
        setCreateGroup(false)

        setTimeout(() => {
            let tl = gsap.timeline({ paused: true })
            const backDiv = document.getElementById('backDiv')
            tl.to(backDiv, {
                opacity: 0
            })
            tl.to(backDiv, {
                display: "none"
            })
            tl.play()
        }, 100);
    })

    const openAnimation = contextSafe(() => {
        const backDiv = document.getElementById('backDiv')
        gsap.to(backDiv, {
            display: "block"
        })
        gsap.to(menuDiv.current, {
            x: "-30vw"
        })
        gsap.to(backDiv, {
            opacity: 0.7
        })
    })

    const handleAddFriend = () => {
        addFriend(friendId);
    }

    return (
        <>
            <button onClick={openAnimation}>
                <Menu />
            </button>
            <div className=''>
                <div id='backDiv' className='bg-black hidden opacity-0 absolute top-0 left-0 w-screen h-screen z-[100] '>
                </div>
                <div ref={menuDiv} className='w-[20vw] mr-[-30vw] h-screen rounded-l-md right-0 fixed bg-base-300 top-0 z-[101]'>
                    <button className='ml-[-1.34rem] w-[1.33rem] absolute bg-base-100 text-sm h-10 mt-5 rounded-l-sm z-[99]' onClick={() => {
                        closeAnimation()
                    }}>
                        <ChevronRight />
                    </button>
                    <div>
                        <div className='px-5 pt-5 rounded-sm flex justify-center items-center overflow-hidden max-h-[50vh] max-w-full'>
                            <img src={authUser?.profilePic} alt="" />
                        </div>
                        <h1 className='w-full text-center text-3xl font-bold'>{authUser?.fullName}</h1>
                    </div>
                    <div className="flex items-center  px-4 py-5 gap-4 flex-col">

                        {authUser && (
                            <>
                                <input type="text" onChange={(e) => setFriendId(e.target.value)} />
                                <button onClick={handleAddFriend}>add</button>
                                <Link to={"/profile"} onClick={() => {
                                    closeAnimation()
                                }} className={`btn btn-sm gap-2 w-full`}>
                                    <User className="size-5" />
                                    <span className="hidden sm:inline">Profile</span>
                                </Link>
                                <div className='border border-t-0 border-l-0 border-r-0   py-1 lggfd:w-fit border-b-sm lg:border-b-0 w-full lg:w-fit'>

                                    <div id="google_translate_element" className='lg:w-fit overflow-hidden mt-[-0.9rem] h-[2rem]'></div>
                                </div>
                                <Link onClick={() => {
                                    closeAnimation()
                                }}
                                    to={"/create-group"}
                                    className={`btn btn-sm w-full gap-2 transition-colors`}
                                >
                                    <Users className="w-4 h-4" />

                                    <span className="hidden sm:inline">Create Group</span>
                                </Link>

                                <Link onClick={() => {
                                    closeAnimation()
                                }}
                                    to={"/settings"}
                                    className={`btn btn-sm w-full gap-2 transition-colors`}
                                >
                                    <Settings className="w-4 h-4" />
                                    <span className="hidden sm:inline">Settings</span>
                                </Link>
                                <button onClick={() => {
                                    closeAnimation()
                                    logout()
                                }} className="flex gap-2 items-center"  >
                                    <LogOut className="size-5" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuSection
