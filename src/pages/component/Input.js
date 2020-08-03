import React, { useState, useEffect, useRef } from 'react'
import cs from 'classnames'

const _images = {
    eyeOpen: require('src/images/weibo.png'),
    eyeClose: require('src/images/weixin.png'),
}
const Input = (props) => {

    const inputRef = useRef()

    const [eyeOpen, setEyeOpen] = useState(false)
    const [focus, setFocus] = useState(false)

    const onChange = (event) => {
        props.onChange && props.onChange(event.target.value)
    }

    const onFocus = () => { setFocus(true) }

    const onBlur = () => { setFocus(false) }

    const Eye = () => (
        <div className="input-eye" onClick={() => { setEyeOpen(!eyeOpen) }}>
            <img src={eyeOpen ? _images.eyeOpen : _images.eyeClose} alt="" />
        </div>
    )
    const Error = () => (
        <div className="input-error">
            {props.error}
        </div>
    )
    const After = () => (
        <span className="input-after">
            {props.addonAfter}
        </span>
    )
    const BottomLeft = () => (
        <div className="input-bottom-left">
            {props.error ? <Error /> : props.bottomLeft}
        </div>
    )
    const BottomRight = () => (
        <div className="input-bottom-right">
            {props.bottomRight}
        </div>
    )
    return (
        <div className="input-container">
            <div className="input-label">
                {props.label}
            </div>
            <div className="input-wrapper">
                <input
                    value={props.value}
                    ref={inputRef}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={onChange}
                    type={!props.eye ? props.type : eyeOpen ? '' : props.type}
                    onKeyUp={event => {
                        if (event.keyCode === 13) {
                            if (this.props.onEnter) {
                                this.props.onEnter()
                            }
                        }
                    }}
                    {...props}
                />
                {props.addonAfter && <After />}
                {props.eye && <Eye />}
            </div>
            <div className="input-bottom">
                <BottomLeft />
                <BottomRight />
            </div>
        </div>
    )
}

export default Input
