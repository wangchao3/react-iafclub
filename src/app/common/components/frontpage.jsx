import React from 'react'
import HeaderActions from '../actions/header'
import {Link} from 'react-router'
import FrontpageActions from '../actions/frontpage'
import FrontpageStore from '../stores/frontpage'
import Spinner from '../../../components/spinner'
import alt from '../../alt'
import styles from '../styles/frontpage'
import Carousel from "../../../components/carousel"
import Footer from '../../../components/footer'
import Header from './header'

const Linkarray = (props) =>{
    const svgData = {
        img1: '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-home-holding"></use></svg>',
        img2: '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-home-safety"></use></svg>',
        img3: '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-home-trusteeship"></use></svg>',
    }
    return (
        <ul className="link-array">
            <li><svg dangerouslySetInnerHTML={{__html: svgData.img1 }} /><div>上市公司控股</div></li>
            <li><svg dangerouslySetInnerHTML={{__html: svgData.img2 }} /><div>保险本息保障</div></li>
            <li><svg dangerouslySetInnerHTML={{__html: svgData.img3 }} /><div>新浪资金托管</div></li>
        </ul>
    );
}

export default React.createClass({

    getInitialState: function() {
        return FrontpageStore.getState();
    },

    componentDidMount: function() {
        FrontpageStore.listen(this.onChange);
        HeaderActions.setTitle('精融汇');
        FrontpageActions.getBanner();
    },

    componentWillUnmount: function() {
        FrontpageStore.unlisten(this.onChange);
    },

    onChange: function(state){
        this.setState(state);
    },

    render: function(){
        const banners = this.state.banners;
        if(!banners) return (<Spinner />);
        const slidesNode = banners.map((slide, index) => {
            return (
                <a href={slide.link} key={index}><img src={slide.image} /></a>
            );
        });

        return(
            <div className="frontpage">
                <Header ref="header" />
                <Carousel className="index-slide">
                    {slidesNode}
                </Carousel>
                <div className="body-content">
                    <Linkarray />
                    <Link to="/auth/phone_check" className="btn btn-block">登录/注册</Link>
                </div>
                <Footer name="frontpage"/>
            </div>
        );
    },
})
