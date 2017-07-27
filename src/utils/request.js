import defaults from 'superagent-defaults';
import axios from "axios";
import qs from "qs";
import Cookies from "js-cookie";
import {errorHandle} from '../app/common/services/error';

const token = Cookies.get("token") || "";

const config = {
    baseURL: "/",
    timeout: 1000 * 60 * 5,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    transformRequest: [function(data) {
            return qs.stringify(data)
        }
    ],
    responseType: "json"
}

if (token)
    config.headers.token = token;

let jsonConfig = JSON.parse(JSON.stringify(config));
jsonConfig.headers["Content-Type"] = "application/json; charset=UTF-8";
jsonConfig.transformRequest = [function(data) {
        return JSON.stringify(data)
    }
]

const responseInterceptors = {
    success: function(response) {
        // if (response.data.code && response.data.code !== "00000000") {
        //     return Promise.reject(response.data.msg);
        // }
        return response
    },
    fail: function(error) {
        errorHandle(error.status);
        return Promise.reject(error);
    }
}

const request = axios.create(config);
const jsonRequest = axios.create(jsonConfig);

request.interceptors.response.use(responseInterceptors.success, responseInterceptors.fail);
jsonRequest.interceptors.response.use(responseInterceptors.success, responseInterceptors.fail);

var superagent = defaults();

superagent.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set("token", token)

export default superagent;
export {request, jsonRequest}
