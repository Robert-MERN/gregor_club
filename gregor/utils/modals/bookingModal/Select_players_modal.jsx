import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import { useRouter } from 'next/router';
import useStateContext from '@/context/ContextProvider';
import Players_booking_content_1 from './Players_booking_content_1';
import Players_booking_content_2 from './Players_booking_content_2';


const Select_players_modal = ({ open, close }) => {
    const {
        cookieUser,
        selected_players,
        set_selected_players,
        players_slots,
        set_booked_events,
        booking_date,
        bay_field,
        handle_create_booking,
        handle_get_guests_fees,
    } = useStateContext();



    const [booking_modal, set_booking_modal] = useState("players_booking");



    const handleClose = () => {
        close("select_players_modal");
        set_booking_modal("players_booking");
        set_selected_players(null);
    };

    const handle_next_button = async (last, event) => {
        if (!last) {
            set_booking_modal("duration_booking");
        } else {
            set_booking_modal("players_booking");
            close("select_players_modal");
            set_selected_players(null);

            await handle_create_booking(event);
            // set_booked_events(prev => ([...prev, event]))
        }
    }
    const [selected_range_hour, set_selected_range_hour] = useState({ title: "fee_1_hour", button: "1 Hour" })


    return (

        <Dialog
            open={open.select_players_modal}
            onClose={handleClose}
            className='overflow-hidden'
        >
            {booking_modal !== "duration_booking" ?


                <Players_booking_content_1
                    selected_players={selected_players}
                    set_selected_players={set_selected_players}
                    handleClose={handleClose}
                    players_slots={players_slots}
                    handle_get_guests_fees={handle_get_guests_fees}
                    handle_next_button={handle_next_button}
                    selected_range_hour={selected_range_hour}
                    set_selected_range_hour={set_selected_range_hour}
                />
                :
                <Players_booking_content_2
                    selected_players={selected_players}
                    handleClose={handleClose}
                    handle_next_button={handle_next_button}
                    booking_date={booking_date}
                    set_booking_modal={set_booking_modal}
                    bay_field={bay_field}
                    userId={cookieUser.id}
                    username={cookieUser.name}
                    selected_range_hour={selected_range_hour}
                />
            }
        </Dialog >
    )
}

export default Select_players_modal;
