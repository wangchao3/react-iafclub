import aboutUsRoute from "./aboutUs";
import helpRoute from "./help"
import agreementRoute from './agreement'

export default {
    path : "pages",
    childRoutes : [aboutUsRoute, helpRoute, agreementRoute]
}
