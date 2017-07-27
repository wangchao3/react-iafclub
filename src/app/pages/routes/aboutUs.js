export default {
    path : "aboutUs",
    getComponent : function(location, cb) {
        require.ensure([], function(require) {
            const component = require("../components/aboutUs")["default"];
            cb(null, component);
        });
    }
}
