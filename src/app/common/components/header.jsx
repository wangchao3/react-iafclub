import React from 'react'
import HeaderStore from '../stores/header'
import HeaderActions from '../actions/header'
import styles from '../styles/header'
import alt from '../../alt'
import Navigation from './nav'

export default React.createClass({

    getInitialState: function(){
        return HeaderStore.getState();
    },

    componentWillMount: function() {
        if(!this.state.visible) HeaderActions.show();
    },

    componentDidMount: function(){
        HeaderStore.listen(this.onChange);
    },

    componentWillUnmount: function(){
        HeaderStore.unlisten(this.onChange);
        alt.recycle(HeaderStore);
    },

    onChange: function(state){
        this.setState(state);
    },

    render: function(){
        let visibleKlass = this.state.visible ? '' : ' hide';
        return (
            <header className={"bar bar-nav global-header" + visibleKlass}>
                <h1 className="title">{this.state.title}</h1>
                <Navigation />
            </header>
        );
    }

})
