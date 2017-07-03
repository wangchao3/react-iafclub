import React from 'react'
import ListStore from '../stores/list'
import ListActions from '../actions/list'
import HeaderActions from '../../common/actions/header'
import {Link} from 'react-router'
import alt from '../../alt'
import FixedBar from '../../../components/fixedBar'
import Spinner from '../../../components/spinner'
import styles from '../styles/list'
import {textLimit} from '../../../utils/utils'

const Product = (props)=>{
    const product = props.product;
    product.loanRate = product.loanRate ? product.loanRate : product.assignmentRate;
    product.projectName = product.projectName ? product.projectName : textLimit(product.assignmentName, 14);
    return (
        <div className="product">
            <Link to={`/product/${product.projectId}`}>
                <div className="product-header">
                    <h2>{product.projectName}</h2>
                    <div className="remain">剩余{product.remainAmount/100}元</div>
                </div>
                <div className="product-body">
                    <div className="product__interest-rate">
                        <span className="size36">{product.loanRate}</span>%
                    </div>
                    <div className="product__details">
                        <div className="divider">
                            <div>期限{product.loanTerm}{product.loanTermFlagName}</div>
                            <div>{product.paymentMethodName}</div>
                        </div>
                    </div>
                </div>
                <div className="product-footer">
                    <p>{product.insurerTypeName}</p>
                </div>
            </Link>
        </div>
    );
}

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
        console.log(e.target.dataset);
        ListActions.changeFilter(filterIndex);
    },

    render: function(){
        let filters = this.state.filters.map((filter, idx) => {
            let selected = this.state.filterIndex === idx ? ' selected' : '';
            return (
                <a href="#" data-index={idx} key={idx} onClick={this.changeFilter} className={'filter-item' + selected}>{filter.label}</a>
            );
        });
        const products = this.state.products;
        if(!products){
            return (
                <Spinner />
            );
        }else {
            const productNode = products.map((product, index) => {
                return (<Product key={index} product={product} />)
            });
            return (
                <div className="product-list">
                    <FixedBar>
                        <div className="list-filters">
                            {filters}
                        </div>
                    </FixedBar>
                    {productNode}
                </div>
            );
        }
    }

})
