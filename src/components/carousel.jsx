import React from "react";
import cx from "classnames";
import styles from "./styles/carousel";
import {findDOMNode} from "react-dom";

export default React.createClass({
    propTypes: {
        time: React.PropTypes.number,
        className: React.PropTypes.string,
        minDistance: React.PropTypes.number,
    },

    containerWidth: 0,

    componentDidMount: function() {
        this.containerWidth = findDOMNode(this).offsetWidth;
        if(this.props.children.length === 1) return this.enabled = false;
        this.scrollLeft();
        this.start();
    },

    getInitialState: function() {
        return {
            index: 1,
            transition: false,
            distance: 0,
        };
    },

    getPosition: function(){
        const positionX = -this.containerWidth * this.state.index;
        if(this.state.distance) return positionX + this.state.distance;
        return positionX;
    },

    interval: null,

    start: function() {
        const time = this.props.time ? this.props.time : 3000;
        this.interval = setInterval(()=> {
            this.scrollLeft();
        }, time);
    },

    scrollLeft: function() {
        const childrenLen = this.props.children.length;
        let index = this.state.index;
        if(this.state.index === childrenLen){
            this.setState({index: index + 1, transition: true});
            // we can't setState in setState's callback, React will ignore the first one, so we have to do some break
            return setTimeout(()=>this.setState({transition: false, index: 1}), 300);
        }
        this.setState({index: index + 1, transition: true});
    },

    scrollRight: function() {
        const childrenLen = this.props.children.length;
        let index = this.state.index;
        if(this.state.index === 1){
            this.setState({index: index - 1, transition: true});
            // we can't setState in setState's callback, React will ignore the first one, so we have to do some break
            return setTimeout(()=>this.setState({transition: false, index: childrenLen}), 300);
        }
        this.setState({index: index - 1, transition: true});
    },

    stop: function() {
        clearInterval(this.interval);
    },

    componentWillUnmount() {
        this.stop();
    },

    startPointer: {
        x: 0,
        y: 0,
    },

    endPointer: {
        x: 0,
        y: 0,
    },

    onTouchStart: function(e) {
        this.stop();
        this.setState({transition: false});
        this.startPointer.x = e.touches[0].clientX;
    },

    onTouchMove: function(e) {
        const distance = this.startPointer.x - e.touches[0].clientX;
        this.startPointer.x = e.touches[0].clientX;
        this.setState({distance: this.state.distance + -distance});
    },

    onTouchEnd: function(){
        const minDistance = this.props.minDistance ? this.props.minDistance : 100;
        const distance = this.state.distance;
        if(distance < 0 && distance <= -minDistance) {
            this.scrollLeft();
        }else if(distance > 0 && distance >= minDistance) {
            this.scrollRight();
        }
        this.setState({distance: 0});
        this.start();
    },

    render: function() {
        const children = this.props.children;
        const classNames = cx("carousel", this.props.className);
        if(children.length === 1){
            return (
                <div className={classNames}>{children}</div>
            );
        }
        if(!children) return (<div>组件调用错误, 请传入 childNone</div>);
        let slideData = children.concat(children[0]);
        slideData.unshift(children[children.length -1]);
        const slideNode = slideData.map((item, index) => {
            return (
                <div
                    className="carousel-item"
                    key={index}
                    style={{width: this.containerWidth + 'px'}}
                >
                    {item}
                </div>
            );
        });
        return (
            <div className={classNames}>
                <div className="carousel-container"
                    ref="carouselContainer"
                    onTouchStart={this.onTouchStart}
                    onTouchEnd={this.onTouchEnd}
                    onTouchMove={this.onTouchMove}
                    style={{
                        "width": (this.containerWidth * (children.length + 2)) + "px",
                        "transform": "translate3d(" + this.getPosition() + "px, 0, 0)",
                        "transition": this.state.transition ? "transform .3s" : "none",
                    }}
                >
                    {slideNode}
                </div>
            </div>
        )
    }
})
