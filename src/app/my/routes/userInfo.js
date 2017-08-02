export default {
    path: "userInfo",
    getComponent: function(location, cb) {
        require.ensure([], function(require) {
            const component = require("../components/userInfo")["default"];
            cb(null, component);
        });
    },
}
