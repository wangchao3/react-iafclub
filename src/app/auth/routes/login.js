export default {
    path : "login",
    getComponent : function(location, cb) {
        require.ensure([], function(require) {
            const component = require("../components/login")["default"];
            cb(null, component);
        });
    }
}
