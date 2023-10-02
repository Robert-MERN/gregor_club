import Bookings from "@/models/bookingsModel";
import connectMongo from "@/utils/functions/connectMongo"
import Users from "@/models/userModel";
import updateBooking from "@/utils/functions/get_all_bookings_functions";

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */




export default async function handler(req, res) {
    try {

        await connectMongo();
        // new slot

        const { bay_field, userId, calendar_date } = req.query;
        let bookings = await Bookings.find({ bay_field });

        let user;
        if (userId) user = await Users.findById(userId);

        // Iterate through userObjects and update the title for each object
        if (user) {
            if (bookings.length) {
                bookings = await updateBooking(
                    bookings,
                    user.isAdmin,
                    user._id,
                    Users
                );
            } else {
                return res.status(200).json(bookings);
            };

            if (calendar_date) {
                const calendar_date_bookings = bookings.filter(booking => booking.start.substring(0, 10) === calendar_date);
                return res.status(200).json(calendar_date_bookings);
            } else {
                return res.status(200).json(bookings);
            }
        } else {
            return res.status(404).json({ status: false, message: "User not found with this ID" })
        }
    } catch (err) {
        return res.status(501).json({ status: false, message: err.message });
    }
}

