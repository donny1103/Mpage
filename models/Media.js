import Mongoose from "mongoose";

const Media =
    Mongoose.models.Media ||
    Mongoose.model("Media", {
        userId: Mongoose.Schema.Types.ObjectId,
        type: String,
        src: String,
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: null },
        deletedAt: { type: Date, default: null },
    });

export default Media;
