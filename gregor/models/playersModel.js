import { Schema, connection } from "mongoose"

const playersSchema = new Schema({

    fees_structure: {
        type: Array
    }





}, { timestamps: true });


const Db = connection.useDb("Gregor");
const Players = Db.models.Players || Db.model('Players', playersSchema);
export default Players