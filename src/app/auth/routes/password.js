export default {
    path: "password",
    getComponent: function(location, cb) {
        require.ensure([], function(require) {
            const component = require("../components/password")["default"];
            cb(null, component);
        });
    },
}
