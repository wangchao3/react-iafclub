export default {
    path: "record",
    getComponent: function(location, cb) {
        require.ensure([], function(require) {
            const component = require("../components/record.jsx")["default"];
            cb(null, component);
        });
    }
}
