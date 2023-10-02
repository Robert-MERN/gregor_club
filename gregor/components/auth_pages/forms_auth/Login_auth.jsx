import Image from 'next/image'
import React from 'react'
import Fade from "react-reveal/Fade";
import Login from '../Login';
import useStateContext from '@/context/ContextProvider';
import style from "@/styles/Home.module.css";
import full_logo from "@/public/images/full_logo.png"





const Login_auth = () => {

    const { signupUser, landing_page_form, handle_landing_page_form } = useStateContext();


    return (
        <div className='w-screen h-screen' >

            <Fade duration={500} >
                <div className={`w-screen h-screen  overflow-y-auto ${style.scrollBar} px-[20px]`} >

                    <Fade duration={500} >

                        <div className='flex h-full' >
                            <div className='flex-1 grid lg:place-items-center mt-[100px]'>
                                <Login handlePage={handle_landing_page_form} />
                            </div>
                            <div className='flex-1 place-items-center bg-slate-100 lg:grid hidden' >
                                <div className='w-[320px] h-[320px] relative p-2' >
                                    <Image className='object-contain w-full h-full' alt="logo_image" src={full_logo} />
                                </div>
                            </div>
                        </div>
                    </Fade>

                </div >
            </Fade>
        </div >
    )
}

export default Login_auth