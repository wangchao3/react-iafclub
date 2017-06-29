import React from 'react'
import cx from 'classnames'
import styles from './styles/zoomableImage'
import {findDOMNode} from "react-dom";

export default React.createClass({
    propTypes: {
        url: React.PropTypes.string
    },

    getInitialState: function() {
        return {
            active: false
        };
    },

    gestureMovedDistance: 0,

    startDistance: 0,

    movedDistance: {x:0, y:0},

    startPoint: null,

    lastDistance: {x:0, y:0},

    endDistance: 0,

    gesture: false,

    getGestureDistance: function(e){
        const touches = e.touches
        return Math.sqrt(
            (touches[0].clientX-touches[1].clientX) * (touches[0].clientX-touches[1].clientX) +
            (touches[0].clientY-touches[1].clientY) * (touches[0].clientY-touches[1].clientY)
        );
    },

    getMovedDistance: function(e){
        const touch = e.touches[0]
        return {
            x: touch.clientX - this.startPoint.x,
            y: touch.clientY - this.startPoint.y
        }
    },

    getPositon: function(node, scale){
        const height = node.clientHeight;
        const width = node.clientWidth;
        return {
            height: height * scale / 8,
            width: width * scale / 8
        }
    },

    onTouchStart: function(e){
        const touch = e.touches[0];
        this.startPoint = {
            x: touch.clientX,
            y: touch.clientY
        };
        if(!this.endPoint){
            this.endPoint = {
                x: touch.clientX,
                y: touch.clientY
            }
        }
        if(e.touches.length === 2){
            this.gesture = true;
            this.startDistance = this.getGestureDistance(e);
        }
    },

    onTouchMove: function(e){
        e.preventDefault();
        if(this.gesture){
            const gestureMovedDistance = 
            this.gestureMovedDistance = this.getGestureDistance(e) - this.startDistance + this.endDistance;
            let scale = 1 + (this.gestureMovedDistance / 100);
            scale = scale > 0.1 ? scale : 0.1;
            const position = this.getPositon(e.target, scale);
            e.target.style.transform =  'scale('+ scale + ') ';
        }else{
            const container = findDOMNode(this.refs.container);
            this.movedDistance = this.getMovedDistance(e);
            const x = this.movedDistance.x + this.lastDistance.x + 'px';
            const y = this.movedDistance.y + this.lastDistance.y + 'px';
            container.style.transform = 'translate3d('+ x +', '+ y +', 0)';
        }
    },

    onTouchEnd: function(e){
        this.startPoint = null;
        if(this.gesture){
            this.gesture = false;
            this.endDistance = this.gestureMovedDistance;
        }else{
            this.lastDistance.x += this.movedDistance.x;
            this.lastDistance.y += this.movedDistance.y;
        }
    },

    onClick: function(){
        this.hide();
    },

    hide: function(){
        this.lastDistance = {x:0, y: 0};
        this.setState({active: false}, function(){
            findDOMNode(this.refs.image).style.transform = '';
            findDOMNode(this.refs.container).style.transform = '';
        });
    },

    show: function(){
        this.startPoint = null;
        this.gestureMovedDistance = 0;
        this.endDistance = 0;
        this.startDistance = 0;
        this.movedDistance = {x:0, y:0};
        this.setState({active: true});
    },

    componentWillReceiveProps: function(nextProps) {
        if(nextProps.url){
            this.show();
        }
    },

    componentWillUpdate: function(nextProps, nextState) {
        if(this.gesture) this.gesture = false;
    },

    render: function(){
        if(!this.props.url) return (<div />);
        const classes = cx({
            'show': this.state.active
        })
        return (
            <div className={cx("zoomable-image", classes)} onClick={this.onClick}>
                <div className="mask"></div>
                <div className="image-wrapper">
                    <div className="container-container" ref="container">
                        <img src={this.props.url} onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd} ref="image" />
                    </div>
                </div>
            </div>
        );
    }
})