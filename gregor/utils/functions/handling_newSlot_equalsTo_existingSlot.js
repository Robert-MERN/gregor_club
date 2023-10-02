const handling_newSlot_equalsTo_existingSlot = async (res, req, Bookings, userBookings, newSlot, userId, bay_field) => {
    const existing_same_slot = userBookings.find((slot) => slot.start === newSlot.start && slot.end === newSlot.end);

    if (existing_same_slot) {
        let updatedSlot;
        const { title: exisiting_slot_title } = existing_same_slot;
        const { title: new_slot_title } = newSlot;

        if (exisiting_slot_title === new_slot_title) {

            return res.status(200).json({ status: false, message: "You've already booked a same slot" });

        } else if (exisiting_slot_title.includes("Single Member") && new_slot_title.includes("Member with")) {

            if (existing_same_slot.players + (newSlot.players - 1) <= 4) {

                updatedSlot = {
                    ...newSlot,
                    title: `Member with ${newSlot.players - 1} ${new_slot_title.substring(14,)}`,
                    bay_field,
                    userId,
                    players: newSlot.players,
                    resourceId: `player-${newSlot.players}`
                };

                await Bookings.findByIdAndUpdate(existing_same_slot._id, updatedSlot);
            } else {
                return res.status(200).json({ status: false, message: "You're exceeding the 4 players limit" })
            }


        } else if (exisiting_slot_title.includes("Member with") && new_slot_title.includes("Single Member")) {

            return res.status(200).json({ status: false, message: "You're already playing in this slot" });

        } else if (exisiting_slot_title.includes("Member with") && new_slot_title.includes("Member with")) {
            const existing_slot_players = Number(exisiting_slot_title.substring(12, 13));
            const new_slot_players = Number(new_slot_title.substring(12, 13));
            if (existing_slot_players < new_slot_players) {
                // const new_players = new_slot_players - existing_slot_players;


                updatedSlot = {
                    ...newSlot,
                    title: `Member with ${new_slot_players} ${new_slot_title.substring(14,)}`,
                    bay_field,
                    userId,
                    players: 1 + new_slot_players,
                    resourceId: `player-${new_slot_players + 1}`
                };

                await Bookings.findByIdAndUpdate(existing_same_slot._id, updatedSlot);
            } else {
                return res.status(200).json({ status: false, message: "Can't book the slot less than an already booked slot." });
            }

        }
        else {

            if (exisiting_slot_title.includes("Single Member")) {

                if (existing_same_slot.players + newSlot.players <= 4) {

                    updatedSlot = {
                        ...newSlot,
                        title: `Member with ${new_slot_title}`,
                        bay_field,
                        userId,
                        players: 1 + newSlot.players,
                        resourceId: `player-${1 + newSlot.players}`
                    };

                    await Bookings.findByIdAndUpdate(existing_same_slot._id, updatedSlot);
                } else {
                    return res.status(200).json({ status: false, message: "You're exceeding the 4 players limit" });
                }

            } else if (exisiting_slot_title.includes("Member with")) {

                const exisiting_slot_players = Number(exisiting_slot_title.substring(12, 13));
                if ((exisiting_slot_players - 1) < newSlot.players) {
                    const fees = newSlot.players - (exisiting_slot_players - 1);

                    if ((exisiting_slot_players - 1) + newSlot.players <= 4) {
                        updatedSlot = {
                            ...newSlot,
                            title: `Member with ${newSlot.players} Guests`,
                            bay_field,
                            userId,
                            players: 1 + newSlot.players,
                            resourceId: `player-${1 + newSlot.players}`
                        };

                        await Bookings.findByIdAndUpdate(existing_same_slot._id, updatedSlot);
                    } else {
                        return res.status(200).json({ status: false, message: "You're exceeding the 4 players limit" });
                    }

                } else {
                    return res.status(200).json({ status: false, message: "Can't book the slot less than an already booked slot." });
                }

            } else if (new_slot_title.includes("Single Member")) {

                if (existing_same_slot.players + newSlot.players <= 4) {

                    updatedSlot = {
                        ...newSlot,
                        title: `Member with ${existing_same_slot.players} ${existing_same_slot.players > 1 ? "Guests" : "Guest"}`,
                        bay_field,
                        userId,
                        players: existing_same_slot.players + 1,
                        resourceId: `player-${existing_same_slot.players + 1}`
                    };

                    await Bookings.findByIdAndUpdate(existing_same_slot._id, updatedSlot);
                } else {
                    return res.status(200).json({ status: false, message: "You're exceeding the 4 players limit" });
                }

            } else if (new_slot_title.includes("Member with")) {

                const new_slot_players = Number(new_slot_title.substring(12, 13))
                if ((new_slot_players + 1) > existing_same_slot.players) {
                    const fees = existing_same_slot.players - (new_slot_players)


                    if ((new_slot_players - existing_same_slot.players) + (existing_same_slot.players + 1) <= 4) {
                        updatedSlot = {
                            ...newSlot,
                            title: `Member with ${existing_same_slot.players + (new_slot_players - existing_same_slot.players)} ${existing_same_slot.players + (new_slot_players - existing_same_slot.players) > 1 ? "Guests" : "Guest"}`,
                            bay_field,
                            userId,
                            players: 1 + existing_same_slot.players + (new_slot_players - existing_same_slot.players),
                            resourceId: `player-${1 + existing_same_slot.players + (new_slot_players - existing_same_slot.players)}`
                        };

                        await Bookings.findByIdAndUpdate(existing_same_slot._id, updatedSlot);
                    } else {
                        return res.status(200).json({ status: false, message: "You're exceeding the 4 players limit" });
                    }

                } else {
                    return res.status(200).json({ status: false, message: "Can't book the slot less than an already booked slot" });
                }

            }

        }

    } else {
        await Bookings.create(req.body);
    }
}

export default handling_newSlot_equalsTo_existingSlot;