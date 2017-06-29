export default {
    getComponent: function(location, cb){
        require.ensure([], function(require){
            const component = require("../components/frontpage")["default"];
            cb(null, component);
        })
    }
}
