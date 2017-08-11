export default {
    path : "index",
    getComponent : function(location, cb) {
        require.ensure([], function(require) {
            const component = require("../components/index")["default"];
            cb(null, component);
        });
    }
}
