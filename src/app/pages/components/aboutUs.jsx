import React from 'react'
import HeaderActions from '../../common/actions/header'
import Header from '../../common/components/header'
import styles from '../styles/aboutUs'

export default React.createClass({
    componentDidMount: function() {
        HeaderActions.setTitle('关于特华小贷');
    },

    render: function() {
        return (
            <div className="AboutUs">
                <Header ref="header"/>
                <img className="head-img" src="/assets/images/perindex/about-us.jpg"/>
                <div className="body-content">
                    <p className="tiny-title">公司简介</p>
                    <p>“特华小贷”全称“广州市特华互联网小额贷款股份有限公司”，由特华投资、精达股份（股票代码：600577）、精达矿业共同发起，于2017年X月在广州设立，注册资本3亿元。公司总部位于深圳市南山区南京产学研基地。</p>
                    <p>特华小贷通过与保险公司进行深度战略合作，开展“小贷+保证保险”模式，基于华安保险和精达股份的大数据和业务场景，为产业链上的中小微企业、商户、个人共同推出快捷、便利的线上网络贷款产品，解决他们的融资需求。</p>
                    <p className="tiny-title">深圳总部</p>
                    <p>地址：广东省深圳市南山区科苑南路南京大学产学研基地B栋3F</p>
                    <p>邮编：518000</p>
                    <p className="tiny-title">客户咨询</p>
                    <p>如果您在申请贷款的过程中有任何疑问，请您与特华小贷客服人员联系。</p>
                    <p>客服电话：4006-855-909</p>
                    <p>客服邮箱：kf@tehualoan.com</p>
                    <p>工作时间：9:00 – 21:00</p>
                </div>
            </div>
        );
    }
})
