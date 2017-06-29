import t from 'tcomb-form'
import {Password, Account} from '../../../utils/formTypes'
import validator from '../../../utils/validator'

export const User = t.struct({
    username: t.Str,
    password: Password
})

export const options = {
    auto: 'placeholders',
    fields: {
        username: {
            attrs: {
                placeholder: '请输入您的手机号码/邮箱'
            },
            error: validator.validateAccount
        },
        password: {
            type: 'password',
            attrs: {
                placeholder: '请输入您的登录密码'
            },
            error: validator.validatePassword
        }
    }
}