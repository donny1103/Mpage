import { sign } from "jsonwebtoken";
import cookie from "cookie";
import connectToDatabase from "../../../services/ConnectToDatabase";
import User from "../../../models/User";
import { hash } from "../../../helpers/hash";

export default async (req, res) => {
    if (req.method !== "POST") {
        res.status(405).end();
    }

    connectToDatabase();

    const exist = (await User.findOne({ email: req.body.email })) !== null;
    if (exist) {
        return res.json({ exist });
    } else {
        const hashedPwd = await hash(req.body.password);
        const user = new User({
            email: req.body.email || "",
            hash: hashedPwd,
        });

        await user.save();

        const claims = { _id: user._id };
        const jwt = await sign(claims, process.env.SECRET);
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("_pa", jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: true,
                maxAge: 1 * 30 * 24 * 3600,
                path: "/",
            })
        );

        return res.json(user.toObject());
    }
};
