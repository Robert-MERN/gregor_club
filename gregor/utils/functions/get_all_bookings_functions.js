// Function to get the username from MongoDB
const getUsernameFromUserId = async (Users, booking_user_id) => {
    try {
        const user = await Users.findById(booking_user_id);
        return user ? user.name : null;
    } catch (error) {
        res.status(501).json({ status: false, message: err.message })
        return null;
    }
};


const customized_booking_function = async (Bookings, admin, requesterId, Users) => {
    let bookings = Bookings;

    let classNames = "text-[17px] border-none px-2 py-1 font-sans cursor-default transition-all";
    const all_class_names = {
        my_bookings: `bg-blue-500 hover:bg-blue-400  ${classNames}`,
        restricted_bookings: `bg-stone-500 hover:bg-stone-400 ${classNames}`,
        others_bookings_available: `bg-green-500 hover:bg-green-400 ${classNames}`,
        others_bookings_unavailable: `bg-red-500 hover:bg-red-400 ${classNames}`,
        others_1_hour_slot: `bg-amber-400 hover:bg-amber-300 ${classNames}`
    }


    // Create an object to store the total players for each duration
    const durationTotals = {};

    // Calculate the total players for each duration using a for...of loop
    for (const booking of bookings) {
        const { start, end, players } = booking;
        const durationKey = `${start}-${end}`;
        if (durationTotals[durationKey]) {
            durationTotals[durationKey] += players;
        } else {
            durationTotals[durationKey] = players;
        }
    }

    // Iterate through the array and add the "color" field based on the total players
    for (const booking of bookings) {
        const { start, end } = booking;
        const durationKey = `${start}-${end}`;
        if (durationTotals[durationKey] >= 4) {
            booking.classNames = all_class_names.others_bookings_unavailable;
        } else {
            booking.classNames = all_class_names.others_bookings_available;
        }
    }


    // logic for ading class names
    for (const booking_obj of bookings) {

        if (booking_obj.title === "Restricted") {
            booking_obj.classNames = all_class_names.restricted_bookings;

        } else if (booking_obj.userId.toString() === requesterId.toString()) {
            booking_obj.classNames = all_class_names.my_bookings;

        } else if (booking_obj.userId.toString() !== requesterId.toString()) {
            // Calculate existing slot duration in minutes
            const existingStartTime = new Date(booking_obj.start).getTime();
            const existingEndTime = new Date(booking_obj.end).getTime();
            const existingDurationMinutes = (existingEndTime - existingStartTime) / (1000 * 60);
            // checking if the other's booking slot is available or unavailable for a user
            if (booking_obj.players === 1 && existingDurationMinutes === 60) {
                // unavailable slot
                booking_obj.classNames = all_class_names.others_1_hour_slot;
            }
        }

    }



    // logic for rendering title
    for (const booking_obj of bookings) {
        // Get the username from the user's booking_obj
        const username = await getUsernameFromUserId(Users, booking_obj.userId);

        if (booking_obj.title === 'Single Member') {
            if (admin) {
                booking_obj.title = `${username}'s playing`;
            } else if (requesterId.toString() === booking_obj.userId.toString()) {
                booking_obj.title = `You're playing`;
            } else if (requesterId.toString() !== booking_obj.userId.toString()) {
                booking_obj.title = `Member is playing`;
            }
        } else if (booking_obj.title.includes('Member')) {
            if (admin) {
                booking_obj.title = booking_obj.title.replace('Member with', `${username} w/`);
            } else if (requesterId.toString() === booking_obj.userId.toString()) {
                booking_obj.title = booking_obj.title.replace('Member with', `You're w/`);
            } else if (requesterId.toString() !== booking_obj.userId.toString()) {
                booking_obj.title = booking_obj.title.replace('Member with', 'Member w/');
            }
        } else if (booking_obj.title.includes('Restricted')) {
            booking_obj.title = `Retricted by Admin`;
        } else {
            if (admin) {
                booking_obj.title = `${username}'s ${booking_obj.title}`;
            } else if (requesterId.toString() === booking_obj.userId.toString()) {
                booking_obj.title = `Yours ${booking_obj.title}`;
            } else if (requesterId.toString() !== booking_obj.userId.toString()) {
                booking_obj.title = `Member's ${booking_obj.title}`;
            }
        }
    }

    return bookings;
};

export default customized_booking_function;