import React, {useState, useEffect} from 'react'
import {Modal} from 'antd'
import { originalService, useLoading } from 'src/service'

export default function StepSix(props) {

    const [perviewVisible, setPerviewVisible] = useState(false)
    const [loading, copyrightVerifyInfo] = useLoading(originalService.postCopyrightVerifyInfo)
    const [detail, setDetail] = useState({})

    useEffect(() => {
        if(props.worksInfo) {
            console.log(props.worksInfo)
            copyrightVerifyInfo({'relevanceId': props.worksInfo.id}).then((res) => {
                setDetail(res.data)
            })
        }
    }, [copyrightVerifyInfo, props.worksInfo])

    const downLoadRecord = () => {
        const img = document.getElementById('download-image'); // 获取要下载的图片
        const url = img.src;                            // 获取图片地址
        const a = document.createElement('a');          // 创建一个a节点插入的document
        const event = new MouseEvent('click')           // 模拟鼠标click点击事件
        a.download = '登记证书'                  // 设置a节点的download属性值
        a.href = url;                                 // 将图片的src赋值给a节点的href
        a.dispatchEvent(event)
    }

    const copyrightRegister = {
        'TRADITION_TYPE': '传统知识存与保护',
        'BRAND_TYPE': '商标和商号存证',
        'TECH_TYPE': '技术成果存证',
        'COPYRIGHT_TYPE': '版权作品存证',
        'SOURCE_TYPE': '原产地存证'
    }

    return (
        <div className="pb-30 flex-column-center-center">
            <div className="flex-column-center-center step-six-title">
                <img src={require('src/images/step_one_sucess.png')} alt=""/>
                <div>认证成功</div>
            </div>
            <div className="flex-column-center-center mb-25">
                <img src={require('src/images/step_six_emplete.png')} alt=""/>
                <div className="ft-size-18 color-main">认证证书</div>
            </div>
            <div className="flex-column-center-center step_six_box">
                <div className="flex-between m-y-20 ft-size-16" style={{width: '600px'}}>
                    <div className="step-four-label mr-30">作品名称</div>
                    <div>
                        {
                            detail&&detail.productionName
                        }
                    </div>
                </div>
                <div className="flex-between m-y-20 ft-size-16" style={{width: '600px'}}>
                    <div className="step-four-label mr-30">作品类型</div>
                    <div>
                        {
                            detail&&copyrightRegister[detail.copyrightRegister]
                        }
                    </div>
                </div>
                <div className="flex-between m-y-20 ft-size-16" style={{width: '600px'}}>
                    <div className="step-four-label mr-30">所处阶段</div>
                    <div>
                        {
                            detail&&copyrightRegister[detail.copyrightRegister]
                        }
                    </div>
                </div>  
                <div className="flex-between m-y-20 ft-size-16" style={{width: '600px'}}>
                    <div className="step-four-label mr-30">作品完成人员</div>
                    <div>
                        {
                            detail&&detail.authorName
                        }
                    </div>
                </div>
                <div className="flex-between m-y-20 ft-size-16" style={{width: '600px'}}>
                    <div className="step-four-label mr-30">作品简介</div>
                    <div>
                        {
                            detail&&detail.authorName
                        }
                    </div>
                </div>
                <div className="flex-between m-y-20 ft-size-16" style={{width: '600px'}}>
                    <div className="step-four-label mr-30">登记号</div>
                    <div>
                        {
                            detail&&detail.authorName
                        }
                    </div>
                </div>
                <div className="flex-between m-y-20 ft-size-16" style={{width: '600px'}}>
                    <div className="step-four-label mr-30">著作权人</div>
                    <div>
                        {
                            detail&&detail.authorName
                        }
                    </div>
                </div>
                <div className="flex-between m-y-20 ft-size-16" style={{width: '600px'}}>
                    <div className="step-four-label mr-30">登记链上哈希</div>
                    <div>
                        {
                            detail&&detail.messageChainHash
                        }
                    </div>
                </div>
                <div className="flex-between m-y-20 ft-size-16" style={{width: '600px'}}>
                    <div className="step-four-label mr-30">区块信息</div>
                    <div>
                        {
                            detail&&detail.chainBlock
                        }
                    </div>
                </div>
                <div className="flex-between m-y-20 ft-size-16" style={{width: '600px'}}>
                    <div className="step-four-label mr-30">登记日期</div>
                    <div>
                        {
                            detail&&detail.登记日期
                        }
                    </div>
                </div>
            </div>
            <div className="flex-column-center-center">
                <div className="ft-size-32 color-main font-weight mt-60">其他增值服务</div>
                <div className="color-secondry mb-10">我们同时也提供其他增值服务，如果需要请电联  028-83176307</div>
                <div className="step_six_line"></div>
                <div className="step_six_service flex-around-center mb-20 mt-40">
                    <img src={require('src/images/service_quequan.png')} alt=""/>
                    <div className="color-main font-weight">确权服务</div>
                    <div className="color-secondry ft-size-14 step_six_desc">
                        1、版权登记  根据平台用户需要，帮助用户完成版权登记的全部工作；<br/>
                        2、商标注册  根据平台用户委托，代理用户商标注册申请工作；<br/>
                        3、其他知识产权确权服务  根据平台用户委托，代理用户其他知识产权的确权服务法律法规另有规定的除外）。
                    </div>
                </div>
                <div className="step_six_service flex-around-center mb-20">
                    <img src={require('src/images/service_weiquan.png')} alt=""/>
                    <div className="color-main font-weight">维权服务</div>
                    <div className="color-secondry ft-size-14 step_six_desc">
                        1、取证服务  根据平台用户申请，为用户提供作品的存证证明的法律证据；<br />
                        2、公证服务  根据平台用户申请，由本平台合作的公证机关为用户提供作品的公证服务；<br />
                        3、权益保护  根据平台用户需要，由本平台法律顾问为用户提供诉讼代理、调解等法律服务。
                    </div>
                </div>
                <div className="step_six_service flex-around-center mb-20">
                    <img src={require('src/images/service_yunying.png')} alt=""/>
                    <div className="color-main font-weight">运营服务</div>
                    <div className="color-secondry ft-size-14 step_six_desc">
                        利用本平台的展示交易功能，为用户提供作品相关知识产权转让与许可、知识产权评估及质押融资等知识产权运营服务。
                    </div>
                </div>
                <div className="step_six_service flex-around-center mb-20">
                    <img src={require('src/images/service_guanli.png')} alt=""/>
                    <div className="color-main font-weight">管理服务</div>
                    <div className="color-secondry ft-size-14 step_six_desc">
                        为平台用户提供知识产权托管、知识产权贯标、知识产权战略、知识产权咨询等企业知识产权管理服务。
                    </div>
                </div>
                <div className="step_six_service flex-around-center mb-40">
                    <img src={require('src/images/service_qita.png')} alt=""/>
                    <div className="color-main font-weight">其他服务</div>
                    <div className="color-secondry ft-size-14 step_six_desc">
                        利用平台整合服务资源的优势，为平台用户提供项目申报、管理咨询等其他相关服务。
                    </div>
                </div>
            </div>
        </div>
    )
}
