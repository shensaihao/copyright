import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import cs from 'classnames'
import StepSix from './component/StepSix'

export default () => {
    const [step0, setStep0] = useState('0-2')
    const [step1, setStep1] = useState('1-2')
    const [step3, setStep3] = useState('3-2')
    const [step4, setStep4] = useState('4-2')
    const [step5, setStep5] = useState('5-1')
    const [status, setStatus] = useState(4)
    const [detail, setDetail] = useState({})

    const location = useLocation()

    useEffect(() => {
        setDetail(location.state)
    }, [detail, location.state])

    return (
        <div className="home-wrapper pt-60">
            <div className="home-title ft-size-22 font-weight-bold text-center pb-50">
                作品登记
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
                <div className={cs('step-dotted-line', status < 1 ? '' : (status < 2 ? 'step-line-1' : 'step-line-2'))}>
                </div>
                {/* <div className="flex-column-center-center">
                    <img src={require(`src/images/step-${step2}.png`)} alt=""/>
                    <div>录入作者信息</div>
                </div>
                <div className={cs('step-dotted-line', status < 2 ? '' : (status < 3 ? 'step-line-1' : 'step-line-2'))}>
                </div> */}
                <div className="flex-column-center-center">
                    <img src={require(`src/images/step-${step3}.png`)} alt=""/>
                    <div>登记信息上链</div>
                </div>
                <div className={cs('step-dotted-line', status < 2 ? '' : (status < 3 ? 'step-line-1' : 'step-line-2'))}>
                </div>
                <div className="flex-column-center-center">
                    <img src={require(`src/images/step-${step4}.png`)} alt=""/>
                    <div>官方确认信息</div>
                </div>
                <div className={cs('step-dotted-line', status < 3 ? '' : (status < 4 ? 'step-line-1' : 'step-line-2'))}>
                </div>
                <div className="flex-column-center-center">
                    <img src={require(`src/images/step-${step5}.png`)} alt=""/>
                    <div>登记证书</div>
                </div>
            </div>
            {
                <StepSix worksInfo={detail} />
            }
        </div>
    )
}
