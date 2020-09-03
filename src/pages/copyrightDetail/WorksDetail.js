import React from 'react'

export default function WorksDetail() {
    return (
        <div className="detail_box">
            <div className="works_info mb-50">
                <div className="color-main ft-size-20 font-weight">作品信息</div>
                <div className="works_info_line mt-10 mb-40"></div>
                <div className="flex-start">
                    <div className="works_info_img mr-20">

                    </div>
                    <div className="works_info_img">
                        
                    </div>
                </div>
                <div className="flex-column-center">
                    <div className="flex-start m-y-10 ft-size-16">
                        <div className="step-four-label mr-30">作品名称</div>
                        <div>
                            皇帝的新衣
                        </div>
                    </div>
                    <div className="flex-start m-y-10 ft-size-16">
                        <div className="step-four-label mr-30">作品类型</div>
                        <div>
                            服装设计
                        </div>
                    </div>
                    <div className="flex-start m-y-10 ft-size-16">
                        <div className="step-four-label mr-30">所处阶段</div>
                        <div>
                            完成并应用
                        </div>
                    </div>  
                    <div className="flex-start m-y-10 ft-size-16">
                        <div className="step-four-label mr-30">作品完成人员</div>
                        <div>
                            晓圆，小芳，小王
                        </div>
                    </div>
                    <div className="flex-start m-y-10 ft-size-16">
                        <div className="step-four-label mr-30">作品简介</div>
                        <div>
                            我是作品简介，我是作品简介，我是作品简介，我是作品简介，我是作品简介我是作品简介，我是作品简介我是作品简介，我是作品简介我是作品简介
                        </div>
                    </div>
                </div>
            </div>
            <div className="certification_info">
                <div className="color-main ft-size-20 font-weight">认证信息</div>
                <div className="works_info_line mt-10 mb-40"></div>
                <div className="flex-start">
                    <div className="certification_info_img mr-75">
                        <img src={require('src/images/step_six_emplete.png')} alt=""/>
                    </div>
                    <div className="flex-column-center">
                        <div className="flex-start m-y-10 ft-size-16" style={{width: '600px'}}>
                            <div className="step-four-label mr-30">登记号</div>
                            <div>
                                川作登字-2020-B-02918574
                            </div>
                        </div>
                        <div className="flex-start m-y-10 ft-size-16" style={{width: '600px'}}>
                            <div className="step-four-label mr-30">著作权人</div>
                            <div>
                                晓圆
                            </div>
                        </div>
                        <div className="flex-start m-y-10 ft-size-16" style={{width: '600px'}}>
                            <div className="step-four-label mr-30">登记链上哈希</div>
                            <div>
                                GGSvemAm5iyGY3OelBnzwFb2oyAzMbUbe3LsxnLj
                            </div>
                        </div>
                        <div className="flex-start m-y-10 ft-size-16" style={{width: '600px'}}>
                            <div className="step-four-label mr-30">区块信息</div>
                            <div>
                                395418
                            </div>
                        </div>
                        <div className="flex-start m-y-10 ft-size-16" style={{width: '600px'}}>
                            <div className="step-four-label mr-30">登记日期</div>
                            <div>
                                2020.08.25
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
