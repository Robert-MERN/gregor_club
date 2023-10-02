import Players from "@/models/playersModel";
import Users from "@/models/userModel";
import connectMongo from "@/utils/functions/connectMongo";
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req, res) {
    try {

        await connectMongo();
        // new slot
        const { id, adminId } = req.query;
        const user = await Users.findById(adminId);
        if (user.isAdmin) {
            await Players.findByIdAndUpdate(id, req.body);
            return res.status(200).json({ status: true, message: "Fees has been changed" });
        } else {
            return res.status(401).json({ status: false, message: "You aren't allowed to do that" });
        }
    } catch (err) {
        return res.status(501).json({ status: false, message: err.message });
    }
}

