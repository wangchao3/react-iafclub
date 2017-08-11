export default {
    path : "finance",
    getComponent : function(location, cb) {
        require.ensure([], function(require) {
            const component = require("../components/finance")["default"];
            cb(null, component);
        });
    }
}
