import connectToDatabase from "../../../services/ConnectToDatabase";
import Page from "../../../models/Page";
import Media from "../../../models/Media";
import { authenticate } from "../../../middleware/authenticate";

export default authenticate(async (req, res, user) => {
    if (req.method !== "POST") {
        res.status(405).end();
    }

    connectToDatabase();

    const mediaIds = [];

    const { media } = req.body;

    for (let m of media) {
        mediaIds.push(
            await Media.create({
                userId: user._id,
                type: m.type,
                src: m.src,
            })
        );
    }

    const page = new Page({
        userId: user._id,
        title: req.body.title || "",
        body: req.body.body || "",
        media: mediaIds,
        createdAt: new Date(),
        updateAt: null,
        deleteAt: null,
    });

    await page.save();
    return res.json(page.toObject());
});
