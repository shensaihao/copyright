import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import cs from 'classnames'
import { message } from 'antd'

import StepOne from './component/StepOne'
import StepTwo from './component/StepTwo'
import StepThree from './component/StepThree'
import StepFour from './component/StepFour'
import StepFive from './component/StepFive'
import StepSix from './component/StepSix'
import { copyrightService, useLoading } from 'src/service'

export default () => {
    const [step0, setStep0] = useState('0-1')
    const [step1, setStep1] = useState('1-0')
    const [step2, setStep2] = useState('2-0')
    const [step3, setStep3] = useState('3-0')
    const [step4, setStep4] = useState('4-0')
    const [step5, setStep5] = useState('5-0')
    const [status, setStatus] = useState(0)
    const [stepOne, setStepOne] = useState({})
    const [detail, setDetail] = useState({})
    const [recive, setRecive] = useState({})
    const [loading, originalBrandCreate] = useLoading(copyrightService.postOriginalBrandCreate)
    const [loading1, originalCopyrightCreate] = useLoading(copyrightService.postOriginalCopyrightCreate)
    const [loading2, originalSourceAreaCreate] = useLoading(copyrightService.postOriginalSourceAreaCreate)
    const [loading3, originalTechCreate] = useLoading(copyrightService.postOriginalTechCreate)
    const [loading4, originalTraditionalCreate] = useLoading(copyrightService.postOriginalTraditionalCreate)

    const history = useHistory()

    const handelStepOneSubmit = (values) => {
        setRecive(values)
    }

    const handelStepTwoClick = () => {
        setStatus(2)
    }

    useEffect(() => {
        if (recive.type==="BRAND_TYPE") {
            originalBrandCreate(recive).then((res) => {
                if (res.data) {
                    setStepOne(res.data)
                    setStatus(1)
                }
                message.success('上传成功')
            }).catch((res) => {
                if (res.responseCode==='_501') {
                    message.warning('登录已过期')
                    history.push('/login')
                } else {
                    message.warning(res.errorMsg)
                }
            })
        }
        if (recive.type==='COPYRIGHT_TYPE') {
            originalCopyrightCreate(recive).then((res) => {
                if (res.data) {
                    setStepOne(res.data)
                    setStatus(1)
                }
                message.success('上传成功')
            }).catch((res) => {
                if (res.responseCode==='_501') {
                    message.warning('登录已过期')
                    history.push('/login')
                } else {
                    message.warning(res.errorMsg)
                }
            })
        }
        if(recive.type==='TRADITION_TYPE') {
            console.log(recive)
            originalTraditionalCreate(recive).then((res) => {
                if (res.data) {
                    setStepOne(res.data)
                    setStatus(1)
                }
                message.success('上传成功')
            }).catch((res) => {
                if (res.responseCode==='_501') {
                    message.warning('登录已过期')
                    history.push('/login')
                } else {
                    message.warning(res.errorMsg)
                }
            })
        }
        if (recive.type==='SOURCE_TYPE') {
            originalSourceAreaCreate(recive).then((res) => {
                if (res.data) {
                    setStepOne(res.data)
                    setStatus(1)
                }
                message.success('上传成功')
            }).catch((res) => {
                if (res.responseCode==='_501') {
                    message.warning('登录已过期')
                    history.push('/login')
                } else {
                    message.warning(res.errorMsg)
                }
            })
        }
        if (recive.type==='TECH_TYPE') {
            originalTechCreate(recive).then((res) => {
                if (res.data) {
                    setStepOne(res.data)
                    setStatus(1)
                }
                message.success('上传成功')
            }).catch((res) => {
                if (res.responseCode==='_501') {
                    message.warning('登录已过期')
                    history.push('/login')
                } else {
                    message.warning(res.errorMsg)
                }
            })
        }

    }, [history, originalBrandCreate, originalCopyrightCreate, originalSourceAreaCreate, originalTechCreate, originalTraditionalCreate, recive])

    const handelStepFourSubmit = () => {
        setStatus(3)
    }

    const handelStepFiveSubmit = () => {
        setStatus(4)
    }

    useEffect(() => {
        switch(status){
            case 0:
                setStep0('0-1')
                return
            case 1:
                setStep0('0-2')
                setStep1('1-1')
                return
            case 2:
                setStep0('0-2')
                setStep1('1-2')
                setStep2('2-2')
                setStep3('3-1')
                return
            case 3:
                setStep0('0-2')
                setStep1('1-2')
                setStep2('2-2')
                setStep3('3-2')
                setStep4('4-1')
                return
            case 4:
                setStep0('0-2')
                setStep1('1-2')
                setStep2('2-2')
                setStep3('3-2')
                setStep4('4-2')
                setStep5('5-1')
                return
            default:
                return null
        }
    }, [status])

    return (
        <>
        <div className="humberger_box flex-start">
            <div className="humberger_box_name curser-pointer" onClick={() => history.push('/home')}>首页</div>
            <div className="humberger_box_line"> / </div>
            <div className="humberger_box_active curser-pointer">作品认证</div>
        </div>
        <div className="home_wraper">
            <div className="home-wrapper home_box pt-60">
                <div className="flex-center mb-50">
                    <div className="flex-column-center-center">
                        <img src={require(`src/images/step-${step0}.png`)} alt=""/>
                        <div className={`color_step_${step0} mt-5`}>上传作品信息</div>
                    </div>
                    <div className={cs('step-dotted-line', status <= 0 ? 'step-line-1' : 'step-line-2')}>
                    </div>
                    <div className="flex-column-center-center">
                        <img src={require(`src/images/step-${step1}.png`)} alt=""/>
                        <div>有效性检测</div>
                    </div>
                    <div className={cs('step-dotted-line', status < 2 ? 'step-line-1' : 'step-line-2')}>
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
                    <div className={cs('step-dotted-line', status < 3 ? 'step-line-1' : 'step-line-2')}>
                    </div>
                    <div className="flex-column-center-center">
                        <img src={require(`src/images/step-${step4}.png`)} alt=""/>
                        <div>登记证书</div>
                    </div>
                    <div className={cs('step-dotted-line', status < 4 ? 'step-line-1' : 'step-line-2')}>
                    </div>
                    <div className="flex-column-center-center">
                        <img src={require(`src/images/step-${step5}.png`)} alt=""/>
                        <div>官方确认信息</div>
                    </div>
                </div>
                {
                    status === 0 && <StepOne handelStepOneSubmit={handelStepOneSubmit}/>
                }
                {
                    status === 1 && <StepTwo handelStepTwoClick={handelStepTwoClick}/>
                }
                {/* {
                    status === 2 && <StepThree handelStepTreeSubmit={handelStepTreeSubmit}/>
                } */}
                {
                    status === 2 && <StepFour handelStepFourSubmit={handelStepFourSubmit} worksInfo={{...stepOne}}/>
                }
                {
                    status === 3 && <StepFive handelStepFiveSubmit={handelStepFiveSubmit} worksInfo={{...stepOne}} />
                }
                {
                    status === 4 && <StepSix worksInfo={{...stepOne}} />
                }
            </div>
        </div>
        </>
    )
}
