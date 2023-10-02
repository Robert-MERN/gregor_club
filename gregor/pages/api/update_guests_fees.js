import connectMongo from "@/utils/functions/connectMongo"
import Users from "@/models/userModel";
import Players from "@/models/playersModel";

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
        // new slot

        const { userId, create } = req.query;
        const { _id, ...other } = req.body;

        let user;
        if (!convertStringToValue(userId)) return res.status(401).json({ status: false, message: "Id is not provided" })

        user = await Users.findById(userId);

        if (!user) return res.status(404).json({ status: false, message: "User is not found!" })

        if (!user.isAdmin) return res.status(401).json({ status: false, message: "You're not allowed to do that" })

        if (convertStringToValue(create)) {
            await Players.create(other);
            const guests_fees = await Players.find();

            return res.status(200).json({ status: false, message: "Guests's fees are uploaded", data: guests_fees[0] });
        } else {
            await Players.findByIdAndUpdate(_id, other);
            const guests_fees = await Players.find();
            return res.status(200).json({ status: false, message: "Guests's fees are updated", data: guests_fees[0] });
        }

    } catch (err) {
        return res.status(501).json({ status: false, message: err.message });
    }
}

