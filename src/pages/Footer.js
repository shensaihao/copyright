import React from 'react'
import { useLocation } from 'react-router-dom'


export default function Footer() {
    const location = useLocation()
    return (
        <div>
            {
                location.pathname!=='/login'&&
                <div className="home_footer">
                    <div className="flex-between-center">
                        <div className="home_footer_desc">
                            <div className="home_footer_desc_desc">如果您有任何需要咨询和帮助的都可以和我们联系，我们7x24小时为您服务!</div>
                            <div className="home_footer_desc_desc">联系电话：028-83176307        15281035712（雷琴）         15002804663（钟玄）!</div>
                        </div>
                        <div className="home_footer_qrcode flex-end-baseline">
                            <div className="home_footer_desc_desc mr-10">详情请扫码咨询</div>
                            <img src={require('src/images/home_qrcode.png')} alt=""/>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
