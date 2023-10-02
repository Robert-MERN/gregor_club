export default function guests_fees_structure_maker(guests_fees) {

    let guests_fees_structure;

    if (guests_fees.title === "fee_1_hour") {
        guests_fees_structure = {
            _id: guests_fees._id,
            fees_structure: [
                {
                    label: "Member & Member with Guest(s)*",
                    slots: [
                        { button_label: "Single Member", players: 1, resourceId: "player-1", fee: null, },
                        { button_label: "Member with 1 Guest", players: 2, resourceId: "player-2", fee: guests_fees.guest_1 },
                    ]
                },
                {
                    label: "Only Guest(s)*",
                    slots: [
                        { button_label: "1 Guest", players: 1, resourceId: "player-1", fee: guests_fees.guest_1, },
                    ]
                }
            ]
        }
    } else {
        guests_fees_structure = {
            _id: guests_fees._id,
            fees_structure: [
                {
                    label: "Member & Member with Guest(s)*",
                    slots: [
                        { button_label: "Single Member", players: 1, resourceId: "player-1", fee: null, },
                        { button_label: "Member with 1 Guest", players: 2, resourceId: "player-2", fee: guests_fees.guest_1 },
                        { button_label: "Member with 2 Guests", players: 3, resourceId: "player-3", fee: guests_fees.guest_2 },
                        { button_label: "Member with 3 Guests", players: 4, resourceId: "player-4", fee: guests_fees.guest_3 },

                    ]
                },
                {
                    label: "Only Guest(s)*",
                    slots: [
                        { button_label: "1 Guest", players: 1, resourceId: "player-1", fee: guests_fees.guest_1, },
                        { button_label: "2 Guests", players: 2, resourceId: "player-2", fee: guests_fees.guest_2, },
                        { button_label: "3 Guests", players: 3, resourceId: "player-3", fee: guests_fees.guest_3, },
                        { button_label: "4 Guests", players: 4, resourceId: "player-4", fee: guests_fees.guest_4, },
                    ]
                }
            ]
        }
    }

    return guests_fees_structure;
}
