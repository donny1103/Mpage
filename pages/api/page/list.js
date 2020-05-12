import connectToDatabase from "../../../services/ConnectToDatabase";
import Page from "../../../models/Page";
import Media from "../../../models/Media";
import { authenticate } from "../../../middleware/authenticate";

export default authenticate(async (req, res, user) => {
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    connectToDatabase();

    const results = await Page.find({ userId: user._id });

    let pages = [];

    for (let page of results) {
        let media = [];

        for (let m of page.media) {
            media.push((await Media.findOne({ _id: m, userId: user._id }))?.toObject() ?? {});
        }

        pages.push({
            ...page.toObject(),
            media,
        });
    }
    res.json(JSON.parse(JSON.stringify(pages)));
});
