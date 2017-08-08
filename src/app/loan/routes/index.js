import {loginRequired} from "../../common/services/authentication";

export default {
    path: "loan",
    onEnter : loginRequired,
    getComponent: function(location, cb){
        require.ensure([], function(require){
            const component = require("../components/loan")["default"];
            cb(null, component);
        })
    }
}
