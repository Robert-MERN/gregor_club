import Image from 'next/image'
import React from 'react'
import Fade from "react-reveal/Fade";
import Signup_form from '../Signup_form';
import useStateContext from '@/context/ContextProvider';
import { getCookie } from 'cookies-next';
import Signup_email_auth from '../Signup_email_auth';
import style from "@/styles/Home.module.css";
import full_logo from "@/public/images/full_logo.png"





const Signup = ({ CJS_KEY }) => {

    const { signupUser, landing_page_form, handle_landing_page_form } = useStateContext();
    const signupUserInfo = getCookie("signupUser") ? JSON.parse(getCookie("signupUser")) : signupUser



    return (
        <div className='w-screen h-screen' >

            <Fade duration={500} >
                <div className={`w-screen h-screen  overflow-y-auto ${style.scrollBar} px-[20px]`} >

                    <div className='flex h-full md:pt-[65px]' >
                        <Fade duration={500} >
                            <div className='flex-1 grid place-items-center'>
                                {signupUserInfo ?
                                    <Signup_email_auth CJS_KEY={CJS_KEY} />
                                    :
                                    <Signup_form handlePage={handle_landing_page_form} CJS_KEY={CJS_KEY} />
                                }

                            </div>
                            <div className='flex-1 place-items-center bg-slate-100 lg:grid hidden' >
                                <div className='w-[320px] h-[320px] relative p-2' >
                                    <Image className='object-contain w-full h-full' alt="logo_image" src={full_logo} />
                                </div>
                            </div>
                        </Fade>
                    </div>

                </div >
            </Fade>
        </div >
    )
}

export default Signup