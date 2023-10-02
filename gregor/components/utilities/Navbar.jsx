import React, { useState, useEffect } from 'react'
import useStateContext from '@/context/ContextProvider';
import icon_logo from "@/public/images/text_logo_white.png"
import Image from "next/image";
import { useRouter } from 'next/router';
import Link from "next/link"
import { Fade } from 'react-reveal';


const Navbar = () => {
  const { } = useStateContext();

  const router = useRouter();

  const [showNavBG, setShowNavBG] = useState(false);
  const controlNavbar = () => {
    console.log(window.scrollY)
    if (window.scrollY < 100) {
      setShowNavBG(true);
    } else {
      setShowNavBG(false);

    }
  }

  const navigate_to_auth_pages = (page) => {
    router.push(`/${page}`);
  }

  return (
    <Fade>
      <div
        id="landing_page"
        className={`w-full h-[60px] px-[10px] md:px-[20px] fixed flex items-center z-[15] transition-all duration-300 bg-blue-500 drop-shadow-md`}
      >
        <div className='flex items-center justify-between w-full transition-all' >
          <div className='w-full' >
            <Link href="/" >
              <div className='relative w-[90px] h-[90px] md:w-[150px] md:h-[150px]' >
                <Image className='w-full h-full object-contain' src={icon_logo} alt="icon_image" />
              </div>
            </Link>
          </div>
          <div className='w-full justify-end gap-3 md:gap-6 items-center flex transition-all' >
            <Link href="/" >
              <button className='text-[12px] md:text-[15px] text-white font-semibold whitespace-nowrap hidden md:block' >Home</button>
            </Link>
            <Link href="/about" >
              <button className='text-[12px] md:text-[15px] text-white font-semibold whitespace-nowrap hidden md:block' >About</button>
            </Link>
            <Link href="/contact-us" >
              <button className='text-[12px] md:text-[15px] text-white font-semibold whitespace-nowrap hidden md:block' >Contact us</button>
            </Link>
            < button
              onClick={() => {
                router.asPath === "/signup" ?
                  navigate_to_auth_pages("login")
                  :
                  navigate_to_auth_pages("signup")
              }}
              className='text-[11px] md:text-[15px] font-semibold px-[14px] py-[6px] bg-white text-indigo-900 rounded-md transition-all  hover:opacity-75  whitespace-nowrap'
            >
              {router.asPath === "/signup" ?
                "Login"
                :
                "Join now"
              }
            </button>
          </div>
        </div>
      </div >
    </Fade>

  )
}

export default Navbar