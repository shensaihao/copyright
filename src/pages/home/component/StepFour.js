import React, {useEffect} from 'react'

export default function StepFour(props) {
    useEffect(() => {
        setTimeout(() => {
            props.handelStepFourSubmit()
        }, 12000);
      } ,[props])
    
    return (
        <div>
            <div className="flex-center mb-20">
                <div className="step-four-top-box flex-center">
                    信息发送上链中
                </div>
            </div>
            <div className="flex-column-center-center">
                <div className="flex-between m-y-20" style={{width: '700px'}}>
                    <div className="step-four-label ft-size-18">信息上链哈希</div>
                    <div className="step-four-content ft-size-18">0x29789njfirhfuierfhnwuifcbndecihrfureifhqoq</div>
                </div>
                <div className="flex-between m-y-20" style={{width: '700px'}}>
                    <div className="step-four-label ft-size-18">上链区块</div>
                    <div className="step-four-content ft-size-18">125121</div>
                </div>
                <div className="flex-between m-y-20" style={{width: '700px'}}>
                    <div className="step-four-label ft-size-18">登记信息</div>
                    <div></div>
                </div>
            </div>
            <div className="flex-column-center-center">
                <div className="flex-start m-y-20" style={{width: '600px'}}>
                    <div className="step-four-label mr-30 ft-size-16">登记号</div>
                    <div>川作登字-2020-B-01428462</div>
                </div>
                <div className="flex-start m-y-20 ft-size-16" style={{width: '600px'}}>
                    <div className="step-four-label mr-30">作品类型</div>
                    <div>
                        {
                            props.worksInfo.type
                        }
                    </div>
                </div>
                <div className="flex-start m-y-20 ft-size-16" style={{width: '600px'}}>
                    <div className="step-four-label mr-30">作品名称</div>
                    <div>
                        {
                            props.worksInfo.name
                        }
                    </div>
                </div>
                <div className="flex-start m-y-20 ft-size-16" style={{width: '600px'}}>
                    <div className="step-four-label mr-30">作者姓名</div>
                    <div>
                        {
                            props.worksInfo.person_name
                        }
                    </div>
                </div>
                <div className="flex-start m-y-20 ft-size-16" style={{width: '600px'}}>
                    <div className="step-four-label mr-30">作品查看</div>
                    <div className="blue-color-font">
                        点击查看
                    </div>
                </div>
            </div>
        </div>
    )
}
