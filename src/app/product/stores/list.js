import alt from '../../alt'
import {request} from '../../../utils/request'
import IndexActions from '../actions/index'
import url from '../constants/url'
import {FILTERS} from '../constants/index'
import {errorHandle} from '../../common/services/error'

class ListStore {
    constructor() {
        this.products = null;
        this.filterIndex = 0;
        this.errMsg = null;
        this.filters = FILTERS.slice(0, 2);

        this.bindListeners({
            handleFetchProducts: IndexActions.FETCH_PRODUCTS,
            changeFilter: IndexActions.CHANGE_FILTER,
        });
    }

    handleFetchProducts() {
        this.products = null;
        let filter = this.filters[this.filterIndex].name
        request
        .get(url.list, {params: {status: filter,pageSize:100}})
        .then((res) => {
            const data = res.data;
            if(data.error !== 'NA') return false;
            this.products = data.list;
            this.emitChange()
        })
    }

    changeFilter(filterIndex) {
        if(this.filterIndex === filterIndex) return false;
        this.filterIndex = filterIndex;
        this.handleFetchProducts();
    }
}

export default alt.createStore(ListStore, 'ListStore')
