import indexRoute from "./home";
import {loginRequired} from "../../common/services/authentication";

export default {
    path: "person",
    onEnter: loginRequired,
    childRoutes: [
        indexRoute
    ]
}
