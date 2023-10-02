import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import useStateContext from '@/context/ContextProvider';
import CloseIcon from '@mui/icons-material/Close';
import styles from "@/styles/Home.module.css";
import { IconButton, FormControl, Select, FormHelperText, MenuItem } from '@mui/material';

const Select_players_modal = ({ open, close }) => {
    const {
        cookieUser,
        handle_update_guests_fees,
        handle_get_guests_fees,
        fees_structure,
        set_fees_structure
    } = useStateContext();

    useEffect(() => {
        if (cookieUser) if (cookieUser.isAdmin) handle_get_guests_fees(cookieUser.id)
    }, [cookieUser])


    const handleClose = () => {
        close("add_edit_guests_fees_modal");
    };




    // Create a function to update the fee for a specific slot
    const updateFee = (e) => {
        const { id, name, value } = e.target;

        const fees_structure_working = [...fees_structure.fees_structure];
        const index = fees_structure.findIndex(item => item.title === id);
        const item = fees_structure.find(item => item.title === id);
        fees_structure_working.splice(index, 1, { ...item, [name]: value })
        set_fees_structure(prev => ({ ...prev, fees_structure: fees_structure_working }));

    };


    const handle_submit = async (e) => {
        e.preventDefault();
        close("add_edit_guests_fees_modal");
        if (cookieUser) {
            try {

                await handle_update_guests_fees(cookieUser.id, fees_structure, "create");
            } catch (err) {
                console.log(err);
            }
        }
        handleClose()

    }

    return (

        <Dialog
            open={open.add_edit_guests_fees_modal}
            onClose={handleClose}
        >
            <form
                onSubmit={handle_submit}
                className={`h-[70vh] md:w-[500px] md:h-[450px] p-5 md:p-7 pt-8 md:pt-12 pb-6 relative flex flex-col gap-4 md:gap-10 justify-between overflow-x-hidden ${styles.scrollBar}`} >
                <div
                    onClick={handleClose}
                    className='absolute right-3 top-2 cursor-pointer select-none'
                >
                    <IconButton >
                        <CloseIcon className='scale-[.9] md:scale-[1.1] text-stone-500' />
                    </IconButton>
                </div>
                <div>
                    <p className='text-[15px] md:text-[17px] text-stone-600 font-bold' >
                        Add/Edit Guests's Fees
                    </p>
                    <div className="flex flex-col w-full mt-4 md:mt-6 gap-2 md:gap-4">


                        {/* Fee for 4-hour session */}
                        {fees_structure.fees_structure.map((each, index) => (

                            <React.Fragment key={index}>
                                <label htmlFor="" className={`text-[12px] md:text-[14px] text-stone-500 font-semibold ${each.title === "fee_1_hour" ? "" : "mt-2"}`}>
                                    {each.title === "fee_1_hour" ?
                                        "Fee for 1-hour range session"
                                        :
                                        each.title === "fee_2_hour"
                                            ?
                                            "Fee for 2-hour session"
                                            :
                                            "Fee for 4-hour session"
                                    }
                                </label>
                                <div className="flex flex-col w-full gap-4">
                                    <div className='flex gap-2' >
                                        < button className={`py-[10px] text-[12px] md:text-[14px] w-full rounded-md select-none flex gap-3 px-4 items-center text-center justify-center bg-stone-300 text-stone-700`}>
                                            Guest-1
                                        </button>
                                        <TextField
                                            variant='outlined'
                                            type="number"
                                            size='small'
                                            name="guest_1"
                                            id={each.title}
                                            value={each.guest_1}
                                            onChange={updateFee}
                                            className='w-[100px]'
                                        />
                                    </div>
                                </div >
                                {each.title !== "fee_1_hour" &&
                                    <>
                                        <div className="flex flex-col w-full gap-4">
                                            <div className='flex gap-2' >
                                                < button className={`py-[10px] text-[12px] md:text-[14px] w-full rounded-md select-none flex gap-3 px-4 items-center text-center justify-center bg-stone-300 text-stone-700`}>
                                                    Guest-2
                                                </button>
                                                <TextField
                                                    variant='outlined'
                                                    type="number"
                                                    size='small'
                                                    name="guest_2"
                                                    id={each.title}
                                                    value={each.guest_2}
                                                    onChange={updateFee}
                                                    className='w-[100px]'
                                                />
                                            </div>
                                        </div >
                                        <div className="flex flex-col w-full gap-4">
                                            <div className='flex gap-2' >
                                                < button className={`py-[10px] text-[12px] md:text-[14px] w-full rounded-md select-none flex gap-3 px-4 items-center text-center justify-center bg-stone-300 text-stone-700`}>
                                                    Guest-3
                                                </button>
                                                <TextField
                                                    variant='outlined'
                                                    type="number"
                                                    size='small'
                                                    name="guest_3"
                                                    id={each.title}
                                                    value={each.guest_3}
                                                    onChange={updateFee}
                                                    className='w-[100px]'
                                                />
                                            </div>
                                        </div >
                                        <div className="flex flex-col w-full gap-4">
                                            <div className='flex gap-2' >
                                                < button className={`py-[10px] text-[12px] md:text-[14px] w-full rounded-md select-none flex gap-3 px-4 items-center text-center justify-center bg-stone-300 text-stone-700`}>
                                                    Guest-4
                                                </button>
                                                <TextField
                                                    variant='outlined'
                                                    type="number"
                                                    size='small'
                                                    id={each.title}
                                                    name="guest_4"
                                                    value={each.guest_4}
                                                    onChange={updateFee}
                                                    className='w-[100px]'
                                                />
                                            </div>
                                        </div >
                                    </>
                                }

                            </React.Fragment>
                        ))
                        }






                        {/* Note */}
                        < label htmlFor="" className='text-[11px] md:text-[13px] text-stone-500 md:mt-6 mt-4' > Please carefully set the fee to ensure accurate pricing and prevent any potential losses.</label>

                    </div>
                </div>

                <div id="scroll_to_bottom" className='w-full flex justify-end' >
                    <div className='flex gap-6 items-center' >


                        <button
                            type="button"
                            onClick={handleClose}
                            className='bg-red-500 hover:bg-red-400 px-4 py-[6px] rounded-md text-white text-[12px] md:text-[15px]' >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-[6px] rounded-md text-white text-[12px] md:text-[15px] bg-blue-500 hover:opacity-75`} >Confirm</button>
                    </div>
                </div>
            </form>
        </Dialog >
    )
}

export default Select_players_modal;
