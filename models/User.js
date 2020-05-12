import Mongoose from "mongoose";

const User =
    Mongoose.models.User ||
    Mongoose.model("User", {
        name: { type: String, default: "" },
        profilePictureUrl: { type: String, default: "" },
        email: String,
        hash: String,
        createdAt: { type: Date, default: Date.now },
        isFirstLogin: { type: Boolean, default: true },
    });

export default User;
