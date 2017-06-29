import ErrorHandleActions from '../actions/error'

export function errorHandle(err, res){
    ErrorHandleActions.active(err);
}