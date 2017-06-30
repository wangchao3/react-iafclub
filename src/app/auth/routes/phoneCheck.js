export default {
    path: "phone_check",
    getComponent: function(location, cb) {
        require.ensure([], function(require) {
            const component = require("../components/phoneCheck")["default"];
            cb(null, component);
        });
    },
}
