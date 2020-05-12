import { sign } from "jsonwebtoken";
import cookie from "cookie";
import connectToDatabase from "../../../services/ConnectToDatabase";
import User from "../../../models/User";
import { compare } from "../../../helpers/hash";

export default async (req, res) => {
    if (req.method !== "POST") {
        res.status(405).end();
    }

    connectToDatabase();

    const user = await User.findOne({ email: req.body.email });

    if (user) {
        try {
            if (await compare(req.body.password, user.hash)) {
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
                return res.json({ message: "login successful" });
            } else {
                res.status(401).end();
            }
        } catch (e) {
            res.status(500).end();
        }
    } else {
        res.status(401).end();
    }
};
