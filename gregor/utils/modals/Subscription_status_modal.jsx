import React from 'react'
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { deleteCookie, setCookie } from "cookies-next"
import { useRouter } from 'next/router';


const Subscription_status_modal = ({ open, close, subscription_status, restrictedEvent, cookieUser }) => {
    const router = useRouter();
    const handleClick = () => {
        close("subscription_status_modal");
        const expiryDate = new Date(new Date().setHours(new Date().getHours() + 2));
        deleteCookie("booking_type");
        setCookie("eventDetails1", {

        }, { expires: expiryDate })
        router.push(`/become-member`);
    }

    return (
        <Dialog
            open={open.subscription_status_modal}
            onClose={() => close("subscription_status_modal")}
        >
            <div className='w-[500px] p-7 relative flex flex-col gap-8' >
                <div onClick={() => close("subscription_status_modal")} className='absolute right-3 top-2 cursor-pointer select-none' >
                    <IconButton >
                        <CloseIcon className='scale-[1.1] text-stone-500' />
                    </IconButton>
                </div>
                <p className='text-[16px] text-stone-600 font-medium mt-4' >
                    You're not a member yet! Join the GPC club and secure your spot at Gregor for some awesome fun with friends or solo play. Just click 'Become a Member'!

                </p>
                <div className='w-full flex justify-end gap-4' >
                    <button onClick={() => close("logout")} className='text-[15px] text-stone-600 px-4 py-[6px] rounded-md hover:bg-stone-300 transition-all' >Cancel</button>
                    <button onClick={handleClick} className='bg-blue-500 hover:opacity-75 px-4 py-[6px] rounded-md text-white text-[15px] transition-all' >

                        Become a member

                    </button>
                </div>
            </div>
        </Dialog>
    )
}

export default Subscription_status_modal