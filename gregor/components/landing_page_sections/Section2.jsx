import React from 'react'
import Image from "next/image";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import section2Theme from "../../public/images/golf2.jpg"
import Fade from "react-reveal/Fade";
import Link from 'next/link';

const Section2 = () => {
    return (
        <div className='flex justify-center mb-20 lg:mb-40' >
            <div className='lg:w-[1200px] w-full flex flex-col items-center' >
                <Fade right>
                    <h1 className={`w-full lg:w-[700px] text-stone-800 text-[28px] md:text-[34px] lg:text-[44px] leading-tight lg:leading-[60px] font-bold whitespace-normal text-center mb-12`} >
                        Enjoy Your Round, Year Round
                    </h1>
                </Fade>
                <div className='flex flex-col lg:flex-row w-full' >
                    <div className='flex-1 lg:pr-20 flex flex-col justify-center items-start'>
                        <Fade left >

                            <div className='mb-6 lg:mb-8 w-full' >

                                <h1 className={`text-stone-800 text-[26px] md:text-[34px] lg:text-[36px]  leading-tight font-bold whitespace-normal text-center lg:text-left`} >
                                    Fulfilling Your Golfing Dreams at The Gregor
                                </h1>
                            </div>
                        </Fade>
                        <Fade left delay={150} >
                            <p className={`text-gray-500 text-[16px] md:text-[18px] lg:text-[20px] leading-tight text-center lg:text-left mb-5 lg:mb-10`}>
                                The Gregor is a private luxury indoor golf club where members come to socialize, entertain, and play golf.  Members enjoy premium furnishings, sophisticated modern design, access to the club 24/7, member golf leagues, and an overall environment dedicated to passionate supporters of Golf.
                            </p>
                        </Fade>

                        <Fade top delay={50} >
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

                    <Fade right delay={250}>
                        <div className='flex-1 lg:pl-12 mt-14 lg:mt-0 p-0 md:p-12 lg:p-0' >
                            <Image
                                alt='illustration2'
                                src={section2Theme}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </Fade>

                </div>
            </div>

        </div>
    )
}

export default Section2