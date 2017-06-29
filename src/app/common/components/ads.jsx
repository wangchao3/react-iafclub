import React from 'react'
import AdsStore from '../stores/ads'
import AdsActions from '../actions/ads'
import styles from '../styles/ads'
import alt from '../../alt'

export default React.createClass({

    getInitialState: function(){
        return AdsStore.getState();
    },

    componentDidMount: function(){
        AdsStore.listen(this.onChange);
    },

    componentWillUnmount: function(){
        AdsStore.unlisten(this.onChange);
        alt.recycle(AdsStore);
    },

    onChange: function(state){
        this.setState(state);
    },

    render: function(){
        const slide = this.state.banner;
        let visibleKlass = this.state.visible ? '' : ' hide';
        if (!slide || !slide.length > 0) {
            return (
                <div />
            )
        }else {
            return (
                <div className={"ads" + visibleKlass}>
                    <a href={slide[0].url}><img src={slide[0].image} /></a>
                </div>
            );
        }
    }

})
