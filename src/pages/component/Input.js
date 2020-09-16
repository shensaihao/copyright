import React, { useState, useRef } from 'react'
import cs from 'classnames'
import { useLoading, mineService } from 'src/service';
import { message } from 'antd';

const Input = (props) => {

    const inputRef = useRef()

    const [focus, setFocus] = useState(false)
    const [timer, setTimer] = useState(null)
    const [count, setCount] = useState(60)
    const [error, setError] = useState(false)
    const [timer1, setTimer1] = useState(null)
    const [loading, getAuthMessageSmsCaptcha] = useLoading(mineService.getAuthMessageSmsCaptcha)
    const [loading1, getPhoneNumberUsed] = useLoading(mineService.getPhoneNumberUsed)

    const _max_time_gap = 500

    const onChange = (event) => {
        const value = event.target.value
        props.onChange && props.onChange(value)
        if (props.onLazyChange) {
            timer && clearTimeout(timer)
            setTimer(setTimeout(() => {
                props.onLazyChange(value)
            }, _max_time_gap))
        }
    }

    const startCount = (start) => {
        if (start > 0) {
            setCount(start-1)
            setTimer1(
                setTimeout(() => {
                    startCount(start-1)
                }, 1000)
            );
        } else {
            setCount(60)
        }
    }

    const getCheckCode = () => {
        if (props.isRegister) {
            const q = {telephone: props.telephone, smsCodeType: 'REGISTER'}
            getAuthMessageSmsCaptcha(q)
            .then(() => {
                startCount(60)
            })
            .catch(err => {
                message.warning(err.errorMsg)
            })
        } else {
            const q = {telephone: props.telephone, smsCodeType: 'CHANGE_TELEPHONE'}
            getAuthMessageSmsCaptcha(q)
            .then(() => {
                startCount(60)
            })
            .catch(err => {
                message.warning(err.errorMsg)
            })
        }
    }

    const getCheckPhone = () => {
        if (!props.telephone) return message.warning('请输入手机号')
        else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(props.telephone))) return message.warning('手机号格式错误，请检查')
        else {
            const q = {telephone: props.telephone}
            getPhoneNumberUsed(q).then(() => {
                getCheckCode()
            }).catch((err) => {
                if (props.isRegister) {
                    message.warning(err.errorMsg)
                } else {
                    message.warning('该手机号已被注册，请填写未注册的手机号')
                }
            })
        }
    }

    const onFocus = () => { setFocus(true) }

    const onBlur = () => {
        if (props.icon==='passwordconfirm') {
            if (props.value!==props.password) {
                setError(true)
            }
        }
        if (props.icon==='phone') {
            if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(props.value))){
                setError(true)
            }
        }
     }

    const canGet = (
        <div className="input-after-code" onClick={getCheckPhone}>
            获取验证码
        </div>
    )

    const counting = (
        <div className="input-after-second">
            {count}秒后重新获取
        </div>
    )

    const After = () => (
        <span className="input-after">
            {count === 60 ? canGet : counting}
        </span>
    )

    return (
        <div className="input-container">
            <div
                className={cs('input-wrapper', {
                    'light': props.light,
                    'disabled': props.disabled,
                })}
                onClick={() => { props.onClick && props.onClick() }}
            >
                <div className="flex-between-center">
                    <div className="flex-start">
                        {
                            props.icon&&<img src={require(`src/images/register_${props.icon}.png`)} className="mr-9 ml-9" alt=""/>
                        }
                        <div className="input-line mr-9"></div>
                        <input
                            {...props}
                            placeholder={props.placeholder}
                            value={props.value}
                            ref={inputRef}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onChange={onChange}
                            type={props.type}
                            readOnly={props.readOnly}
                            maxLength={props.maxLength}
                            disabled={props.disabled}
                            autoComplete={props.autoComplete}
                        />
                        {props.addonafter && <After />}
                    </div>
                </div>
                {
                    error&&
                    <div className="input-error flex-end pt-15">
                        {
                            props.errorMsg
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Input
