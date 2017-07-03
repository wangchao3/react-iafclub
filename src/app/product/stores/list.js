import alt from '../../alt'
import {request} from '../../../utils/request'
import ListActions from '../actions/list'
import url from '../constants/url'
import {FILTERS} from '../constants/index'
import {errorHandle} from '../../common/services/error'
import axios from "axios";

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
        let filter = this.filters[this.filterIndex].name
        // fetch products API


        axios.get('/jrrest/investments')
            .then(function (response) {
                console.log(response);
            })

    }

    changeFilter(filterIndex) {
        if(this.filterIndex === filterIndex) return false;
        this.filterIndex = filterIndex;
        this.handleFetchProducts();

    }
}

export default alt.createStore(ListStore, 'ListStore')
