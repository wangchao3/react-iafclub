import phoneCheckRoute from "./phoneCheck";
import companyLoginRoute from "./companyLogin";
import passwordRoute from "./password";
import smsRoute from "./sms";
import {unLoginRequired} from "../../common/services/authentication";

export default {
    path: "auth",
    onEnter: unLoginRequired,
    childRoutes: [
        phoneCheckRoute,
        companyLoginRoute,
        passwordRoute,
        smsRoute,
    ]
}
