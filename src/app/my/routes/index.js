import homeRoute from "./home";
import {loginRequired} from "../../common/services/authentication";

export default {
    path: "my",
    onEnter: loginRequired,
    childRoutes: [
        homeRoute,
    ]
}
