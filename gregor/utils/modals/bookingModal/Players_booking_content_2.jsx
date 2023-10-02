import React, { useState } from 'react';
import style from '@/styles/Home.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, FormControl, Select, FormHelperText, MenuItem } from '@mui/material';
import { Fade } from 'react-reveal';

const Players_booking_content_2 = ({
    selected_players,
    handleClose,
    handle_next_button,
    booking_date,
    set_booking_modal,
    bay_field,
    userId,
    selected_range_hour,
    username,
}) => {

    const default_form_state = {
        startDuration: '',
        endDuration: '',
        errors: {
            startDuration: '',
            endDuration: '',
        },
    }
    const [formState, setFormState] = useState(default_form_state);

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
            // Form is valid, submit it
            const { button_label, ...other } = selected_players;
            const event = {
                ...other,
                title: button_label,
                start: formatDateToISO(booking_date, formState.startDuration),
                end: formatDateToISO(booking_date, formState.endDuration),
                bay_field,
                userId,
                username,
                classNames: "bg-blue-500 text-[17px] border-none px-2 py-1 font-sans hover:opacity-75 cursor-default transition-all",
            }
            await handle_next_button(true, event);
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
        const bookingDate = getDateWithoutTime(booking_date);
        let startDate;
        if (bookingDate === currentDate) {
            startDate = new Date(new Date(booking_date).setHours(new Date(booking_date).getHours() + 2, 0, 0, 0));
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

    const [endDurationOptions, setEndDurationOptions] = useState([])

    const generateEndDurationOptions = (startDuration) => {
        const endDurationOptions = [];

        // Convert the selected start duration to minutes
        const startMinutes = parseInt(startDuration.split(':')[0]) * 60 + parseInt(startDuration.split(':')[1]);

        // Define the allowed session durations in minutes (1 hour, 2 hours, 4 hours)
        let sessionDurations;
        if (selected_range_hour.title === "fee_1_hour") {
            sessionDurations = 60;
        } else if (selected_range_hour.title === "fee_2_hour") {
            sessionDurations = 120;
        } else if (selected_range_hour.title === "fee_4_hour") {
            sessionDurations = 240;
        }

        // Generate end duration options based on the start time and session durations

        const endMinutes = startMinutes + sessionDurations;
        if (endMinutes <= 1440) {
            // Ensure the end time does not exceed 24 hours (1440 minutes)
            const endTime = new Date(0, 0, 0, Math.floor(endMinutes / 60), endMinutes % 60);
            endDurationOptions.push({
                label: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                value: endTime.toTimeString().slice(0, 8),
            });
        }

        return endDurationOptions;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Generate end duration options when the start duration is selected
        if (name === 'startDuration') {
            const EndDurationOptions = generateEndDurationOptions(value);
            setEndDurationOptions(EndDurationOptions);
        }
    };


    const close_modal = () => {
        handleClose();
        setFormState(default_form_state);
    }
    const handle_back = () => {
        set_booking_modal("players_booking")
        setFormState(default_form_state);
    }

    return (
        <Fade right duration={400}>
            <form
                onSubmit={handleSubmit}
                className={`h-[70vh] md:w-[500px] md:h-[450px] p-5 md:p-7 pt-8 md:pt-12 pb-6 relative flex flex-col gap-4 md:gap-10 justify-between overflow-x-hidden ${style.scrollBar}`}
            >
                <div
                    onClick={close_modal}
                    className="absolute right-3 top-2 cursor-pointer select-none"
                >
                    <IconButton>
                        <CloseIcon className="scale-[.9] md:scale-[1.1] text-stone-500" />
                    </IconButton>
                </div>
                <div>
                    <p className="text-[15px] md:text-[17px] text-stone-600 font-bold">
                        Select Booking Duration
                    </p>
                    <div className="flex flex-col w-full mt-4 md:mt-6 gap-4 md:gap-6">
                        <div>
                            <label htmlFor="" className="text-[12px] md:text-[14px] text-stone-500 font-semibold">
                                Start duration*
                            </label>
                            <FormControl className="w-full mt-1 md:mt-2" variant="outlined" size="small">
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
                                    {timeOptions &&
                                        timeOptions.map((option, index) => (
                                            <MenuItem key={index} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                </Select>
                                {formState.errors.startDuration && (
                                    <FormHelperText error>{formState.errors.startDuration}</FormHelperText>
                                )}
                            </FormControl>
                        </div>

                        <div>
                            <label htmlFor="" className="text-[12px] md:text-[14px] text-stone-500 font-semibold mb-2">
                                End duration*
                            </label>
                            <FormControl className="w-full mt-1 md:mt-2" variant="outlined" size="small">
                                <Select
                                    name="endDuration"
                                    error={Boolean(formState.errors.endDuration)}
                                    onChange={handleChange}
                                    value={formState.endDuration}
                                    onBlur={handleBlur}
                                    displayEmpty
                                    disabled={!formState.startDuration}
                                >
                                    <MenuItem disabled value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {endDurationOptions &&
                                        endDurationOptions.map((option, index) => (
                                            <MenuItem key={index} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                </Select>
                                {formState.errors.endDuration && (
                                    <FormHelperText error>{formState.errors.endDuration}</FormHelperText>
                                )}
                            </FormControl>
                        </div>


                        <label htmlFor="" className="text-[11px] md:text-[13px] text-stone-500 md:mt-3 mt-2">
                            Please note that you can select a booking duration of 1, 2, or 4 hours. If there are multiple players, you are not allowed to select a duration of 1 hour; it must be either 2 or 4 hours.
                        </label>
                    </div>
                </div>

                <div id="scroll_to_bottom" className="w-full flex justify-between">
                    <button
                        type="button"
                        onClick={close_modal}
                        className="bg-red-500 hover:bg-red-400 px-4 py-[6px] rounded-md text-white text-[12px] md:text-[15px]"
                    >
                        Cancel
                    </button>
                    <div className="flex gap-4 items-center">
                        <button
                            type="button"
                            onClick={handle_back}
                            className="bg-stone-500 hover:bg-stone-400 px-4 py-[6px] rounded-md text-white text-[12px] md:text-[15px]"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-[6px] rounded-md text-white text-[12px] md:text-[15px] bg-blue-500 hover:opacity-75`}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </form>
        </Fade>
    );
};

export default Players_booking_content_2;
