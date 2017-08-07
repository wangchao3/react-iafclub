import indexRoute from "./home";
import {loginRequired} from "../../common/services/authentication";

export default {
    path: "per",
    onEnter: loginRequired,
    childRoutes: [
        indexRoute
    ]
}
