// import phoneCheckRoute from "./phoneCheck";
// import companyLoginRoute from "./companyLogin";
// import passwordRoute from "./password";
// import smsRoute from "./sms";
import personLogin from "./personLogin";
import register from "./register"
import reset from "./reset"
import forgot from './forgot'
// import {unLoginRequired} from "../../common/services/authentication";

export default {
    path : "user",
    //onEnter : unLoginRequired,
    childRoutes : [
        // phoneCheckRoute,
        // companyLoginRoute,
        // passwordRoute,
        // smsRoute,
        personLogin,
        register,
        reset,
        forgot
    ]
}
