export default {
    path : "forgot",
    getComponent : function(location, cb) {
        require.ensure([], function(require) {
            const component = require("../components/forgot")["default"];
            cb(null, component);
        });
    }
}
