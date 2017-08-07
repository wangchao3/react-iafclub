import {oneTimeTokenLogin} from "./app/users/services/auth";
import {isLogin} from "./app/common/services/authentication";
import App from "./app/app";
import NotFound from "./app/pages/components/404";
import indexRoute from "./app/common/routes";
import productRoute from "./app/product/routes";
import authRoute from './app/auth/routes';
import myRoute from './app/my/routes';
import pageRoute from './app/pages/routes';
import perIndexRoute from './app/index/routes';

export default {
    component : "div",
    childRoutes : [
        {
            path: "/",
            component: App,
            onEnter: (nextState, replace, callback) => {
                const {Source, messageId, recipientId, ottoken} = nextState.location.query;
                if (isLogin() || !Source || !messageId || !recipientId || !ottoken)
                    return callback();
                oneTimeTokenLogin(ottoken).then(() => {
                    location.reload();
                }, () => {
                    replace("/register");
                    callback();
                })
            },
            indexRoute: indexRoute,
            childRoutes: [productRoute, authRoute, myRoute, pageRoute, perIndexRoute]
        }, {
            path: "*",
            component: NotFound
        }
    ]
}
