import connectToDatabase from "../../../services/ConnectToDatabase";
import User from "../../../models/User";
import { authenticate } from "../../../middleware/authenticate";

export default authenticate(async (req, res, data) => {
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    connectToDatabase();

    const user = await User.findOne({ _id: data._id }, { name: -1, email: -1, profilePictureUrl: -1 });

    res.json(JSON.parse(JSON.stringify(user)));
});
