import phoneCheckRoute from "./phoneCheck";
import companyLoginRoute from "./companyLogin";
import passwordRoute from "./password";
import smsRoute from "./sms";

export default {
    path: "auth",
    childRoutes: [
        phoneCheckRoute,
        companyLoginRoute,
        passwordRoute,
        smsRoute,
    ]
}
