import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import StepSix from './component/StepSix'
import cs from 'classnames'

export default () => {
    const [step0, setStep0] = useState('0-2')
    const [step1, setStep1] = useState('1-2')
    const [step5, setStep5] = useState('5-1')
    const [status, setStatus] = useState(4)
    const [detail, setDetail] = useState({})

    const location = useLocation()

    useEffect(() => {
        setDetail(location.state)
    }, [detail, location.state])

    return (
        <div>
            <div className="home-wrapper pt-60">
                <div className="home-title ft-size-22 font-weight-bold text-center pb-50">
                    原创登记
                </div>
                <div className="flex-center mb-50">
                    <div className="flex-column-center-center">
                        <img src={require(`src/images/step-${step0}.png`)} alt=""/>
                        <div>上传作品信息</div>
                    </div>
                    <div className={cs('step-dotted-line', status <= 0 ? 'step-line-1' : 'step-line-2')}>
                    </div>
                    <div className="flex-column-center-center">
                        <img src={require(`src/images/step-${step1}.png`)} alt=""/>
                        <div>有效性检测</div>
                    </div>
                    <div className={cs('step-dotted-line', status < 4 ? '' : (status < 5 ? 'step-line-1' : 'step-line-2'))}>
                    </div>
                    <div className="flex-column-center-center">
                        <img src={require(`src/images/step-${step5}.png`)} alt=""/>
                        <div>作品登记完成</div>
                    </div>
                </div>
                {
                   <StepSix worksInfo={detail} />
                }
            </div>
        </div>
    )
}
