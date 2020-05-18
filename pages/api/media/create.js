import connectToDatabase from "../../../services/ConnectToDatabase";
import Media from "../../../models/Media";
import { authenticate } from "../../../middleware/authenticate";

export default authenticate(async (req, res) => {
    if (req.method !== "POST") {
        res.status(405).end();
    }

    connectToDatabase();

    const media = await Media.create({
        type: req.body.type,
        src: req.body.src,
        userId: req.query.userId,
    });

    await media.save();

    return res.json(media.toObject());
});
