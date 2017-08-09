export default {
    path: "upload",
    getComponent: function(location, cb) {
        require.ensure([], function(require) {
            const component = require("../components/upload")["default"];
            cb(null, component);
        });
    }
}
