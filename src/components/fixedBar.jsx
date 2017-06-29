import React from 'react'
import styles from './styles/fixedBar'
import {findDOMNode} from "react-dom";

export default React.createClass({

    position: 'absolute',

    offsetTop: 0,

    onScroll: function(){
        const node = findDOMNode(this.refs.node);
        const content = findDOMNode(this.refs.content);
        const scrollTop = document.getElementsByTagName('body')[0].scrollTop;
        if(this.position !== 'fixed' && scrollTop > this.offsetTop){
            content.style.position = 'fixed';
            this.position = 'fixed';
            node.className += ' fixed';
        };
        if(this.position !== 'absolute' && scrollTop < this.offsetTop){
            this.position = 'absolute';
            content.style.position = 'absolute'
            node.className = node.className.replace(' fixed', '');
        }
    },

    componentDidMount: function() {
        const node = findDOMNode(this.refs.node);
        const content = findDOMNode(this.refs.content);
        node.style.paddingTop = content.offsetHeight + 'px';
        this.offsetTop = node.getBoundingClientRect().top + document.getElementsByTagName('body')[0].scrollTop;
        document.addEventListener('scroll', this.onScroll);
    },

    componentWillUnmount: function() {
        document.removeEventListener('scroll', this.onScroll);
    },

    render: function(){
        return (
            <div className="fixed-bar" ref="node">
                <div className="fixed-bar-content" ref="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
})