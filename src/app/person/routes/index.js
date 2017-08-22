import indexRoute from './home';
import returnRoute from './return';
import {loginRequired} from "../../common/services/authentication";

export default {
    path: "person",
    onEnter: loginRequired,
    childRoutes: [
        indexRoute,
        returnRoute
    ]
}
