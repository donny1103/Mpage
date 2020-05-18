import connectToDatabase from "../../../../services/ConnectToDatabase";
import Page from "../../../../models/Page";
import Media from "../../../../models/Media";
import { authenticate } from "../../../../middleware/authenticate";

export default authenticate(async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).end();
    }
    const { userId } = req.query;
    connectToDatabase();

    const { media, id } = req.body;

    const page = await Page.findOne({ _id: id, userId });

    let mediaIds = [];
    for (let m of media) {
        if (!!m._id) {
            mediaIds.push(m._id);
        } else {
            mediaIds.push(
                await Media.create({
                    type: m.type,
                    src: m.src,
                    userId,
                })
            );
        }
    }

    page.title = req.body.title || "";
    page.body = req.body.body || "";
    page.media = mediaIds;
    page.updatedAt = new Date();

    await page.save();
    return res.json(page.toObject());
});
