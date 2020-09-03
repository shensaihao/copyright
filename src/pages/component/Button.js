import React from 'react'
import cs from 'classnames'
import { px2vw } from 'src/utils'

const Button = (props) => {

    const loading = (
        <svg style={{ width: px2vw(60), height: px2vw(40) }}>
            <g transform="translate(5 10)">
                <circle cx="0" cy="0" r="2" fill="#ffffff" transform="scale(0.544934 0.544934)">
                    <animateTransform attributeName="transform" type="scale" begin="-0.26666666666666666s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="0.8s" repeatCount="indefinite"></animateTransform>
                </circle>
            </g>
            <g transform="translate(15 10)">
                <circle cx="0" cy="0" r="2" fill="#ffffff" transform="scale(0.998004 0.998004)">
                    <animateTransform attributeName="transform" type="scale" begin="-0.13333333333333333s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="0.8s" repeatCount="indefinite"></animateTransform>
                </circle>
            </g>
            <g transform="translate(25 10)">
                <circle cx="0" cy="0" r="2" fill="#ffffff" transform="scale(0.987271 0.987271)">
                    <animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="0.8s" repeatCount="indefinite"></animateTransform>
                </circle>
            </g>
        </svg>
    )

    return (
        <div
            className={cs('i-btn', props.type, props.className, {
                'loading': props.loading,
                'disabled': props.disabled,
            })}
            style={props.style}
            disabled={props.disabled}
            onClick={() => {
                if (props.disabled) return
                if (props.loading) return
                props.onClick && props.onClick()
            }}
        >
            {props.children} {props.loading && loading}
        </div>
    )
}

export default Button
