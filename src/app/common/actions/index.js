import alt from '../../alt'

class IndexActions{

    fetchProjects(orderBy) {
        return orderBy;
    }

    changeFilter(filterIndex){
        return filterIndex;
    }

}

export default alt.createActions(IndexActions)
