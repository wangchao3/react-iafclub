import {loginRequired} from "../../common/services/authentication";

export default {
    path: "list",
    onEnter: loginRequired,
    getComponent: function(location, cb) {
        require.ensure([], function(require) {
            const component = require("../components/list")["default"];
            cb(null, component);
        });
    },
}
