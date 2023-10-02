import connectMongo from "@/utils/functions/connectMongo"
import Players from "@/models/playersModel";
import Users from "@/models/userModel";
import guests_fees_structure_maker from "@/utils/functions/guests_fees_structure_maker";

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */



function convertStringToValue(value) {
    return value === "null" ? null : value === "undefined" ? undefined : value;
}

export default async function handler(req, res) {
    try {

        await connectMongo();
        let guests_fees = await Players.find();
        if (!guests_fees.length) return res.status(404).json({ message: "Guests's fee structure is not found!" });

        const { userId, range_hour } = req.query;
        let user = convertStringToValue(userId) ? await Users.findById(userId) : null;

        if (convertStringToValue(userId) && !user) return res.status(404).json({ status: false, message: "User is not found!" })

        if (user && !user.isAdmin) return res.status(404).json({ status: false, message: "You're not allowed to do that" })

        if (user) {
            if (user.isAdmin && !convertStringToValue(range_hour)) {
                return res.status(200).json(guests_fees[0]);
            } else {
                return res.status(200).json(guests_fees_structure_maker(guests_fees[0].fees_structure.find(e => e.title.includes(range_hour)), guests_fees[0]._id));
            }
        } else {
            return res.status(200).json(guests_fees_structure_maker(guests_fees[0].fees_structure.find(e => e.title.includes(range_hour)), guests_fees[0]._id));
        }


    } catch (err) {
        return res.status(501).json({ status: false, message: err.message });
    }
}

