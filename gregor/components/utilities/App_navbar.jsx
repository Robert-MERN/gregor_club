import React, { useState, useEffect } from 'react'
import useStateContext from '@/context/ContextProvider';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Fade from "react-reveal/Fade";
import Nav_options_popover from '@/utils/Nav_options_popover';
import Image from "next/image";
import icon_logo from "@/public/images/text_logo.png"
import Link from "next/link";
import MenuIcon from '@mui/icons-material/Menu';


const Navbar = () => {
    const { handleSidebar, openModal, switchSidebarTabs, } = useStateContext();
    const [showNavBG, setShowNavBG] = useState(false);
    const controlNavbar = () => {
        if (window.scrollY < 100) {
            setShowNavBG(true);
        } else {
            setShowNavBG(false);

        }
    }
    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        }
    }, []);



    const [anchorEl, setAnchorEl] = useState(null);
    const handle_nav_options_pop = (e) => {
        setAnchorEl(e.currentTarget);
    }

    return (
        <Fade duration={300} >
            <div
                className={`w-screen lg:w-full h-[60px] px-[10px] lg:px-[20px] top-0 inset-x-0 fixed lg:static bg-white flex items-center z-[15] transition-all duration-300 border-b`}
            >
                <div className='flex items-center justify-between w-full' >
                    <div className='' >

                        <IconButton
                            className='lg:flex hidden'
                            onClick={handleSidebar}
                            aria-label="sidebar"
                        // size="large"
                        >
                            <MenuIcon />
                        </IconButton>
                        <div className='relative w-[150px] h-[150px] lg:hidden' >
                            <Image className='w-full h-full object-contain' src={icon_logo} alt="icon_image" />
                        </div>

                    </div>
                    <div className='justify-end flex gap-6 items-center' >

                        <button onClick={() => switchSidebarTabs("Add to Contacts")} className='text-[15px] text-zinc-700 font-semibold font-sans whitespace-nowrap hidden lg:block italic' >Call <a className='text-blue-300 px-1' href="tel:"> 1-800-555-0101 </a> </button>
                        <Link href="/about" >
                            <button className='text-[15px] text-zinc-700  font-semibold  font-sans whitespace-nowrap hidden lg:block' >About</button>
                        </Link>


                        <div aria-describedby='nav_options_popover' onClick={handle_nav_options_pop} className='w-fit' >
                            <IconButton size="small" >
                                <MoreVertIcon className='' />
                            </IconButton>
                        </div>

                        <Nav_options_popover
                            anchorEl={anchorEl}
                            close={() => setAnchorEl(null)}
                        />

                    </div>
                </div>
            </div>
        </Fade>
    )
}

export default Navbar