import alt from '../../alt'
import {request} from '../../../utils/request'
import ListActions from '../actions/list'
import url from '../constants/url'
import {FILTERS} from '../constants/list'
import {errorHandle} from '../../common/services/error'

class ListStore {
    constructor() {
        this.products = null;
        this.filterIndex = 0;
        this.errMsg = null;
        this.filters = FILTERS.slice(0, 3);

        this.bindListeners({
            handleFetchProducts: ListActions.FETCH_PRODUCTS,
            changeFilter: ListActions.CHANGE_FILTER,
        });
    }

    handleFetchProducts() {
        this.products = null;
        let productListApi = this.filters[this.filterIndex].url;
        request
        .get(productListApi)
        .then((res) => {
            const data = res.data;
            if(data.responseCode !== '00') return false;
            if(this.filterIndex == '2') {
                this.products = data.content.assignmentList;
            }else {
                this.products = data.content.array;
            }
            this.emitChange();
        })
    }

    changeFilter(filterIndex) {
        if(this.filterIndex === filterIndex) return false;
        this.filterIndex = filterIndex;
        this.handleFetchProducts();
    }
}

export default alt.createStore(ListStore, 'ListStore')
