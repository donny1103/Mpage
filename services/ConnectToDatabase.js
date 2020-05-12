import Mongoose from "mongoose";

export default () => {
    if (Mongoose.connection.readyState === 0) {
        Mongoose.connect(`${process.env.MONGO_URL || "mongodb://localhost:27017"}/pageapp`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
};
