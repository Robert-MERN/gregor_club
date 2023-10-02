import React from 'react'
import Link from "next/link"
import useStateContext from "@/context/ContextProvider";
import CookieConsent from "react-cookie-consent";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Select_players_modal from '@/utils/modals/bookingModal/Select_players_modal';
import Logout_modal from '@/utils/Logout_modal';
import Subscription_status_modal from '@/utils/modals/Subscription_status_modal';
import Add_edit_guests_fees_modal from "@/utils/modals/Add_edit_guests_fees_modal"
import Restrict_hours_modal from "@/utils/modals/Restrict_hours_modal"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Slide } from '@mui/material';
import Delete_booking_modal from '@/utils/modals/Delete_booking_modal';



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
}



const Layout = ({ children }) => {

    const { modals, closeModal, APIloading, cookieUser, snackbar_alert, set_snackbar_alert } = useStateContext();

    const handleClose = () => {
        set_snackbar_alert(prev => ({ ...prev, open: false }));
    };



    return (
        <div className='relative' >
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999 }}
                open={APIloading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Select_players_modal open={modals} close={closeModal} />
            <Logout_modal open={modals} close={() => closeModal("logout_modal")} />
            <Delete_booking_modal open={modals} close={() => closeModal("delete_booking_modal")}  />
            <Subscription_status_modal open={modals} close={() => closeModal("subscription_status_modal")} />
            <Restrict_hours_modal open={modals} close={() => closeModal("restrict_hours_modal")} />
            <Add_edit_guests_fees_modal open={modals} close={() => closeModal("add_edit_guests_fees_modal")} />
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                TransitionComponent={TransitionDown}
                key={TransitionDown ? TransitionDown.name : ''}
                open={snackbar_alert.open}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity={"warning"} sx={{ width: '100%' }}>
                    {snackbar_alert.message}
                </Alert>
            </Snackbar>

            {children}
            <CookieConsent
                declineButtonText="Cancel"
                enableDeclineButton={true}
                flipButtons
                // disableStyles={true}
                declineButtonClasses="text-stone-500 font-semibold hover:underline text-[14px] pr-4 py-2 rounded-full"
                buttonClasses="text-white bg-blue-600 w-[150px] py-2 rounded-full text-[13px] font-bold hover:bg-blue-500"
                // containerClasses={`${style.cookieBannerAnime} flex flex-col md:flex-row gap-8 items-end p-6 shadow-md border-t border-gray-300 bg-white fixed w-screen items-center md:justify-center justify-between`}
                // buttonWrapperClasses="flex items-center gap-4"
                contentClasses="text-gray-600 text-[14px]"
                expires={365}
                location="bottom"
            >
                We respect your personal privacy. <Link href="/terms-conditions" className='text-blue-600 font-bold underline' >Learn more.</Link>
            </CookieConsent>
        </div>
    )
}

export default Layout