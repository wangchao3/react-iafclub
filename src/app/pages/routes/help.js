export default {
    path : "help",
    getComponent : function(location, cb) {
        require.ensure([], function(require) {
            const component = require("../components/help")["default"];
            cb(null, component);
        });
    }
}
