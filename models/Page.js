import Mongoose from "mongoose";

const Page =
    Mongoose.models.Page ||
    Mongoose.model("Page", {
        userId: Mongoose.Schema.Types.ObjectId,
        title: String,
        body: String,
        media: [Mongoose.Schema.Types.ObjectId],
        createdAt: Date,
        updatedAt: Date,
        deletedAt: { type: Date, default: null },
    });

export default Page;
