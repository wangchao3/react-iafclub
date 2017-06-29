import React from 'react'
import styles from './styles/messageCard'

export default React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired
    },

    render: function(){
        return (
            <div className={"message-card " + this.props.className}>
                <div className="card-header">
                    <h4>{this.props.title}</h4>
                </div>
                <div className="card-content">{this.props.children}</div>
            </div>
        );
    } 
})