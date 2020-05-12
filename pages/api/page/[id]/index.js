import Mongoose from "mongoose";
import connectToDatabase from "../../../../services/ConnectToDatabase";
import Page from "../../../../models/Page";
import Media from "../../../../models/Media";

export default async (req, res) => {
    if (req.method !== "GET") return res.status(405).end();

    const { id } = req.query;

    if (!Mongoose.Types.ObjectId.isValid(id)) return res.status(404).end();

    connectToDatabase();

    const page = await Page.findOne({ _id: id });

    let media = [];

    for (let m of page.media) {
        media.push((await Media.findOne({ _id: m }))?.toObject() ?? {});
    }
    const data = { ...page.toObject(), media };
    delete data.userId;
    res.status(200).json(data);
};
