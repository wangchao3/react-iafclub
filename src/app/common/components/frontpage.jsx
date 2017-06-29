import React from 'react'
import HeaderActions from '../../common/actions/header'
import {Link} from 'react-router'
import FrontpageActions from '../actions/frontpage'
import FrontpageStore from '../stores/frontpage'
import Spinner from '../../../components/spinner'
import alt from '../../alt'
import styles from '../styles/frontpage'
import Carousel from "../../../components/carousel"
import Footer from '../../../components/footer'

const Linkarray = (props) =>{
    return (
        <ul className="link-array">
            <li><img src="/assets/images/index/1.png" /><div>上市公司控股</div></li>
            <li><img src="/assets/images/index/2.png" /><div>保险本息保障</div></li>
            <li><img src="/assets/images/index/3.png" /><div>新浪资金托管</div></li>
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
    },

    componentWillUnmount: function() {
        FrontpageStore.unlisten(this.onChange);
    },

    onChange: function(state){
        this.setState(state);
    },

    render: function(){
        const banners = [
            {
                image: "https://m.iafclub.com/uploadfile/2017/0527/20170527104018789.jpg",
                message: "first banner",
                url: "https://m.iafclub.com/mobile-theme/2017_invite/index.html",
            },
            {
                image: "https://m.iafclub.com/uploadfile/2017/0519/20170519045136927.jpg",
                message: "second banner",
                url: "https://m.iafclub.com/#/notice/show/1457",
            }
        ]
        const slidesNode = banners.map((slide, index) => {
            return (
                <a href={slide.url} key={index}><img src={slide.image} /></a>
            );
        })
        return(
            <div className="frontpage">
                <Carousel className="index-slide">
                    {slidesNode}
                </Carousel>
                <Linkarray />
                <Footer name="frontpage"/>
            </div>
        );
    },
})
