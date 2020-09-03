import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import StepOne from './component/StepOne'
import StepTwo from './component/StepTwo'
import StepSix from './component/StepSix'
import cs from 'classnames'
import { originalService, useLoading } from 'src/service'
import { message } from 'antd';

const initValue = {
    date: "",
    finishDate: "",
    independent: "",
    name: "",
    process: "",
    purpose: "",
    type: "",
    works: {}
}

export default () => {
    const [step0, setStep0] = useState('0-1')
    const [step1, setStep1] = useState('1-0')
    const [step5, setStep5] = useState('5-0')
    const [status, setStatus] = useState(0)
    const [stepOne, setStepOne] = useState(initValue)
    const [loading, originalBrandCreate] = useLoading(originalService.postOriginalBrandCreate)
    const [loading1, originalCopyrightCreate] = useLoading(originalService.postOriginalCopyrightCreate)
    const [loading2, originalSourceAreaCreate] = useLoading(originalService.postOriginalSourceAreaCreate)
    const [loading3, originalTechCreate] = useLoading(originalService.postOriginalTechCreate)
    const [loading4, originalTraditionalCreate] = useLoading(originalService.postOriginalTraditionalCreate)
    
    const [recive, setRecive] = useState({})
    const history = useHistory()

    const handelStepOneSubmit = (values) => {
        setRecive(values)
        setStep0('0-2')
        setStep1('1-1')
    }

    useEffect(() => {
        if (recive.type==="商标和商号存证") {
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
                }
            })
        }
        if (recive.type==='版权作品存证') {
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
                }
            })
        }
        if(recive.type==='传统知识存证与保护') {
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
                }
            })
        }
        if (recive.type==='原产地存证') {
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
                }
            })
        }
        if (recive.type==='技术成果存证') {
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
                }
            })
        }

    }, [history, originalBrandCreate, originalCopyrightCreate, originalSourceAreaCreate, originalTechCreate, originalTraditionalCreate, recive])

    const handelStepTwoClick = () => {
        setStep0('0-2')
        setStep1('1-2')
        setStep1('1-2')
        setStep5('5-1')
        setStatus(5)
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
            case 5:
                setStep0('0-2')
                setStep1('1-2')
                setStep5('5-1')
                return
            default:
                return null
        }
    }, [status])

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
                    status === 0 && <StepOne handelStepOneSubmit={handelStepOneSubmit}/>
                }
                {
                    status === 1 && <StepTwo handelStepTwoClick={handelStepTwoClick}/>
                }
                {
                    status === 5 && <StepSix worksInfo={{...stepOne}} />
                }
            </div>
        </div>
    )
}
