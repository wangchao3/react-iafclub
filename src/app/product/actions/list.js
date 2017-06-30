import alt from '../../alt'

class IndexActions{

    fetchProducts(orderBy) {
        return orderBy;
    }

    changeFilter(filterIndex){
        return filterIndex;
    }

}

export default alt.createActions(IndexActions)
