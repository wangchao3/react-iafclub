export default {
    path: "password",
    getComponent: function(location, cb) {
        require([], function(require) {
            const component = require("../../users/components/resetPassword")["default"];
            cb(null, component);
        })
    }
}