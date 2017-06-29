import superagent, {request, jsonRequest} from '../../../utils/request';
import url from '../constants/url';
import MessageActions from '../../../components/actions/message';
import {auth, expires} from "../../common/services/authentication";
import Cookies from "js-cookie";

export const login = function(user) {
    return new Promise((resolve, reject) => {
        request.post("user/login", user).then((response)=> {
            const data = response.data;
            auth(data.data.jwt);
            resolve(data.data.jwt);
        }, (error)=> {
            if(error.status){
                MessageActions.show({message: error});
            } else {
                MessageActions.show({message: error});
            }
            return reject(error);
        })
    });
}

export const login_bind = function(user) {
    return new Promise((resolve, reject) => {
        request
        .post(url.login_bind, user)
        .then(function(res) {
            const body = res.data;
            if(body.error === 'NA'){
                auth(body.data.jwt)
            }
            const message = body.error !== 'NA' ? body.message : null;
            if(message){
                MessageActions.show({message: message});
                return reject(message);
            }
            resolve(body.data.jwt);
        })
        .catch(function(error) {
            reject(error);
            return MessageActions.show({message: error});
        })
    })
}

export const logout = function(refresh){
    expires(refresh);
}

export const register = function(user) {
    return new Promise((resolve, reject)=> {
        const inviterUuid = Cookies.get("inviteUID");
        if(inviterUuid) user.inviterUuid = inviterUuid;
        request
        .post(url.register, user)
        .then(function(res) {
            const body = res.data;
            if(body.error === 'NA'){
                auth(body.data.jwt);
                if(inviterUuid) Cookies.remove("inviteUID");
            };
            const message = body.error !== 'NA' ? body.message : null;
            if(message){
                MessageActions.show({message: message});
                return reject(message);
            }
            resolve(body.data.jwt);
        })
        .catch(function(error) {
            reject(error);
            return MessageActions.show({message: error});
        })
    })
}

export const register_bind = function(user, callback) {
    return new Promise((resolve, reject)=> {
        const inviterUuid = Cookies.get("inviteUID");
        if(inviterUuid) user.inviterUuid = inviterUuid;
        request
        .post(url.register_bind, user)
        .then(function(res) {
            const body = res.data;
            if(body.error === 'NA'){
                auth(body.data.jwt);
                if(inviterUuid) Cookies.remove("inviteUID");
            };
            const message = body.error !== 'NA' ? body.message : null;
            if(message){
                MessageActions.show({message: message});
                return reject(message);
            }
            resolve(body.data.jwt);
        })
        .catch(function(error) {
            reject(error);
            return MessageActions.show({message: error});
        })
    })
}

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
