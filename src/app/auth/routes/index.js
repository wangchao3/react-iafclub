import phoneCheckRoute from "./phoneCheck";

export default {
    path: "auth",
    childRoutes: [
        phoneCheckRoute,
    ]
}
