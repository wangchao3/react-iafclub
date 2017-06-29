import {isWechat} from '../app/wechat/services/wechat';
import $ from "jquery";

export default {
    componentDidMount() {
        const title = this.title;
        if(!title) return undefined;
        document.title = title;
        if(!isWechat()) return undefined;
        const $iframe = $("<iframe style='display:none;' src='/assets/images/index/LOGO.png'></iframe>");
        $iframe.on('load',function() {
          setTimeout(function() {
            $iframe.off('load').remove();
          }, 0);
        }).appendTo($body);
    }
}
