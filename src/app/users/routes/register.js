import {isLogin} from '../../common/services/authentication';

export default {
    path: "register",
    onEnter: function(state, replace){
        if(isLogin()) return replace("/home");
    },
    getComponent: function(location, cb){
        require.ensure([], function(require){
            const component = require("../components/register")["default"];
            cb(null, component);
        })
    }
}