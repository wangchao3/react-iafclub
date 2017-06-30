export default {
    path: "company_login",
    getComponent: function(location, cb) {
        require.ensure([], function(require) {
            const component = require("../components/companyLogin")["default"];
            cb(null, component);
        });
    },
}
