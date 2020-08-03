import React from 'react'

export default (props) => {

    const footerContent = (
        <div className="flex-around-center footer">
            <div className="flex-column-start">
                <div className="footer-title-gray m-y-8">
                    关于
                </div>
                <div className="footer-bottom-link m-y-8">
                    关于我们
                </div>
                <div className="footer-bottom-link m-y-8">
                    隐私政策
                </div>
                <div className="footer-bottom-link m-y-8">
                    用户协议
                </div>
            </div>
            <div className="flex-column-start">
                <div className="footer-title-gray m-y-8">
                    服务
                </div>
                <div className="footer-bottom-link m-y-8">
                    帮助中心
                </div>
                <div className="footer-bottom-link m-y-8">
                    常见问题
                </div>
            </div>
            <div className="flex-column-start">
                <div className="footer-title-gray m-y-8">
                    联系方式
                </div>
                <div className="footer-bottom-link flex-center m-y-8">
                    <div>
                        官方媒体：
                    </div>
                    <div>
                        <img src={require('src/images/weibo.png')} alt=""/>
                    </div>
                    <div>
                    <img src={require('src/images/weixin.png')} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div>
            <div className="footer">
                {footerContent}
            </div>
        </div>
    )
}
