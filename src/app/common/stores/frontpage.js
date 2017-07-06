import alt from '../../alt'
import FrontpageActions from '../actions/frontpage'
import {request} from '../../../utils/request'
import {getJWT} from '../../common/services/authentication'
import {errorHandle} from '../../common/services/error'
import url from '../constants/url'

class FrontpageStore {

    constructor() {
        this.banners = [];
        this.news = null;
        this.projects = [];
        this.bindActions(FrontpageActions);
    }

    onGetBanner() {
        request
            .get(url.banner)
            .then((res) => {
                console.log(res);
                var objE = document.createElement("div");
                objE.innerHTML = res.data;
                var list = objE.getElementsByTagName('li');
                for(var i=0; i<list.length; i++){
                  var obj = {};
                  var img = list[i].getElementsByTagName('img');
                  obj.image = img[0].getAttribute('src');
                  var a = list[i].getElementsByTagName('a');
                  if(a.length){
                    obj.link = a[0].getAttribute('href');
                  }else{
                    obj.link = false;
                  }
                  this.banners.push(obj);
                }
                console.log(this.banners);
                this.emitChange();
            });
    }
}

export default alt.createStore(FrontpageStore, 'FrontpageStore')
