import React, {useEffect, useState} from 'react'
import {Modal} from 'antd'
import { originalService, useLoading } from 'src/service'

export default function StepFive(props) {
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

    useEffect(() => {
        setTimeout(() => {
            props.handelStepFiveSubmit()
        }, 10000);
      } ,[props])

    const copyrightRegister = {
        'TRADITION_TYPE': '传统知识存与保护',
        'BRAND_TYPE': '商标和商号存证',
        'TECH_TYPE': '技术成果存证',
        'COPYRIGHT_TYPE': '版权作品存证',
        'SOURCE_TYPE': '原产地存证'
    }

    return (
        <div className="flex-column-center-center">
            <div className="flex-column-center-center mb-20">
                <div className="step-four-top-box"></div>
                <div className="font-main ft-size-24 font-weight">
                    上链完成
                </div>
            </div>
            <div className="flex-center mb-20">
                <div className="step-five-tips flex-center">
                    您的作品信息已登记上链完成，正在为您生成区块链存证证书
                </div>
            </div>
            <div className="step_four_box">
                <div className="flex-column-center">
                    <div className="flex-between m-y-20">
                        <div className="step-four-label ft-size-18">信息上链哈希</div>
                        <div className="step-four-content ft-size-18">
                            {
                                detail&&detail.messageChainHash
                            }
                        </div>
                    </div>
                    <div className="flex-between m-y-20">
                        <div className="step-four-label ft-size-18">上链区块</div>
                        <div className="step-four-content ft-size-18">
                            {
                                detail&&detail.chainBlock
                            }
                        </div>
                    </div>
                    <div className="flex-between m-y-20">
                        <div className="step-four-label ft-size-18">登记信息</div>
                        <div></div>
                    </div>
                </div>
                <div className="flex-column-center">
                    <div className="flex-start m-y-20">
                        <div className="step-four-label mr-30 ft-size-16">登记号</div>
                        <div>
                            {
                                detail&&detail.registerNumber
                            }
                        </div>
                    </div>
                    <div className="flex-start m-y-20 ft-size-16">
                        <div className="step-four-label mr-30">登记类型</div>
                        <div>
                            {
                                detail&&copyrightRegister[detail.copyrightRegister]
                            }
                        </div>
                    </div>
                    <div className="flex-start m-y-20 ft-size-16">
                        <div className="step-four-label mr-30">作品名称</div>
                        <div>
                            {
                                detail&&detail.productionName
                            }
                        </div>
                    </div>
                    <div className="flex-start m-y-20 ft-size-16">
                        <div className="step-four-label mr-30">作者姓名</div>
                        <div>
                            {
                                detail&&detail.authorName
                            }
                        </div>
                    </div>
                    {/* <div className="flex-start m-y-20 ft-size-16">
                        <div className="step-four-label mr-30">作品查看</div>
                        <div className="blue-color-font curser-pointer" onClick={() => setPerviewVisible(true)}>点击查看 </div>
                    </div> */}
                </div>
                <Modal
                    visible={perviewVisible}
                    onCancel={() => setPerviewVisible(false)}
                    footer={null}
                    >
                    <img alt="" style={{ width: '100%' }} src={props.worksInfo?'':''} />
                </Modal>
            </div>
        </div>
    )
}
