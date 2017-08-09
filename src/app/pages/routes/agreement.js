export default {
    path : "agreement",
    getComponent : function(location, cb) {
        require.ensure([], function(require) {
            const component = require("../components/agreement")["default"];
            cb(null, component);
        });
    }
}
