module.exports = function(req, res){
    console.log(req.query)
    var jwt = req.query.jwt;
    var returnUrl = req.protocol + '://' + req.get('host') + req.path;
    var isCallback = req.query.callback;
    var passwordToken = req.query.paytk;
    if (jwt){
        return res.send (
            "<html>\
                <head></head>\
                <body>\
                    <form id='tokenForm' action='/api/funds/yjf/requestPasswordTokenPage' method='post'>\
                        <input name='jwt' value='"+ jwt +"' type='hidden' / >\
                        <input name='postReturnUrl' value='"+ returnUrl +"' type='hidden' />\
                    </form>\
                </body>\
            <html>"
        );
    } else if (passwordToken){
        return res.send (
            "<html>\
                <script>\
                    parent.MYC.setPassToken(" + passwordToken + ");\
                </script>\
            <html>"
        );
    }
}
