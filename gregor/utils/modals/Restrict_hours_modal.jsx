import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { useRouter } from 'next/router';
import useStateContext from '@/context/ContextProvider';
import styles from '@/styles/Home.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, FormControl, Select, FormHelperText, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';

const Select_players_modal = ({ open, close }) => {
    const { cookieUser, set_booking_date_for_admin, booking_date_for_admin, handle_get_all_bookings, bay_field_for_admin, set_bay_field_for_admin, handle_create_booking } = useStateContext();
    const router = useRouter();

    const defaultFormState = {
        startDuration: '',
        endDuration: '',
        bay: 'bay-1',
        errors: {
            startDuration: '',
            endDuration: '',
            bay: '',
        },
    }
    const [formState, setFormState] = useState(defaultFormState);


    const handleClose = () => {
        close('restrict_hours_modal');
        setFormState(defaultFormState);
    };


    const validateField = (fieldName, value) => {
        let error = '';
        switch (fieldName) {
            case 'startDuration':
                if (!value) {
                    error = 'Please select start duration';
                }
                break;
            case 'endDuration':
                if (!value) {
                    error = 'Please select end duration';
                }
                break;
            case 'bay':
                if (!value) {
                    error = 'Please select the Bay';
                }
                break;
            default:
                break;
        }
        return error;
    };

    const handleBlur = (event) => {
        const { name, value } = event.target;
        const error = validateField(name, value);
        setFormState((prevState) => ({
            ...prevState,
            errors: {
                ...prevState.errors,
                [name]: error,
            },
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (name === 'startDuration') {
            const EndDurationOptions = generateEndDurationOptions(value);
            setEndDurationOptions(EndDurationOptions);
        }
        if (name === "bay") {
            set_bay_field_for_admin(value);
            if (cookieUser) {
                handle_get_all_bookings(cookieUser.id, value, booking_date_for_admin);
            }
        }
        if (name === "endDuration") {
            const element = document.getElementById("scroll_to_bottom")
            element && element.scrollIntoView({ behavior: "smooth" })
        }
    };


    const currentDate = new Date();
    const maxDate = new Date(currentDate);
    maxDate.setMonth(maxDate.getMonth() + 2);
    const handleDateChange = (date) => {
        set_booking_date_for_admin(date);
        if (cookieUser) {
            handle_get_all_bookings(cookieUser?.id, bay_field_for_admin, date);
        }
    };



    // Function to create a date object with the time set to midnight (00:00:00)
    const getDateWithoutTime = (date) => {
        const newDate = new Date(date).toLocaleString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" });
        return newDate;
    };

    const generateTimeOptions = () => {
        const timeOptions = [];
        const currentDate = getDateWithoutTime(new Date());
        const bookingDate = getDateWithoutTime(booking_date_for_admin);
        let startDate;
        if (bookingDate === currentDate) {
            startDate = new Date(new Date(booking_date_for_admin).setHours(new Date(booking_date_for_admin).getHours() + 2, 0, 0, 0));
        } else {
            startDate = new Date();
            startDate.setHours(0, 0, 0, 0); // Set to midnight
        }

        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999); // Set to 11:59:59 PM

        while (startDate <= endDate) {
            const timeLabel = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const timeValue = startDate.toTimeString().slice(0, 8); // Format as "hh:mm"
            timeOptions.push({ label: timeLabel, value: timeValue });
            startDate.setMinutes(startDate.getMinutes() + 60); // Increment by 60 minutes (1 hour)
        }

        return timeOptions;
    };

    const timeOptions = generateTimeOptions();

    const [endDurationOptions, setEndDurationOptions] = useState([]);

    const generateEndDurationOptions = (startDuration) => {
        const endDurationOptions = [];

        // Convert the selected start duration to minutes
        const startMinutes = parseInt(startDuration.split(':')[0]) * 60 + parseInt(startDuration.split(':')[1]);

        // Generate end duration options based on the start time
        for (let minutes = startMinutes + 60; minutes < 1440; minutes += 60) {
            // Ensure the end time does not exceed 24 hours (1440 minutes)
            const endTime = new Date(0, 0, 0, Math.floor(minutes / 60), minutes % 60);
            endDurationOptions.push({
                label: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                value: endTime.toTimeString().slice(0, 8),
            });
        }
        return endDurationOptions;
    };
    const formatDateToISO = (dateString, timeString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        const day = date.getDate().toString().padStart(2, '0');

        // Extract hours, minutes, and seconds from the time string
        const [hours, minutes, seconds] = timeString.split(':').map(Number);

        // Create the ISO 8601 formatted string
        const isoString = `${year}-${month}-${day}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        return isoString;
    }

    const handle_next_button = async (event, restriction) => {
        await handle_create_booking(event, restriction);
        setFormState(defaultFormState);
        close("restrict_hours_modal");

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        Object.keys(formState).forEach((fieldName) => {
            const error = validateField(fieldName, formState[fieldName]);
            if (error) {
                errors[fieldName] = error;
            }
        });
        setFormState((prevState) => ({
            ...prevState,
            errors,
        }));
        if (Object.values(errors).every((error) => !error)) {
            const event = {
                title: "Restricted",
                start: formatDateToISO(booking_date_for_admin, formState.startDuration),
                end: formatDateToISO(booking_date_for_admin, formState.endDuration),
                bay_field: bay_field_for_admin,
                userId: cookieUser.id,
                resourceId: "player-1",
                classNames: "bg-stone-500 hover:bg-stone-400 text-[17px] border-none px-2 py-1 font-sans cursor-default transition-all",
            }
            await handle_next_button(event, true);
        }
    };

    return (
        <Dialog open={open.restrict_hours_modal} onClose={handleClose}>
            <form
                onSubmit={handleSubmit}
                className={`h-[80vh] md:w-[500px] md:h-[450px] p-5 md:p-7 pt-8 md:pt-12 pb-6 relative flex flex-col gap-4 md:gap-10 justify-between overflow-x-hidden ${styles.scrollBar}`}
            >
                <div
                    onClick={handleClose}
                    className='absolute right-3 top-2 cursor-pointer select-none'
                >
                    <IconButton>
                        <CloseIcon className='scale-[.9] md:scale-[1.1] text-stone-500' />
                    </IconButton>
                </div>
                <div>
                    <p className='text-[15px] md:text-[17px] text-stone-600 font-bold'>
                        Restrict Hours/Slots
                    </p>
                    <div className="flex flex-col w-full mt-4 md:mt-6 gap-2 md:gap-3">

                        <div className='flex justify-between items-center gap-4' >

                            <div className='flex flex-col gap-1 flex-1'>
                                <label htmlFor="" className='text-[12px] md:text-[14px] text-stone-500 font-semibold'>
                                    Date*
                                </label>
                                <DatePicker
                                    selected={booking_date_for_admin}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    minDate={currentDate}
                                    maxDate={maxDate}
                                    className='text-[17px] cursor-pointer outline-none text-stone-500 font-semibold transition-all '
                                />
                            </div>
                            <div className='flex-1' >
                                <label htmlFor="" className='text-[12px] md:text-[14px] text-stone-500 font-semibold'>
                                    Bay*
                                </label>
                                <FormControl
                                    className='w-full mt-1'
                                    variant="outlined"
                                    size='small'
                                >
                                    <Select
                                        name="bay"
                                        error={Boolean(formState.errors.bay)}
                                        onChange={handleChange}
                                        value={formState.bay}
                                        onBlur={handleBlur}
                                        displayEmpty
                                    >
                                        <MenuItem value={"bay-1"}>bay-1</MenuItem>
                                        <MenuItem value={"bay-2"}>bay-2</MenuItem>
                                    </Select>
                                    {formState.errors.bay && <FormHelperText error>{formState.errors.bay}</FormHelperText>}
                                </FormControl>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="" className='text-[12px] md:text-[14px] text-stone-500 font-semibold'>
                                Start duration*
                            </label>
                            <FormControl
                                className='w-full mt-1'
                                variant="outlined"
                                size='small'
                            >
                                <Select
                                    name="startDuration"
                                    error={Boolean(formState.errors.startDuration)}
                                    onChange={handleChange}
                                    value={formState.startDuration}
                                    onBlur={handleBlur}
                                    displayEmpty
                                >
                                    <MenuItem disabled value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {timeOptions && timeOptions.map((option, index) => (
                                        <MenuItem key={index} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formState.errors.startDuration && <FormHelperText error>{formState.errors.startDuration}</FormHelperText>}
                            </FormControl>
                        </div>

                        <div>
                            <label htmlFor="" className='text-[12px] md:text-[14px] text-stone-500 font-semibold mb-2'>
                                End duration*
                            </label>
                            <FormControl
                                className='w-full mt-1'
                                variant="outlined"
                                size='small'
                            >
                                <Select
                                    name="endDuration"
                                    error={Boolean(formState.errors.endDuration)}
                                    onChange={handleChange}
                                    value={formState.endDuration}
                                    onBlur={handleBlur}
                                    displayEmpty
                                >
                                    <MenuItem disabled value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {endDurationOptions && endDurationOptions.map((option, index) => (
                                        <MenuItem key={index} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formState.errors.endDuration && <FormHelperText error>{formState.errors.endDuration}</FormHelperText>}
                            </FormControl>
                        </div>

                        {/* Note */}
                        <label htmlFor="" className='text-[11px] md:text-[13px] text-stone-500 md:mt-3 mt-2'>
                            Please note that by selecting a restricted time duration, you can later unrestrict that duration by selecting it again.
                        </label>
                    </div>
                </div>

                <div id="scroll_to_bottom" className='w-full flex justify-end'>
                    <div className='flex gap-6 items-center'>
                        <button
                            type="button"
                            onClick={handleClose}
                            className='bg-red-500 hover:bg-red-400 px-4 py-[6px] rounded-md text-white text-[12px] md:text-[15px]'
                        >
                            Cancel
                        </button>
                        <button
                            id={"scroll_to_bottom"}
                            className={`px-4 py-[6px] rounded-md text-white text-[12px] md:text-[15px] bg-blue-500 hover:opacity-75 `}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </form>
        </Dialog>
    );
};

export default Select_players_modal;
