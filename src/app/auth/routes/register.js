export default {
    path : "register",
    getComponent : function(location, cb) {
        require.ensure([], function(require) {
            const component = require("../components/register")["default"];
            cb(null, component);
        });
    }
}
