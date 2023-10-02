import useStateContext from "@/context/ContextProvider";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

function Subscription() {
    const { openSidebar } = useStateContext();
    return (
        <div className={`w-full h-[calc(100vh-60px)] flex flex-col items-center  px-[20px]  ${openSidebar ? "lg:px-[80px]" : "lg:px-[120px]"} overflow-y-auto bg-white pt-24 lg:pt-6 transition-all duration-300 ${styles.scrollBar}`} >

            <h1 className="text-stone-600 text-[20px] lg:text-[28px] font-medium text-center mb-1 lg:w-[750px] transition-all" >Join the Greens: Become a Proud Member Today!</h1>
            <p className='text-[13px] lg:text-[15px] text-stone-500 lg:w-[750px] text-center mt-3 transition-all' >Welcome to the Gregor Golfing Club, where your golfing dreams come to life! We invite you to become a part of our exclusive golfing family. Our club is not just about playing golf; it's about forging lasting connections, honing your skills, and basking in the joy of the game.</p>

            <div className="w-full mt-16 px-[20px]">

                <h2 className='font-bold text-zinc-800 mt-3' >Why Choose Gregor Golfing Club?</h2>
                <ol className='list-outside list-disc mb-4' >
                    <li className='text-[13px] text-zinc-600 font-medium py-2' >
                        🏌️‍♂️ Exceptional Courses: Immerse yourself in the natural beauty of our meticulously designed golf courses, offering challenges for every level of golfer.
                    </li>
                    <li className='text-[13px] text-zinc-600 font-medium py-2' >
                        🤝 Community Spirit: Join a community of passionate golfers who share your enthusiasm for the sport, making memories both on and off the fairways.
                    </li>
                    <li className='text-[13px] text-zinc-600 font-medium py-2' >
                        🌟 Exclusive Events: Gain access to a calendar filled with exclusive member-only tournaments, events, and social gatherings.
                    </li>
                    <li className='text-[13px] text-zinc-600 font-medium py-2' >
                        ⛳ Expert Instruction: Elevate your game with top-notch coaching from our experienced golf professionals.
                    </li>
                    <li className='text-[13px] text-zinc-600 font-medium py-2' >
                        🍽️ Fine Dining: Enjoy exquisite dining experiences at our club's restaurants, where you can savor delectable meals in a relaxing atmosphere.
                    </li>

                </ol>
            </div>

            <h1 className="text-stone-600 text-[18px] lg:text-[22px] font-semibold text-center mb-1 lg:w-[650px] mt-12" >Become a Member and Swing into Excellence!</h1>
            <p className='text-[12px] lg:text-[14px] text-stone-500 lg:w-[650px] text-center' >Your golfing adventure begins here. Click the button below to explore our membership options and start enjoying the greens like never before.</p>

            <Link  className="w-full flex justify-center" href="https://buy.stripe.com/test_eVaaHi2WJdcGdgY9AA" target="__blank" >
                <button className='w-full lg:w-[700px] my-6 py-[12px] rounded-md bg-blue-500 hover:bg-violet-500 active:bg-violet-400 transition-all text-white font-medium text-[16px]' >
                    Join Now
                </button>
            </Link>


            <p className='text-[11px] lg:text-[13px] text-stone-500 lg:w-[650px] text-center my-6' >At Gregor Golfing Club, we're not just golfers; we're a community of individuals passionate about the sport. We look forward to welcoming you with open arms and helping you create golfing memories that last a lifetime. Come, be a part of something extraordinary!</p>
        </div>
    );
}

export default Subscription;
