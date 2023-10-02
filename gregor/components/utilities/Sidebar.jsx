import React from 'react'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import styles from "@/styles/Home.module.css"
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import useStateContext from '@/context/ContextProvider';
import BallotIcon from '@mui/icons-material/Ballot';
import Fade from "react-reveal/Fade";
import Image from "next/image";
import { useRouter } from 'next/router';
import text_logo from "@/public/images/text_logo.png"


const Sidebar = () => {
    const { openSidebar, switchSidebarTabs, sidebarTabs, openModal, cookieUser } = useStateContext();

    const options_admin = [
        {
            title: "Dashboard",
            navLinks: [
                {
                    name: "Book Your Golfing Bay",
                    link: "/home",
                    icon: <SportsGolfIcon />
                },
                {
                    name: "See Your Booking(s)",
                    link: "/home/my-bookings",
                    icon: <GolfCourseIcon />
                },
                {
                    name: "Golfing Bays - Admin",
                    link: "/admin/golfing-bays-bookings-admin",
                    icon: <DeliveryDiningIcon />
                },
                {
                    name: "All Bookings - Admin",
                    link: "/admin/all-bookings",
                    icon: <BallotIcon />
                },
            ]

        },
        {
            title: "Support",
            navLinks: [
                {
                    name: "Become A Member",
                    link: "/subscription",
                    icon: <CardMembershipIcon />
                },
                {
                    name: "Contact Us",
                    link: "/contact-us",
                    icon: <SupportAgentIcon />
                },
            ]

        },
        {
            title: "Profile",
            navLinks: [
                {
                    name: "Edit Profile",
                    link: "/edit-profile",
                    icon: <ManageAccountsIcon />
                },
            ]

        },
    ]
    const options = [
        {
            title: "Dashboard",
            navLinks: [
                {
                    name: "Book Your Golfing Bay",
                    link: "/home",
                    icon: <SportsGolfIcon />
                },
                {
                    name: "See Your Booking(s)",
                    link: "/home/my-bookings",
                    icon: <GolfCourseIcon />
                },
            ]

        },
        {
            title: "Support",
            navLinks: [
                {
                    name: "Become A Member",
                    link: "/subscription",
                    icon: <CardMembershipIcon />
                },
                {
                    name: "Contact Us",
                    link: "/contact-us",
                    icon: <SupportAgentIcon />
                },
            ]

        },
        {
            title: "Profile",
            navLinks: [
                {
                    name: "Edit Profile",
                    link: "/edit-profile",
                    icon: <ManageAccountsIcon />
                },
            ]

        },
    ]
    const router = useRouter();
    const navigate_to = (location) => {
        router.push(location)
    }
    const page_url = router.asPath
    return (
        <>
            <Fade left duration={300} >
                <div className={`xl:flex-[1.5] 2xl:flex-[1] bg-white h-screen overflow-y-auto top-0 bottom-0 px-[20px] pb-[20px] shadow-2xl transition-all duration-300 delay-400 lg:block hidden  ${openSidebar ? "translate-x-0 " : "-translate-x-full "} ${styles.scrollBar}`} >
                    <div className={` flex items-center gap-4 select-none`}>

                        <Image className='select-none' alt="logo_image" src={text_logo} />

                    </div>
                    {cookieUser &&
                        cookieUser.isAdmin ?
                        (
                            options_admin.map((each, index) => (
                                <React.Fragment key={index}>
                                    <p className='text-[16px] text-slate-400 my-3 uppercase'>{each.title}</p>
                                    {each.navLinks.map((i, index) => (
                                        <button
                                            onClick={() => { switchSidebarTabs(i.name); navigate_to(i.link) }}
                                            key={index}
                                            className={`whitespace-nowrap py-[10px] text-[14px] hover:bg-violet-500 hover:text-white w-full rounded-md select-none my-3 flex gap-3 px-4 items-center transition-all ${page_url === i.link ? "text-white bg-blue-500" : "text-slate-500"}`}
                                        >
                                            {i.icon}
                                            {i.name}
                                        </button>
                                    ))}
                                </React.Fragment>
                            ))
                        )
                        :
                        (
                            options.map((each, index) => (
                                <React.Fragment key={index}>
                                    <p className='text-[16px] text-slate-400 my-3 uppercase'>{each.title}</p>
                                    {each.navLinks.map((i, index) => (
                                        <button
                                            onClick={() => { switchSidebarTabs(i.name); navigate_to(i.link) }}
                                            key={index}
                                            className={`whitespace-nowrap py-[10px] text-[14px] hover:bg-violet-500 hover:text-white w-full rounded-md select-none my-3 flex gap-3 px-4 items-center transition-all ${page_url === i.link ? "text-white bg-blue-500" : "text-slate-500"}`}
                                        >
                                            {i.icon}
                                            {i.name}
                                        </button>
                                    ))}
                                </React.Fragment>
                            ))
                        )
                    }




                    <button onClick={() => openModal("logout_modal")} className={`py-[10px] text-[14px] hover:bg-indigo-500 hover:text-white w-full rounded-md select-none my-3 flex gap-3 px-4 items-center transition-all text-slate-500`} >
                        <LogoutIcon className='scale-[.8]' />
                        Logout
                    </button>

                </div>
            </Fade>
        </>

    )
}

export default Sidebar