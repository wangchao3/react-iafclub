export default {
    path: "home",
    getComponent: function(location, cb) {
        require.ensure([], function(require) {
            const component = require("../components/home")["default"];
            cb(null, component);
        });
    },
}
