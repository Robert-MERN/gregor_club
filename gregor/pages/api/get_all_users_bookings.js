import Bookings from "@/models/bookingsModel";
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

        const { userId } = req.query;
        const user = await Users.findById(userId);

        if (!user) return res.status(404).json({ status: false, message: "User doesn't exist!" })

        if (!user.isAdmin) return res.status(401).json({ status: false, message: "You're not allowed to do that!" })

        const bookings = await Bookings.find().sort({ createdAt: -1 });


        const sorted_bookings = bookings.filter(item => item.title !== "Restricted")

        return res.status(200).json(sorted_bookings)

    } catch (err) {
        return res.status(501).json({ status: false, message: err.message });
    }
}

