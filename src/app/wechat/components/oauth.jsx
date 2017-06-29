import React from 'react'
import Spinner from '../../../components/spinner'
import WechatOauthActions from '../actions/oauth'
import WechatOauthStore from '../stores/oauth'
import HeaderActions from '../../common/actions/header'
import WechatRetryPage from './retry'
import WechatRegister from './register'

export default React.createClass({

    getInitialState: function() {
        return WechatOauthStore.getState();
    },

    componentDidMount: function() {
        const code = this.props.location.query.code;
        WechatOauthStore.listen(this.onChange);
        WechatOauthActions.getUserInfo(code);
        HeaderActions.setTitle('微信授权');
    },

    componentWillUnmount: function() {
        WechatOauthStore.unlisten(this.onChange);
    },

    onChange: function(state){
        this.setState(state);
    },

    onRegister: function(payload){
        WechatOauthActions.register(payload);
    },

    render: function(){
        if(this.state.err){
            return (
                <WechatRetryPage />
            );
        }else if(!this.state.jwt){
            return (<Spinner />);
        }else if(this.state.jwt === "NA"){
            return (
                <WechatRegister register={this.onRegister} />
            )
        }
    }
})
