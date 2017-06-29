import React from 'react'
import styles from './styles/pcTip'

export default React.createClass({

    propTypes: {
        tip: React.PropTypes.string
    },

    render: function(){
        return (
            <div className="pc-tip">{this.props.tip ? this.props.tip : '温馨提示：该功能还未上线，工程师们正在加班加点开发中'}</div>
        );
    }
})