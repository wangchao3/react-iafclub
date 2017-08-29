import {request} from "./request";

export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function getLeftDays(end) {
    const endTime = new Date(end).getTime();
    const now = new Date().getTime();
    if(endTime <= now) return 0;
    return parseInt((endTime - now) / (1000*60*60*24))
}

export function textLimit(text, max){
    if(!text) return "未知";
    return text.length > max ? text.substring(0, max) : text;
}

export function formatDateTime(date) {
    if(typeof date === "number" && date <= 0) throw new Error('invlid time');
    const dateTime = new Date(date);
    const year = dateTime.getFullYear();
    const month = formatTimeDisplay(dateTime.getMonth() + 1);
    const dates = formatTimeDisplay(dateTime.getDate());
    const hour = formatTimeDisplay(dateTime.getHours());
    const minute = formatTimeDisplay(dateTime.getMinutes());
    return year + '-' + month + '-' + dates + ' ' + hour + ':' + minute;
}

export function formatDateTime2(date) {
    if(typeof date === "number" && date <= 0) throw new Error('invlid time');
    const dateTime = new Date(date);
    const year = dateTime.getFullYear();
    const month = formatTimeDisplay(dateTime.getMonth() + 1);
    const dates = formatTimeDisplay(dateTime.getDate());
    return year + '-' + month + '-' + dates ;
}

export function formatDateTime3(date) {
    if(typeof date === "number" && date <= 0) throw new Error('invlid time');
    const dateTime = new Date(date);
    const year = dateTime.getFullYear();
    const month = formatTimeDisplay(dateTime.getMonth() + 1);
    return year + '-' + month ;
}

function formatTimeDisplay(number) {
    return number < 10 ? '0' + number : number;
}

export function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.platform);
}

export function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(location.search.toLowerCase());
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export function addPageAccessLog() {
    var data = {
        requestUri: location.href,
        requestTime: new Date().getTime(),
        referer: document.referrer
    };
    if(YC.current_user) data.userId = YC.current_user.userId;
    request.post("/accesslog/add", data).then(()=> console.log("😬"), ()=> console.log("😱"));
}
