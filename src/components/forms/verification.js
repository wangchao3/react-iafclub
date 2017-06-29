import t from 'tcomb-form'
import {Captcha} from '../../utils/formTypes'
import validator from '../../utils/validator'

export const Type = t.struct({
    code: Captcha
})

export var options = {
    auto: 'placeholders',
    fields: {
        code: {
            attrs: {
                placeholder: '请填写图片验证码',
            },
            error: validator.validateCaptch
        }
    }
}