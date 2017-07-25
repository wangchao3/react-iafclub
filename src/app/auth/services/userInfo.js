export function saveUserInfoToLocal(key, data) {
    if (!data)
        return false;
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        window.authentication = {}
        window.authentication[key] = data;
    };
}

export function getUserInfoFromLocal(key) {
    let data = localStorage.getItem(key);
    if (!data) {
        data = window.authentication && window.authentication[key];
    } else {
        data = JSON.parse(data);
    }
    return data;
}
