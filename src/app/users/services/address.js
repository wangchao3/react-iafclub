import {request} from '../../../utils/request';
import url from '../constants/url';
import {getJWT} from '../../common/services/authentication';

export function getAddresses() {
    const jwt = getJWT();
    if(!jwt) return Promise.reject("login required");
    return request.post(url.address_list, {jwt: jwt});
}
