import recordRoute from './record';
import {loginRequired} from "../../common/services/authentication";

export default {
    path: "payments",
    onEnter: loginRequired,
    indexRoute: {
        getComponent: function(location, cb) {
            require.ensure([], function(require) {
                const component = require("../components/return")["default"];
                cb(null, component);
            });
        },
    },
    childRoutes: [
        recordRoute,
    ]
}
