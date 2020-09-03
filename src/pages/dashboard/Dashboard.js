import React from 'react'
import {Input, Button} from 'antd';

export default function Dashboard() {

    const banner = (
        <div className="home-banner">
            <div className="home-logo-name">
                <img src={require('src/images/home_logo.jpg')} alt=""/>
            </div>
            <div className="home-search">
                <img className="home-search-icon" src={require('src/images/search-icon.png')} alt=""/>
                <input className="home-search-input" placeholder="输入作品名称查询"/>
                <img className="home-right-icon" src={require('src/images/home-right-icon.png')} alt=""/>
            </div>
        </div>
    )

    const content = (
        <div className="flex-column-center-center">
            <div className="flex-around-center">
                <div className="content-center-left">
                    <img className="content-center-left-img" src={require('src/images/home-content-bg.png')} alt=""/>
                    <Button className="home-content-button">我要认证</Button>
                </div>
                <div className="content-center-right flex-column-around ml-70">
                    <div className="content-center-font mb-30">
                        创作手稿无法全部做版权认证和公正，被盗用怎么办？
                        设计，研发过程中被盗用，如何取证？
                        互联网传播迅速，如何证明我的才是原创？
                        技术秘密如何保护才安全？  
                    </div>
                    <div className="content-center-right-line">
                    </div>       
                </div>
            </div>
            <div className="content-link flex-around-center">
                    <div className="flex-column-around">
                        <img src={require('src/images/about-us.png')} alt=""/>
                        <div className="home-link-font">关于我们</div>
                    </div>
                    <div className="flex-column-around ml-90">
                        <img src={require('src/images/liucheng.png')} alt=""/>
                        <div className="home-link-font">认证流程</div>
                    </div>
                    <div className="flex-column-around ml-90">
                        <img src={require('src/images/templete.png')} alt=""/>
                        <div className="home-link-font">证书模版</div>
                    </div>
                    <div className="flex-column-around ml-90">
                        <img src={require('src/images/help-center.png')} alt=""/>
                        <div className="home-link-font">帮助中心</div>
                    </div>
                </div>
        </div>
    )
    return (
        <div className="content">
            {banner}
            {content}
        </div>
    )
}
