import alt from '../../alt'
import request from '../../../utils/request'
import LoginActions from '../actions/login'
import {login, login_bind} from '../../users/services/auth'

class LoginStore {

    constructor() {
        this.user = null;
        this.jwt = null;
        this.err = null;
        this.authKey = null;
        this.provider = null;
        this.device = 'MOBILE';
        this.openid = null;
        this.redirect = {to:'home'};

        this.bindActions(LoginActions);
    }

    onInitial(query) {
        if (query) {
            this.provider = query.provider;
            this.authKey = query.authKey;
            this.openid = query.openid;
        }
    }

    onLogin(user) {
        if (this.provider) {
            this.err = null;
            user.provider = this.provider;
            user.authkey = this.authKey;
            user.openid = this.openid;
            user.device = this.device;
            login_bind(user).then((jwt) => {
                this.jwt = jwt;
                this.emitChange();
            })
            .catch((err) => {
                this.err = err;
                if(err && err.indexOf('不存在') !== -1) this.user = null;
                this.emitChange();
            })
        }else {
            this.err = null;
            login(user).then((jwt) => {
                this.jwt = jwt;
                this.emitChange();
            })
            .catch((err) => {
                this.err = err;
                if(err && err.indexOf('不存在') !== -1) this.user = null;
                this.emitChange();
            })
        }
    }

    onSetUser(value) {
        this.user = value;
    }

    onSetRedirect(redirect) {
        this.redirect = redirect;
    }

}

export default alt.createStore(LoginStore, 'LoginStore')
