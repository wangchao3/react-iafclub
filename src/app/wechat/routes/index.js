import oauthRoute from "./oauth";
import loginRoute from "./login";

export default {
    path: "wechat",
    childRoutes: [
        oauthRoute,
        loginRoute,
    ]
}
