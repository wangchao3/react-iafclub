import React from 'react'
import IndexStore from '../stores/index'
import IndexActions from '../actions/index'
import HeaderActions from '../actions/header'
import {Link} from 'react-router'
import ProjectsNode from '../../projects/components/projects'
import style from '../styles/index'
import alt from '../../alt'
import FixedBar from '../../../components/fixedBar'

export default React.createClass({

    getInitialState: function(){
        return IndexStore.getState();
    },

    componentDidMount: function(){
        IndexStore.listen(this.onChange);
        HeaderActions.setTitle('首页')
        IndexActions.fetchProjects(0);
    },

    componentWillUnmount: function(){
        IndexStore.unlisten(this.onChange);
        alt.recycle(IndexStore);
    },

    onChange: function(state){
        this.setState(state);
    },

    changeFilter: function(e){
        e.preventDefault();
        let filterIndex = e.target.dataset['index'] / 1;
        IndexActions.changeFilter(filterIndex);
    },

    render: function(){
        let filters = this.state.filters.map((filter, idx) => {
            let selected = this.state.filterIndex === idx ? ' selected' : '';
            return (<a href="#" data-index={idx} key={idx} onClick={this.changeFilter} className={'filter-item' + selected}>{filter.label}</a>);
        });
        return (
            <div className="index">
                <FixedBar>
                    <div className="project-filters">
                        {filters}
                    </div>
                </FixedBar>
                <ProjectsNode className="index-projects" projects={this.state.projects} />
            </div>
        );
    }

})
