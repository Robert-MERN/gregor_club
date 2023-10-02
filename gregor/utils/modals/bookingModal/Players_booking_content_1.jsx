import React, { useEffect, useState } from 'react'
import style from "@/styles/Home.module.css"
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { Fade } from 'react-reveal';


const Players_booking_content_1 = ({
    selected_players,
    set_selected_players,
    handleClose,
    handle_next_button,
    players_slots,
    handle_get_guests_fees,
    selected_range_hour, set_selected_range_hour,
}) => {
    const handle_select_players = (params) => {
        set_selected_players(params);
        const element = document.getElementById("scroll_to_bottom")
        element && element.scrollIntoView({ behavior: "smooth" })
    }

    const range_hour = [
        { title: "fee_1_hour", button: "1 Hour" },
        { title: "fee_2_hour", button: "2 Hours" },
        { title: "fee_4_hour", button: "4 Hours" },
    ]


    const handle_change = (item) => () => {
        set_selected_range_hour(item);
        handle_get_guests_fees(null, item.title);
    }

    useEffect(() => {
        handle_get_guests_fees(null, selected_range_hour.title);
    }, [])


    return (
        <Fade left duration={300}>
            <div className={`h-[70vh] md:w-[500px] md:h-[450px] p-5 md:p-7 pt-8 md:pt-12 pb-6 relative flex flex-col gap-4 md:gap-10 justify-between overflow-x-hidden ${style.scrollBar}`} >
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
                        Select Players
                    </p>

                    <div className='w-full flex items-center mt-3 md:mt-4 gap-4' >
                        {range_hour.map((item, index) => (
                            <button
                                index={index}
                                onClick={handle_change(item)}
                                className={`w-full py-[8px] hover:opacity-75 md:text-[14px] text-[11px] rounded-md ${item.title === selected_range_hour.title ? "bg-violet-500 text-white" : "bg-stone-300 text-stone-600"} transition-all select-none`}
                            >
                                {item.button}
                            </button>
                        ))
                        }

                    </div>
                    <div className="flex flex-col w-full mt-4 md:mt-6 gap-2 md:gap-4">
                        {players_slots && players_slots.fees_structure.map((slots, index) => (
                            <React.Fragment key={index}>
                                <label htmlFor="" className='text-[12px] md:text-[14px] text-stone-500 font-semibold mb-2'>
                                    {slots.label}
                                </label>

                                <div className="flex flex-col w-full gap-4">
                                    {slots.slots.map((slot, i) => (
                                        < button key={i} onClick={() => handle_select_players(slot)} className={`py-[10px] text-[12px] md:text-[14px] hover:bg-blue-400 hover:text-white w-full rounded-md select-none flex gap-3 px-4 items-center text-center justify-center ${selected_players ? (selected_players.button_label === slot.button_label ? "bg-blue-500 text-white" : "bg-stone-300 text-stone-700") : "bg-stone-300 text-stone-700"}`} >
                                            {slot.button_label} {slot.fee && <span className={`font-semibold`}>${slot.fee}</span>}
                                        </button>
                                    ))
                                    }
                                </div >
                            </React.Fragment>
                        ))}

                        < label htmlFor="" className='text-[11px] md:text-[13px] text-stone-500 md:mt-6 mt-4' > Please note that additional fees for guests will apply, determined by the chosen session duration </label>

                    </div>
                </div>

                <div id="scroll_to_bottom" className='w-full flex justify-end' >
                    <div className='flex gap-6 items-center' >


                        <button type="button"
                            onClick={handleClose}
                            className='bg-red-500 hover:bg-red-400 px-4 py-[6px] rounded-md text-white text-[12px] md:text-[15px]' >
                            Cancel
                        </button>
                        <button
                            disabled={!selected_players}
                            onClick={() => handle_next_button(false)} className={`px-4 py-[6px] rounded-md text-white text-[12px] md:text-[15px] ${selected_players ? "bg-blue-500 hover:opacity-75" : "bg-stone-300"}`} >Next</button>
                    </div>
                </div>
            </div>
        </Fade>

    )
}

export default Players_booking_content_1