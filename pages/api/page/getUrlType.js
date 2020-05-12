import https from "https";

export default async (req, res) => {
    const request = await https.get(req.body.url, function (httpRes) {
        const contentType = httpRes.headers["content-type"];
        return res.json(contentType);
    });
};
