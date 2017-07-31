export default {
    path: "identity",
    getComponent: function(location, cb) {
        require.ensure([], function(require) {
            const component = require("../components/identity")["default"];
            cb(null, component);
        });
    }
}
