import React, { useState, useEffect } from 'react'
import StepOne from './component/StepOne'
import StepTwo from './component/StepTwo'
import StepThree from './component/StepThree'
import StepFour from './component/StepFour'
import StepFive from './component/StepFive'
import StepSix from './component/StepSix'
import cs from 'classnames'

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

const initialState = {
    person_type: '',
    person_name: '',
    person_number: '',
    phone: '',
    code: '',
    id_card_1: {},
    id_card_2: {},
    id_card_3: {},
}

export default () => {
    const [step0, setStep0] = useState('0-1')
    const [step1, setStep1] = useState('1-0')
    const [step2, setStep2] = useState('2-0')
    const [step3, setStep3] = useState('3-0')
    const [step4, setStep4] = useState('4-0')
    const [step5, setStep5] = useState('5-0')
    const [status, setStatus] = useState(0)
    const [stepOne, setStepOne] = useState(initValue)
    const [stepThree, setStepThree] = useState(initialState)

    const handelStepOneSubmit = (values) => {
        setStep0('0-2')
        setStep1('1-1')
        console.log(values)
        setStepOne({...stepOne, ...values})
        console.log(stepOne)
        setStatus(1)
    }

    const handelStepTwoClick = () => {
        setStep0('0-2')
        setStep1('1-2')
        setStep1('1-2')
        setStep2('2-1')
        setStatus(2)
    }

    const handelStepTreeSubmit = (values) => {
        setStep0('0-2')
        setStep1('1-2')
        setStep1('1-2')
        setStep2('2-2')
        setStep2('2-2')
        setStep3('3-1')
        setStepThree({...stepThree, ...values})
        setStatus(3)
    }

    const handelStepFourSubmit = () => {
        setStatus(4)
    }

    const handelStepFiveSubmit = () => {
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
            case 2:
                setStep0('0-2')
                setStep1('1-2')
                setStep2('2-1')
                return
            case 3:
                setStep0('0-2')
                setStep1('1-2')
                setStep2('2-2')
                setStep3('3-1')
                return
            case 4:
                setStep0('0-2')
                setStep1('1-2')
                setStep2('2-2')
                setStep3('3-2')
                setStep4('4-1')
                return
            case 5:
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
        <div className="home-wrapper pt-60">
            <div className="home-title ft-size-22 font-weight-bold text-center pb-50">
                版权登记
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
                    <div>版权有效性检测</div>
                </div>
                <div className={cs('step-dotted-line', status < 1 ? '' : (status < 2 ? 'step-line-1' : 'step-line-2'))}>
                </div>
                <div className="flex-column-center-center">
                    <img src={require(`src/images/step-${step2}.png`)} alt=""/>
                    <div>录入作者信息</div>
                </div>
                <div className={cs('step-dotted-line', status < 2 ? '' : (status < 3 ? 'step-line-1' : 'step-line-2'))}>
                </div>
                <div className="flex-column-center-center">
                    <img src={require(`src/images/step-${step3}.png`)} alt=""/>
                    <div>登记信息上链</div>
                </div>
                <div className={cs('step-dotted-line', status < 3 ? '' : (status < 4 ? 'step-line-1' : 'step-line-2'))}>
                </div>
                <div className="flex-column-center-center">
                    <img src={require(`src/images/step-${step4}.png`)} alt=""/>
                    <div>版权局确认信息</div>
                </div>
                <div className={cs('step-dotted-line', status < 4 ? '' : (status < 5 ? 'step-line-1' : 'step-line-2'))}>
                </div>
                <div className="flex-column-center-center">
                    <img src={require(`src/images/step-${step5}.png`)} alt=""/>
                    <div>版权作品登记证书</div>
                </div>
            </div>
            {
                status === 0 && <StepOne handelStepOneSubmit={handelStepOneSubmit}/>
            }
            {
                status === 1 && <StepTwo handelStepTwoClick={handelStepTwoClick}/>
            }
            {
                status === 2 && <StepThree handelStepTreeSubmit={handelStepTreeSubmit}/>
            }
            {
                status === 3 && <StepFour handelStepFourSubmit={handelStepFourSubmit} worksInfo={{...stepOne, ...stepThree}}/>
            }
            {
                status === 4 && <StepFive handelStepFiveSubmit={handelStepFiveSubmit} worksInfo={{...stepOne, ...stepThree}} />
            }
            {
                status === 5 && <StepSix worksInfo={{...stepOne, ...stepThree}} />
            }
        </div>
    )
}
