import React, {useEffect, useState} from 'react'
import { originalService, useLoading } from 'src/service'

export default function StepFour(props) {

    const [loading, copyrightVerifyInfo] = useLoading(originalService.postCopyrightVerifyInfo)
    const [detail, setDetail] = useState({})

    useEffect(() => {
        if(props.worksInfo) {
            copyrightVerifyInfo({'relevanceId': props.worksInfo.id, copyrightRegister: props.worksInfo.copyrightRegister}).then((res) => {
                setDetail(res.data)
            })
        }
    }, [copyrightVerifyInfo, props.worksInfo])

    useEffect(() => {
        setTimeout(() => {
            props.handelStepFourSubmit()
        }, 12000);
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
                <div class="loader">
                    <svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <circle class="load one" cx="60" cy="60" r="60" />
                        <circle class="load two" cx="60" cy="60" r="60" />
                        <circle class="load three" cx="60" cy="60" r="60" />
                        <g>
                        <circle class="point one" cx="40" cy="70" r="5" />
                        <circle class="point two" cx="60" cy="70" r="5" />
                        <circle class="point three" cx="80" cy="70" r="5" />
                        </g>
                    </svg>
                </div>
                {/* <div className="step-four-top-box loader-wrapper">
                    <div class="loader">
                        <div class="ball"></div>
                        <div class="ball"></div>
                        <div class="ball"></div>
                    </div>
                </div> */}
                <div className="color-lable ft-size-24 font-weight">
                    信息发送上链中
                </div>
            </div>
            <div className="step_four_box">
                <div className="flex-column-center">
                    <div className="flex-between-center m-y-15">
                        <div className="step-four-label ft-size-18">信息上链哈希</div>
                        <div className="step-four-content ft-size-18">
                            {
                                detail&&detail.messageChainHash
                            }
                        </div>
                    </div>
                    <div className="flex-between-center m-y-15">
                        <div className="step-four-label ft-size-18">上链区块</div>
                        <div className="step-four-content ft-size-18">
                            {
                                detail&&detail.chainBlock
                            }
                        </div>
                    </div>
                    <div className="flex-between-center m-y-15">
                        <div className="step-four-label ft-size-18">登记信息</div>
                        <div></div>
                    </div>
                </div>
                <div className="flex-column-center ml-30">
                    <div className="flex-start m-y-15">
                        <div className="step-four-label mr-30 ft-size-16">登记号</div>
                        <div>
                            {
                                detail&&detail.registerNumber
                            }
                        </div>
                    </div>
                    <div className="flex-start m-y-15 ft-size-16">
                        <div className="step-four-label mr-30">登记类型</div>
                        <div>
                            {
                                detail&&copyrightRegister[detail.copyrightRegister]
                            }
                        </div>
                    </div>
                    <div className="flex-start m-y-15 ft-size-16">
                        <div className="step-four-label mr-30">作品名称</div>
                        <div>
                            {
                                detail&&detail.productionName
                            }
                        </div>
                    </div>
                    <div className="flex-start m-y-15 ft-size-16">
                        <div className="step-four-label mr-30">作者姓名</div>
                        <div>
                            {
                                detail&&detail.authorName
                            }
                        </div>
                    </div>
                    {/* <div className="flex-start m-y-15 ft-size-16">
                        <div className="step-four-label mr-30">作品查看</div>
                        <div className="blue-color-font">
                            点击查看
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
