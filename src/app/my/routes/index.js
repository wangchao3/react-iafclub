import homeRoute from "./home";
import infoRoute from './userInfo'
import changeCard from './changeCard'
import {loginRequired} from "../../common/services/authentication";

export default {
    path: "my",
    onEnter: loginRequired,
    childRoutes: [
        homeRoute,
        infoRoute,
        changeCard
    ]
}
