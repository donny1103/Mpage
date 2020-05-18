import connectToDatabase from "../../../../services/ConnectToDatabase";
import Page from "../../../../models/Page";
import { authenticate } from "../../../../middleware/authenticate";

export default authenticate(async (req, res) => {
    if (req.method !== "POST") {
        res.status(405).end();
    }

    connectToDatabase();

    const page = await Page.findOne({ _id: req.query.id, userId: req.query.userId });

    const mediaIds = page.media.filter((id) => id.toString() !== req.body.mediaId);

    page.media = mediaIds;
    page.updatedAt = new Date();

    await page.save();

    return res.json(page.toObject());
});
