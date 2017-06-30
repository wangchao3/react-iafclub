import phoneCheckRoute from "./phoneCheck";
import companyLoginRoute from "./companyLogin";

export default {
    path: "auth",
    childRoutes: [
        phoneCheckRoute,
        companyLoginRoute,
    ]
}
