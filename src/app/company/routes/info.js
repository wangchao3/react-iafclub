export default {
    path : "info",
    getComponent : function(location, cb) {
        require.ensure([], function(require) {
            const component = require("../components/info")["default"];
            cb(null, component);
        });
    }
}
