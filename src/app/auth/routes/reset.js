export default {
    path : "reset",
    getComponent : function(location, cb) {
        require.ensure([], function(require) {
            const component = require("../components/reset")["default"];
            cb(null, component);
        });
    }
}
