import Bookings from "@/models/bookingsModel";
import Users from "@/models/userModel";
import connectMongo from "@/utils/functions/connectMongo";
import handling_newSlot_equalsTo_existingSlot from "@/utils/functions/handling_newSlot_equalsTo_existingSlot";

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req, res) {
    try {
        await connectMongo();

        // Logic: if admin is restricting a slot.
        const { restriction, requesterId } = req.query
        if (restriction) {
            const user = await Users.findById(requesterId);
            if (user.isAdmin) {
                await Bookings.create(req.body);
                return res.status(200).json({ status: true, message: "The slot has been restricted" })
            } else {
                return res.status(401).json({ status: false, message: "You aren't allowed to do that" });
            }
        }


        // Logic: if user is booking a field
        const { userId, bay_field, ...newSlot } = req.body;
        // all the existing slots
        const userBookings = await Bookings.find({ userId, bay_field });

        if (userBookings.length) {


            await handling_newSlot_equalsTo_existingSlot(res, req, Bookings, userBookings, newSlot, userId, bay_field)
        } else {
            await Bookings.create(req.body);
        }
        return res.status(200).json({ status: true, message: "You have booked a slot." })
    } catch (err) {
        return res.status(501).json({ status: false, message: err.message });
    }
}

