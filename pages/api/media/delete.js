import connectToDatabase from "../../../services/ConnectToDatabase";
import { authenticate } from "../../../middleware/authenticate";
import Media from "../../../models/Media";

export default authenticate(async (req, res) => {
    if (req.method !== "POST") {
        res.status(405).end();
    }

    connectToDatabase();

    const media = await Media.findOne({ _id: req.body.id, userId: req.query.userId });

    media.deletedAt = new Date();

    await media.save();

    return res.json(media.toObject());
});
