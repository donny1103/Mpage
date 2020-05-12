import getPageApi from "./index";
import { authenticate } from "../../../../middleware/authenticate";

export default authenticate(getPageApi);
