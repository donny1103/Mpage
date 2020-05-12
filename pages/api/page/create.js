import connectToDatabase from "../../../services/ConnectToDatabase";
import Page from "../../../models/Page";
import Media from "../../../models/Media";
import { authenticate } from "../../../middleware/authenticate";

export default authenticate(async (req, res) => {
    if (req.method !== "POST") {
        res.status(405).end();
    }

    const { userId } = req.query;

    connectToDatabase();

    const mediaIds = [];

    const { media } = req.body;

    for (let m of media) {
        mediaIds.push(
            await Media.create({
                userId,
                type: m.type,
                src: m.src,
            })
        );
    }

    const page = new Page({
        userId,
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
