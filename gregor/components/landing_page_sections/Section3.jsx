import React from 'react'
import Image from "next/image";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import section3Theme from "../../public/images/golf3.jpg"
import Fade from "react-reveal/Fade";
import Link from 'next/link';



const Section3 = () => {
    return (
        <div className='flex justify-center mb-20 lg:mb-40' >

            <div className='flex flex-col items-center lg:w-[1200px] w-full' >

                <div className='flex flex-col lg:flex-row-reverse w-full' >


                    <div className='flex-1  lg:pl-20 flex flex-col justify-center'>
                        <Fade top long >
                            <div className='mb-6 lg:mb-8' >
                                <h1 className={`text-stone-800 text-[26px] md:text-[34px] lg:text-[36px]  leading-tight font-bold whitespace-normal text-center lg:text-left`} >
                                    Discover Your Ultimate Golfing Oasis at GPC
                                </h1>
                            </div>
                        </Fade>

                        <Fade right delay={300}>
                            <p className={`text-gray-500 text-[16px] md:text-[18px] lg:text-[20px] leading-tight text-center lg:text-left mb-5 lg:mb-10`}>
                                At GPC, we provide the most accurate and immersive experience you'll find off the course.
                                <br />
                                <br />
                                Our private member facility is similar in stature to premier country clubs, yet intimate, defying the less traditional nature often encountered at indoor golf clubs.
                            </p>
                        </Fade>

                        <Fade bottom long delay={200}>
                            <div className='w-full flex justify-center lg:justify-start' >
                                <Link href="/about" >
                                    <button className='flex items-center gap-2 text-violet-700 rounded-full text-[18px] lg:text-[20px] hover:text-stone-800 transition-all duration-300' >
                                        Learn more
                                        <ArrowForwardIcon />
                                    </button>
                                </Link>
                            </div>
                        </Fade>

                    </div>

                    <Fade left delay={250}>
                        <div className='flex-1 mt-16 lg:mt-0 p-0 md:p-12 lg:p-0' >
                            <Image
                                alt='illustration3'
                                src={section3Theme}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </Fade>

                </div>
            </div>

        </div>
    )
}

export default Section3