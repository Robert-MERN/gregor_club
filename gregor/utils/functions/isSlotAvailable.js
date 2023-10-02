export default function isSlotAvailable(newSlot, existingSlots, user) {
    if (existingSlots.length) {
        const newStartTime = new Date(newSlot.start).getTime();
        const newEndTime = new Date(newSlot.end).getTime();
        const newDurationMinutes = (newEndTime - newStartTime) / (1000 * 60); // Calculate duration in minutes

        // Checking if the user who's booking a slot, has already bookings.  
        const user_existing_slots = existingSlots.filter(slot => slot.userId.toString() === newSlot.userId.toString());

        if (user_existing_slots.length) {
            for (const slot of user_existing_slots) {
                const existingStartTime = new Date(slot.start).getTime();
                const existingEndTime = new Date(slot.end).getTime();
                if (existingStartTime === newStartTime && existingEndTime === newEndTime && !newSlot.title.includes("Restricted") && !slot.title.includes("Restricted")) {
                    if (slot.title === "Restricted") {
                        return { status: false, message: "The slot is unavailable due to restriction" }
                    }
                    return { status: true, message: "The slot will be validated by create-event function" }
                }
            }
        }


        // Create a map to track the total duration used by each user in the same calendar date
        const userDurationMap = new Map();

        // Get the calendar date of the new slot
        const newSlotDate = newSlot.start.substr(0, 10);

        // Calculate the total duration of all user's existing slots on the same calendar date
        for (const slot of existingSlots) {
            const slotStartTime = new Date(slot.start).getTime();
            const slotEndTime = new Date(slot.end).getTime();
            const slotDurationMinutes = (slotEndTime - slotStartTime) / (1000 * 60);

            if (slot.userId.toString() === newSlot.userId.toString() && slot.start.substr(0, 10) === newSlotDate) {
                const userTotalDuration = userDurationMap.get(newSlot.userId.toString()) || 0;
                userDurationMap.set(newSlot.userId.toString(), userTotalDuration + slotDurationMinutes);
            }
        }

        const userTotalDuration = userDurationMap.get(newSlot.userId.toString()) || 0;

        // Check if the user has exceeded the 4-hour limit for the calendar date
        if (userTotalDuration + newDurationMinutes > 240 && !user.isAdmin) {
            return { status: false, message: "You're exceeding the 4-hour limit for the calendar date" };
        }

        // Check for overlapping with existing slots
        for (const existingSlot of existingSlots) {
            const existingStartTime = new Date(existingSlot.start).getTime();
            const existingEndTime = new Date(existingSlot.end).getTime();
            const existingDurationMinutes = (existingEndTime - existingStartTime) / (1000 * 60); // Calculate existing slot duration in minutes

            // Check if the new slot is within the same calendar date as the existing slot
            if (newSlot.start.substr(0, 10) === existingSlot.start.substr(0, 10)) {
                // Check for overlapping time ranges
                if (newDurationMinutes === 60 && existingDurationMinutes === 60) {
                    return { status: false, message: "The 1-hour slot is unavailable" };
                }
                if (
                    (newStartTime >= existingStartTime && newStartTime < existingEndTime) ||
                    (newEndTime > existingStartTime && newEndTime <= existingEndTime) ||
                    (newStartTime <= existingStartTime && newEndTime >= existingEndTime)
                ) {

                    if (existingSlot.title === "Restricted") {
                        return { status: false, message: "The slot is unavailable due to restriction" };
                    }
                    if (newDurationMinutes !== existingDurationMinutes) {
                        return { status: false, message: "The slot is unavailable due to different session durations" };
                    }

                    if (newDurationMinutes === existingDurationMinutes && newSlot.players + existingSlot.players > 4) {
                        return { status: false, message: "The slot is unavailable due to player count" };
                    }
                }
            }
        }

        return { status: true, message: "The slot is available" };
    } else {
        return { status: true, message: "The slot is available" };
    }

}

