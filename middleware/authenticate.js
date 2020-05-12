import { verify } from "jsonwebtoken";

export const authenticate = (fn) => async (req, res) => {
    try {
        const decoded = verify(req.cookies._pa, process.env.SECRET);
        if (decoded) {
            req.query.userId = decoded._id;
            return await fn(req, res);
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (e) {
        res.status(401).json({ message: "Unauthorized" });
    }
};
