import Bookings from "@/models/bookingsModel";
import isSlotAvailable from "@/utils/functions/isSlotAvailable";
import connectMongo from "@/utils/functions/connectMongo"
import Users from "@/models/userModel";


/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req, res) {
    try {

        await connectMongo();
        // new slot
        const { bay_field, ...newSlot } = req.body;
        const user = await Users.findById(newSlot.userId);

        if (!user) return res.status(404).json({ status: false, message: "User not found!" })

        // all the existing slots
        const bookings = await Bookings.find({ bay_field });
        // finding if the slot is availabe
        const response = isSlotAvailable(newSlot, bookings, user);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(501).json({ status: false, message: err.message });
    }
}

