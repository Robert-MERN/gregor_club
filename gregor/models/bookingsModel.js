import { Schema, connection } from "mongoose"

const bookingSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is missing"],
    },
    start: {
        type: String,
        required: [true, "start Time is missing"],
    },
    end: {
        type: String,
        required: [true, "End Time is missing"],
    },
    classNames: {
        type: String,
    },
    resourceId: {
        type: String,
        required: [true, "Booking resource ID is missing"],
    },
    username: {
        type: String,
    },
    fee: {
        type: Number,
    },
    players: {
        type: Number,
    },
    userId: {
        type: Schema.Types.ObjectId,
    },
    userFullName: {
        type: String,
    },
    status: {
        type: String,
    },
    bay_field: {
        type: String,
        required: [true, "Bay field is missing"],
    }

}, { timestamps: true });


const Db = connection.useDb("Gregor");
const Bookings = Db.models.Bookings || Db.model('Bookings', bookingSchema);
export default Bookings