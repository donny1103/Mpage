import cookie from "cookie";

export default async (req, res) => {
    if (req.method !== "POST") {
        res.status(405).end();
    }

    res.setHeader(
        "Set-Cookie",
        cookie.serialize("_pa", "deleted", {
            httpOnly: true,
            sameSite: true,
            expires: new Date("1970/01/01"),
            path: "/",
        })
    );

    res.status(200).end();
};
