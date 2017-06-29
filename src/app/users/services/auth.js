import superagent, {request, jsonRequest} from '../../../utils/request';
import {auth, expires} from "../../common/services/authentication";
import Cookies from "js-cookie";

export function oneTimeTokenLogin(token) {
    return new Promise((resolve, reject)=> {
        request.post("/user/oneTimeToken/login", {token: token}).then((response)=>{
            const data = response.data.data;
            if(response.data.error !== "NA") return reject(new Error(response.data.message));
            if(!data || data.jwt || data.userData || data.userData.userId) return reject(new Error("服务器错误"));
            return resolve(data);
        }, (error)=>{
            return reject(new Error(error));
        })
    })

}
