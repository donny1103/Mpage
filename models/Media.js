import Mongoose from "mongoose";

const Media =
    Mongoose.models.Media ||
    Mongoose.model("Media", {
        userId: Mongoose.Schema.Types.ObjectId,
        type: String,
        src: String,
        //todo: add user id
    });

export default Media;
