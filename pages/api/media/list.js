import connectToDatabase from "../../../services/ConnectToDatabase";
import Media from "../../../models/Media";
import { authenticate } from "../../../middleware/authenticate";

export default authenticate(async (req, res) => {
    if (req.method !== "GET") return res.status(405).end();

    connectToDatabase();

    const list = await Media.find(
        { userId: req.query.userId, deletedAt: { $eq: null } },
        { _id: -1, type: -1, src: -1 }
    );
    const media = {
        photos: list.filter((item) => item.type === "image"),
        videos: list.filter((item) => item.type === "video"),
    };

    res.status(200).json({ ...media });
});
