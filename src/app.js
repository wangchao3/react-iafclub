import React from 'react';
import {render} from "react-dom";
import {Router, browserHistory} from "react-router";
import {setRootPath} from './app/wechat/services/wechat';
import {setRefererr} from './app/common/services/app';
import rootRoute from "./routes";
import {polyfill} from "es6-promise";
// import {addPageAccessLog} from "./utils/utils";
//
// browserHistory.listen(function(ev) {
//     addPageAccessLog();
// });

render(
    <Router history={browserHistory} routes={rootRoute} />,
    document.getElementById("globalMountNode")
)

setRootPath();
setRefererr();
polyfill();
