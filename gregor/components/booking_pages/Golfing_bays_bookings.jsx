import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from "@/styles/Home.module.css";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import useStateContext from '@/context/ContextProvider';

const Golfing_bays_bookings = () => {

    const { openModal, booked_events, booking_date, set_booking_date, bay_field, set_bay_field, handle_get_all_bookings, cookieUser } = useStateContext()

    const handle_bay_select = (param) => () => {
        set_bay_field(param);
        if (cookieUser) {
            handle_get_all_bookings(cookieUser.id, param, booking_date);
        }
    }

    const calendarRef = useRef(null);

    // Define player categories (resources)
    const resources = [
        { id: 'player-1', title: '1 Player' },
        { id: 'player-2', title: '2 Players' },
        { id: 'player-3', title: '3 Players' },
        { id: 'player-4', title: '4 Players' },
    ];



    const currentDate = new Date();
    const maxDate = new Date(currentDate);
    maxDate.setMonth(maxDate.getMonth() + 2);

    // Function to create a date  with the time set to midnight (00:00:00)
    const getDateWithoutTime = (date) => {
        const newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0);
        return newDate;
    };

    const handleDateChange = (date) => {
        set_booking_date(date);
        // Use the FullCalendar API to change the displayed date
        if (calendarRef.current) {
            calendarRef.current.getApi().gotoDate(date);
        }
        if (cookieUser) {
            handle_get_all_bookings(cookieUser?.id, bay_field, date);
        }
    };

    const handleNextClick = () => {
        // Calculate the next date
        const nextDate = new Date(booking_date);
        nextDate.setDate(nextDate.getDate() + 1);

        // Create date objects with time set to midnight
        const nextDateWithoutTime = getDateWithoutTime(nextDate);
        const maxDateWithoutTime = getDateWithoutTime(maxDate);

        // Check if the next date is within the allowed range
        if (nextDateWithoutTime <= maxDateWithoutTime) {
            // Use the FullCalendar API to navigate to the next date
            if (calendarRef.current) {
                calendarRef.current.getApi().next();
            }

            // Update the selected date in the DatePicker
            set_booking_date(nextDate);
            if (cookieUser) {
                handle_get_all_bookings(cookieUser?.id, bay_field, nextDate);
            }
        }
    };

    const handlePrevClick = () => {
        // Calculate the previous date
        const prevDate = new Date(booking_date);
        prevDate.setDate(prevDate.getDate() - 1);

        // Create date objects with time set to midnight
        const prevDateWithoutTime = getDateWithoutTime(prevDate);
        const currentDateWithoutTime = getDateWithoutTime(currentDate);

        // Compare prevDate with currentDate
        if (prevDateWithoutTime <= currentDateWithoutTime) {
            // If prevDate is before or equal to currentDate, set it to currentDate

            set_booking_date(currentDate);
            if (cookieUser) {
                handle_get_all_bookings(cookieUser?.id, bay_field, currentDate);
            };
            if (calendarRef.current) {
                calendarRef.current.getApi().gotoDate(currentDate);
            }
        } else {
            // Check if the previous date is still within the allowed range
            if (prevDateWithoutTime >= currentDateWithoutTime) {
                // Use the FullCalendar API to navigate to the previous date
                if (calendarRef.current) {
                    calendarRef.current.getApi().prev();
                }
                // Update the selected date in the DatePicker
                set_booking_date(prevDate);
                if (cookieUser) {
                    handle_get_all_bookings(cookieUser?.id, bay_field, prevDate);
                }
            }
        }
    };




    // styling for Calendar 
    useEffect(() => {
        const license = document.querySelector(".fc-license-message")
        if (license) license.style.display = "none";


        const slotElements = document.querySelectorAll('.fc-timegrid-slots td');
        if (slotElements) {
            slotElements.forEach((slotElement) => {
                slotElement.style.padding = '3px 8px 3px 8px';
            });
        }

        const resourceLabelElements = document.querySelectorAll('.fc-col-header-cell');
        if (resourceLabelElements) {
            resourceLabelElements.forEach((resourceLabelElement) => {
                resourceLabelElement.style.padding = '6px 0px';
            });
        }

    }, []);

    useEffect(() => {
        if (cookieUser) {
            handle_get_all_bookings(cookieUser?.id, bay_field, booking_date);
        }
    }, [cookieUser]);


    return (
        <div className={`h-[calc(100vh-60px)] overflow-y-scroll px-[30px] relative pt-[30px] pb-[120px] ${styles.scrollBar}`} >

            <div className='w-full rounded-t-md border flex items-center mb-2 md:mb-4 overflow-hidden'>
                <button
                    onClick={handle_bay_select("bay-1")}
                    className={`flex-1 border-r hover:opacity-75 border-stone-200 py-[10px] md:text-[14px] text-[12px] font-semibold w-full ${bay_field === "bay-1" ? "bg-blue-500 text-white" : "bg-stone-300 text-stone-600"} transition-all`}
                >
                    Bay-1
                </button>
                <button
                    onClick={handle_bay_select("bay-2")}
                    className={`flex-1 py-[10px] hover:opacity-75 md:text-[14px] text-[12px]  font-semibold w-full ${bay_field === "bay-2" ? "bg-blue-500 text-white" : "bg-stone-300 text-stone-600"} transition-all select-none`}
                >
                    Bay-2
                </button>

            </div>


            <div className=' bg-white relative z-10 w-full flex justify-between items-center' >
                <DatePicker
                    selected={booking_date}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    minDate={currentDate}
                    maxDate={maxDate}
                    className='text-[28px] cursor-pointer outline-none text-stone-600 font-semibold transition-all '
                />
                <div className='flex gap-4'>
                    <button
                        className={`px-[15px] py-[6px]  text-white text-[20px] font-semibold rounded-md  grid place-items-center transition-all ${getDateWithoutTime(booking_date) <= getDateWithoutTime(currentDate) ? "bg-stone-300" : "bg-stone-500 active:opacity-60 hover:opacity-75"}`}
                        disabled={getDateWithoutTime(booking_date) <= getDateWithoutTime(currentDate)}
                        onClick={handlePrevClick} // Handle previous button click
                    >
                        <NavigateBeforeIcon />
                    </button>
                    <button
                        className={`px-[15px] py-[6px]  text-white text-[20px] font-semibold rounded-md  grid place-items-center transition-all ${getDateWithoutTime(booking_date) >= getDateWithoutTime(maxDate) ? "bg-stone-300" : "bg-stone-500 active:opacity-60 hover:opacity-75"}`}
                        disabled={getDateWithoutTime(booking_date) >= getDateWithoutTime(maxDate)}
                        onClick={handleNextClick} // Handle next button click
                    >
                        <NavigateNextIcon />
                    </button>
                </div>
            </div>

            <div className='rounded-md overflow-hidden' >
                <FullCalendar
                    ref={calendarRef}
                    plugins={[resourceTimeGridPlugin]}
                    initialView="resourceTimeGridDay"
                    slotDuration="01:00:00"
                    events={booked_events}
                    selectable={false}
                    resources={resources}
                    resourceAreaWidth="15%"
                    allDaySlot={false}
                    slotLabelClassNames="text-slate-500 font-semibold text-[17px] cursor-default font-sans"
                    resourceLabelClassNames="font-medium text-[17px] font-sans bg-violet-500 text-white cursor-default"
                    headerToolbar={{
                        start: "",
                        center: "",
                        end: ""
                    }}
                    height={855}
                />

            </div>

            <div className='fixed bottom-[40px] z-[10]  left-0 right-0 flex justify-center'>
                <button
                    style={{

                        boxShadow: "rgb(38, 57, 7) 0px 20px 30px -10px"
                    }}
                    onClick={() => openModal("select_players_modal")}
                    className='w-full md:w-[350px] py-[8px] bg-blue-500 text-white rounded-md text-[17px] font-semibold hover:bg-blue-400 active:bg-blue-300 transition-all'
                >
                    Book slot
                </button>
            </div>

        </div>

    );
};

export default Golfing_bays_bookings;
