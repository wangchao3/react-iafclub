import {getParameterByName} from '../../../utils/utils'
export function setRefererr() {
    const source = getParameterByName('source');
    const inviterId = getParameterByName('inviterid');
    const refererr =  {
        source: source,
        inviterId: inviterId,
    }
    if(!refererr.source && !refererr.inviterId) return undefined;
    localStorage.setItem('refererr', JSON.stringify(refererr))
}

export function getRefererr() {
    const refererr = localStorage.getItem('refererr');
    if(!refererr) return null;
    return JSON.parse(refererr);
}