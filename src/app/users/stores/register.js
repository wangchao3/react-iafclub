import alt from '../../alt'
import RegisterActions from '../actions/register'
import {register, register_bind} from '../services/auth'
import {errorHandle} from '../../common/services/error'

class RegisterStore {

    constructor() {
        this.user = null;
        this.jwt = null;
        this.err = null;
        this.mobile = null;
        this.authKey = null;
        this.provider = null;
        this.nickname = null;
        this.device = 'MOBILE';
        this.openid = null;
        this.picture = null;

        this.bindActions(RegisterActions);
    }

    onInitial(query) {
        if (query) {
            this.provider = query.provider;
            this.authKey = query.authKey;
            this.openid = query.openid;
            this.nickname = query.nickname;
            this.picture = query.image;
        }
    }

    onRegister(user) {
        if (this.provider) {
            this.err = null;
            user.nickname = this.nickname;
            user.provider = this.provider;
            user.authkey = this.authKey;
            user.openid = this.openid;
            user.device = this.device;
            user.picture = this.picture;
            register_bind(user).then((jwt) => {
                this.jwt = jwt;
                this.emitChange();
            })
            .catch((err) => {
                this.err = err;
                if(err && err.indexOf('不存在') !== -1) this.user = null;
                this.emitChange();
            })
        }else {
            register(user).then((jwt) => {
                this.jwt = jwt;
                this.emitChange();
            })
            .catch((err) => {
                this.err = err;
                if(err && err.indexOf('不存在') !== -1) this.user = null;
                this.emitChange();
            });
        }
    }

    onUpdate(user) {
        this.user = user;
    }

}

export default alt.createStore(RegisterStore, 'RegisterStore')
