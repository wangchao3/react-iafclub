export default {
    path: "sms_notification",
    getComponent: function(location, cb) {
        require.ensure([], function(require) {
            const component = require("../components/sms")["default"];
            cb(null, component);
        });
    },
}
