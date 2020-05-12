import connectToDatabase from "../../../services/ConnectToDatabase";
import Page from "../../../models/Page";
import Media from "../../../models/Media";
import { authenticate } from "../../../middleware/authenticate";

export default authenticate(async (req, res) => {
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    const { userId } = req.query;
    connectToDatabase();

    const results = await Page.find({ userId }, { title: -1, media: -1, createdAt: -1 });

    let pages = [];

    for (let page of results) {
        let mediaId = page.media[0];
        let thumnail = (await Media.findOne({ _id: mediaId, userId }))?.toObject() ?? {};
        let pageObj = page?.toObject() ?? {};

        pages.push({
            _id: pageObj?._id,
            title: pageObj?.title,
            createdAt: pageObj?.createdAt,
            thumnail,
        });
    }
    res.json(JSON.parse(JSON.stringify(pages)));
});
