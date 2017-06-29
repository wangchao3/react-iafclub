export default function imageCropper(opt){
    return ('/api/image/load?url='+ opt.url +'&action=RESIZE&width='+ opt.width +'&height='+ opt.height +'&offset=TOP_LEFT');
}

export function pictureSize(url){
    const opt = {
        url: url,
        width: 720,
        height: 200
    };
    return imageCropper(opt);
}

export function smallSize(url){
    const opt = {
        url: url,
        width: 50,
        height: 50
    };
    return imageCropper(opt);
}

export function thumbnailSize(url){
    const opt = {
        url: url,
        width: 720,
        height: 200
    };
    return imageCropper(opt);
}

export function tinySize(url){
    const opt = {
        url: url,
        width: 30,
        height: 30
    };
    return imageCropper(opt);
}

export function projectTinySize(url){
    const opt = {
        url: url,
        width: 62,
        height: 40
    };
    return imageCropper(opt);
}

export function activitySize(url){
    const opt = {
        url: url,
        width: 77,
        height: 57
    };
    return imageCropper(opt);
}

export function detailSize(url){
    const opt = {
        url: url,
        width: 40,
        height: 40
    };
    return imageCropper(opt);
}

export const tinyAvatar = tinySize
