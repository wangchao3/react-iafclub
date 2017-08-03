export default {
    path: "changeCard",
    getComponent: function(location, cb) {
        require.ensure([], function(require) {
            const component = require("../components/changeCard")["default"];
            cb(null, component);
        });
    },
}
