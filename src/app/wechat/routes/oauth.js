export default {
    path: "oauth",
    getComponent: function(location, cb) {
        require.ensure([], function(require) {
            const component = require("../components/oauth")["default"];
            cb(null, component);
        });
    },
}