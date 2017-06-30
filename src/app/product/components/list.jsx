import React from 'react'
import ListStore from '../stores/list'
import ListActions from '../actions/list'
import HeaderActions from '../../common/actions/header'
import {Link} from 'react-router'
import alt from '../../alt'
import FixedBar from '../../../components/fixedBar'

export default React.createClass({

    getInitialState: function(){
        return ListStore.getState();
    },

    componentDidMount: function(){
        ListStore.listen(this.onChange);
        HeaderActions.setTitle('投资')
        ListActions.fetchProducts(0);
    },

    componentWillUnmount: function(){
        ListStore.unlisten(this.onChange);
    },

    onChange: function(state){
        this.setState(state);
    },

    changeFilter: function(e){
        e.preventDefault();
        let filterIndex = e.target.dataset['index'] / 1;
        ListActions.changeFilter(filterIndex);
    },

    render: function(){
        let filters = this.state.filters.map((filter, idx) => {
            let selected = this.state.filterIndex === idx ? ' selected' : '';
            return (<a href="#" data-index={idx} key={idx} onClick={this.changeFilter} className={'filter-item' + selected}>{filter.label}</a>);
        });
        return (
            <div className="index">
                <FixedBar>
                    <div className="list-filters">
                        {filters}
                    </div>
                </FixedBar>

            </div>
        );
    }

})
