import alt from '../../alt'
import {request} from '../../../utils/request'
import IndexActions from '../actions/index'
import url from '../constants/url'
import {FILTERS} from '../constants/index'
import {errorHandle} from '../../common/services/error'

class IndexStore {
    constructor() {
        this.projects = null;
        this.filterIndex = 0;
        this.errMsg = null;
        this.filters = FILTERS.slice(0, 2);
        this.user = null;

        this.bindListeners({
            handleFetchProjects: IndexActions.FETCH_PROJECTS,
            changeFilter: IndexActions.CHANGE_FILTER,
        });
    }

    handleFetchProjects() {
        this.projects = null;
        let filter = this.filters[this.filterIndex].name
        request
        .get(url.project_list, {params: {status: filter,pageSize:100}})
        .then((res) => {
            const data = res.data;
            if(data.error !== 'NA') return false;
            this.projects = data.list;
            this.emitChange()
        })
    }

    changeFilter(filterIndex) {
        if(this.filterIndex === filterIndex) return false;
        this.filterIndex = filterIndex;
        this.handleFetchProjects();
    }
}

export default alt.createStore(IndexStore, 'IndexStore')
