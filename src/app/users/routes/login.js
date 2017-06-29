import {isLogin} from '../../common/services/authentication';
import {checkWechatAuth} from '../../wechat/services/oauth'

export default {
    path: "login",
    onEnter: function(state, replace){
        if(isLogin()) return replace("/home");
        return checkWechatAuth();
    },
    indexRoute: {
        getComponent: function(location, cb) {
            require.ensure([], function(require){
                const component = require("../components/login")["default"];
                cb(null, component);
            })
        }
    },
    childRoutes: [
        {
            path: "forgot",
            getComponent: function(location, cb) {
                require.ensure([], function(require){
                    const component = require("../components/resetPassword")["default"];
                    cb(null, component);
                })
            }
        }
    ]
}