import connectToDatabase from "../../../../services/ConnectToDatabase";
import Media from "../../../../models/Media";
import Page from "../../../../models/Page";
import { authenticate } from "../../../../middleware/authenticate";

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

    const page = await Page.findOne({ _id: req.query.id, userId: req.query.userId });

    const mediaIds = [...page.media, media._id];

    page.media = mediaIds;
    page.updatedAt = new Date();

    await page.save();

    return res.json(media.toObject());
});
