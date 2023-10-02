import React from 'react'
import useStateContext from '@/context/ContextProvider';
import App_navbar from './utilities/App_navbar'
import Golfing_bays_bookings from './booking_pages/Golfing_bays_bookings';
import Navbar from './utilities/Navbar';
import Contact_us from './website/Contact_us';
import Edit_profile from './website/Edit_profile';
import My_bookings from './booking_pages/My_bookings';
import Subscription from './website/Subscription';
import About from './website/About';
import styles from "@/styles/Home.module.css";
import Golfing_bays_bookings_admin from "./admin_pages/Golfing_bays_bookings_admin";
import All_bookings from './admin_pages/All_bookings';

const HomePage = ({ page, user }) => {
    const { sidebarTabs, } = useStateContext();
    return (
        <div className={`flex-[7] bg-white transition-all h-screen ${styles.scrollBar}`} >
            {user ?

                <App_navbar />
                :
                <Navbar />
            }
            {page === "golfing_bays_bookings" ?
                <Golfing_bays_bookings />
                : page === "edit_profile" ?
                    <Edit_profile />
                    : page === "contact_us" ?
                        <Contact_us user={user} />
                        : page === "about" ?
                            <About user={user} />
                            : page === "my_bookings" ?
                                <My_bookings />
                                : page === "subscription" ?
                                    <Subscription />
                                    : page === "golfing_bays_bookings_admin" ? <Golfing_bays_bookings_admin />
                                        :
                                        <All_bookings />
            }
        </div>
    )
}

export default HomePage