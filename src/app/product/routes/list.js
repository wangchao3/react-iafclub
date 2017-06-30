export default {
    path: "list",
    getComponent: function(location, cb) {
        require.ensure([], function(require) {
            const component = require("../components/list")["default"];
            cb(null, component);
        });
    },
}
