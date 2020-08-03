import React, { useState, useEffect } from 'react'
import {Dropdown, Menu} from 'antd'
import { useHistory } from 'react-router-dom'
import StepOne from './component/StepOne'
import StepTwo from './component/StepTwo'
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

export default () => {
    const [step0, setStep0] = useState('0-1')
    const [step1, setStep1] = useState('1-0')
    const [step5, setStep5] = useState('5-0')
    const [status, setStatus] = useState(0)
    const [stepOne, setStepOne] = useState(initValue)
    const history = useHistory()

    const handelStepOneSubmit = (values) => {
        setStep0('0-2')
        setStep1('1-1')
        setStepOne({...stepOne, ...values})
        setStatus(1)
    }

    const handelStepTwoClick = () => {
        setStep0('0-2')
        setStep1('1-2')
        setStep1('1-2')
        setStep5('5-1')
        setStatus(5)
    }

    const handelOriginal = () => {
        history.push('/original')
    }

    const handelRegistration = () => {
        history.push('/home')
    }

    const handelCertification = () => {
        history.push('/certification')
    }

    const menu = (
        <Menu>
          <Menu.Item onClick={handelCertification}>
            实名认证
          </Menu.Item>
          <Menu.Item>
            原创作品
          </Menu.Item>
          <Menu.Item>
            版权作品
          </Menu.Item>
          <Menu.Item>
            退出登录
          </Menu.Item>
        </Menu>
      );

    const header = (
        <div className="main-tab flex-around-center">
            <div className="flex-around-center">
                <div className='main-tab-item text-center p-x-25'>
                    <div className="main-tab-item text-center">
                        首页
                    </div>
                </div>
                <div className='main-tab-item text-center'>
                    版权交易
                </div>
                <div className='main-tab-item text-center'>
                    版权查询
                </div>
                <div className='main-tab-item text-center'>
                    区块信息
                </div>
            </div>
            <div className="flex-around-center">
                <div className="main-right-btn m-x-13 mr-30 curser-pointer" onClick={handelOriginal}>原创登记</div>
                <div className="main-right-btn m-x-13 curser-pointer" onClick={handelRegistration}>版权登记</div>
                <div className="main-right-icon m-x-13">
                    <img src={require('src/images/search.png')} alt=""/>
                </div>
                <div className="main-right-icon m-x-13">
                    <img src={require('src/images/notice.png')} alt=""/>
                </div>
                <Dropdown overlay={menu}>
                    <div className="main-right-avatar flex-around-center ml-23">
                        <img src={require('src/images/avatar.png')} alt=""/>
                        <span className="user-name-box">June</span>
                    </div>
                </Dropdown>
            </div>
        </div>
    )

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
            {
                header
            }
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
                        <div>版权有效性检测</div>
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
