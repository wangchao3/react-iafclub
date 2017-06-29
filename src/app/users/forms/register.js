import t from 'tcomb-form'
import {Mobile, Password, SMSCode, ChineseName} from '../../../utils/formTypes'
import validator from '../../../utils/validator'
import React from 'react'
import verificationActions from '../../../components/actions/verification'
import {findDOMNode} from "react-dom";

export const User = t.struct({
    mobilePhone: Mobile,
    realName: ChineseName,
    password: Password,
    verificationCode: SMSCode
})

let template = function(local){
    let showVerification = function(e){
        //let mobile = findDOMNode(local);
        console.log(local);
    };
    return (
        <div>
            {local.inputs.mobilePhone}
            <div className="input-group">
                {local.inputs.verificationCode}
                <span className="btn btn-positive" onClick={showVerification}>获取验证码</span>
            </div>
            {local.inputs.realName}
            {local.inputs.password}
        </div>
    );
}

export const options = {
    template: template,
    auto: 'placeholders',
    fields: {
        mobilePhone: {
            attrs: {
                placeholder: '请填写手机号码'
            },
            error: validator.validateMobile
        },
        realName: {
            attrs: {
                placeholder: '请填写真实姓名'
            },
            error: function(s){
                return validator.validateChineseName(s, '真实姓名');
            }
        },
        password: {
            attrs: {
                placeholder: '请填写密码'
            },
            type: 'password',
            error: validator.validatePassword
        },
        verificationCode: {
            attrs: {
                placeholder: '请填写短信验证码'
            },
            error: validator.validateSmsCode
        }
    }
}