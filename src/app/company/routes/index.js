import {loginRequired} from "../../common/services/authentication";
import infoRoute from './info';
import indexRoute from './frontPage'
import financeRoute from './finance'

export default {
    path: "company",
    onEnter : loginRequired,
    childRoutes : [infoRoute, indexRoute, financeRoute]
}
