import {Navigation, State} from 'react-router'
import LoginRequired from './loginRequiredMixin'

const LoginRequiredMixins = [Navigation, State, LoginRequired];

export default LoginRequiredMixins