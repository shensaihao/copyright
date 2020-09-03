import React, {useState,useEffect} from 'react'
import {Modal} from 'antd'
import ReactWatermark from 'react-watermark-module'
import dayjs from 'dayjs'
import { originalService, useLoading } from 'src/service'

const imagePath = require('src/images/zhengming.png')
const date = dayjs(new Date().getTime()).format('YYYY.MM.DD')

export default function StepSix(props) {

    const [perviewVisible, setPerviewVisible] = useState(false)
    const [loading, copyrightVerifyInfo] = useLoading(originalService.postCopyrightVerifyInfo)
    const [detail, setDetail] = useState({})

    useEffect(() => {
        if(props.worksInfo) {
            copyrightVerifyInfo({'relevanceId': props.worksInfo.id}).then((res) => {
                setDetail(res.data)
            })
        }
    }, [copyrightVerifyInfo, props.worksInfo])

    const text = `${date}  June  ${props.worksInfo.type}  原创登记`

    const downLoadRecord = () => {
        const img = document.querySelector('#watermark img'); // 获取要下载的图片
        const url = img.src;                            // 获取图片地址
        const a = document.createElement('a');          // 创建一个a节点插入的document
        const event = new MouseEvent('click')           // 模拟鼠标click点击事件
        a.download = '登记证书'                         // 设置a节点的download属性值
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
        <div className="pb-30">
            <div className="flex-center step-six-title">
                登记完成
            </div>
            <div className="flex-column-center-center">
                <div className="flex-between m-y-20" style={{width: '700px'}}>
                    <div className="step-four-label ft-size-18">信息上链哈希</div>
                    <div className="step-four-content ft-size-18">
                        {
                            detail&&detail.messageChainHash
                        }
                    </div>
                </div>
                <div className="flex-between m-y-20" style={{width: '700px'}}>
                    <div className="step-four-label ft-size-18">上链区块</div>
                    <div className="step-four-content ft-size-18">
                        {
                            detail&&detail.chainBlock
                        }
                    </div>
                </div>
                <div className="flex-between m-y-20" style={{width: '700px'}}>
                    <div className="step-four-label ft-size-18">登记信息</div>
                    <div></div>
                </div>
            </div>
            <div className="flex-column-center-center">
                <div className="flex-start m-y-20" style={{width: '600px'}}>
                    <div className="step-four-label mr-30 ft-size-16">登记号</div>
                    <div>
                        {
                            detail&&detail.registerNumber
                        }
                    </div>
                </div>
                <div className="flex-start m-y-20 ft-size-16" style={{width: '600px'}}>
                    <div className="step-four-label mr-30">登记类型</div>
                    <div>
                        {
                            detail&&copyrightRegister[detail.copyrightRegister]
                        }
                    </div>
                </div>
                <div className="flex-start m-y-20 ft-size-16" style={{width: '600px'}}>
                    <div className="step-four-label mr-30">登记名称</div>
                    <div>
                        {
                            detail&&detail.productionName
                        }
                    </div>
                </div>
                {/* <div className="flex-start m-y-20 ft-size-16" style={{width: '600px'}}>
                    <div className="step-four-label mr-30">文件查看</div>
                    <div className="blue-color-font curser-pointer" onClick={() => setPerviewVisible(true)}>点击查看</div>
                </div> */}
            </div>
            <div className="flex-column-center-center">
                <div className="flex-between m-y-20" style={{width: '700px'}}>
                    <div className="step-four-label ft-size-18">登记证明</div>
                    <div></div>
                </div>
                <div className="flex-start-end" style={{width: '700px'}} id="test">
                <ReactWatermark
                    imagePath={imagePath} //必须，对象，背景图片
                    textData={text} //必须，字符串，水印内容
                    type={'text'} //必须，水印类型
                    color={'#e6e6e6'}
                    transparent={1}
                    textPosition={'center'}
                    font={'16px serif'}
                />
                    {/* <img src={require('src/images/zhengming.png')} alt="" id="download-image"/> */}
                    <div className="flex-start ml-20">
                        <img src={require('src/images/download.png')} alt=""/>
                        <div className="ml-8 blue-color-font curser-pointer" onClick={downLoadRecord}>下载登记证书</div>
                    </div>
                </div>
            </div>
            {/* <Modal
                visible={perviewVisible}
                onCancel={() => setPerviewVisible(false)}
                footer={null}
                >
                <img alt="" style={{ width: '100%' }} src={url} />
            </Modal> */}
        </div>
    )
}
