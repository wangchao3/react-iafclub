import phoneCheckRoute from "./phoneCheck";
import companyLoginRoute from "./companyLogin";
import passwordRoute from "./password";

export default {
    path: "auth",
    childRoutes: [
        phoneCheckRoute,
        companyLoginRoute,
        passwordRoute,
    ]
}
