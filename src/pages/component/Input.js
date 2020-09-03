import React, { useState, useRef } from 'react'
import cs from 'classnames'
import { useLoading, mineService } from 'src/service';

const _images = {
}
const Input = (props) => {

    const inputRef = useRef()

    const [focus, setFocus] = useState(false)
    const [timer, setTimer] = useState(null)
    const [count, setCount] = useState(60)
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
        const q = {telephone: props.telephone}
        getAuthMessageSmsCaptcha(q)
            .then(() => {
                startCount(60)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getCheckPhone = () => {
        if (!props.telephone) return
        const q = {telephone: props.telephone}
        getPhoneNumberUsed(q).then((res) => {
            if(!res.data) {
                getCheckCode()
            } else {
                console.log('zhuce')
            }
        }).catch((err) => {
            // console.log(err)
        })
        
    }

    const onFocus = () => { setFocus(true) }

    const onBlur = () => { setFocus(false) }

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
            </div>
            {
                props.type==='password'&&
                <div className="flex-start mt-8">
                    <img src={require('src/images/register_number.png')} alt=""/>
                    <div className="ml-8 mr-30">数字</div>
                    <img src={require('src/images/register_info.png')} alt=""/>
                    <div className="ml-8 mr-30">大写字母</div>
                    <img src={require('src/images/register_info.png')} alt=""/>
                    <div className="ml-8 mr-30">小写字母</div>
                    <img src={require('src/images/register_info.png')} alt=""/>
                    <div className="ml-8 mr-30">6-30位</div>
                </div>
            }
        </div>
    )
}

export default Input
