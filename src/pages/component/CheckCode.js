import React, { useState } from 'react'
import { useLoading, mineService } from 'src/service';

function CheckCode(props) {

    const [count, setCount] = useState(60)
    const [timer, setTimer] = useState(null)
    const [loading, getAuthMessageSmsCaptcha] = useLoading(mineService.getAuthMessageSmsCaptcha)
    const [loading1, getPhoneNumberUsed] = useLoading(mineService.getPhoneNumberUsed)

    const loadingSvg = (
        <svg style={{ width: 60, height: 40 }}>
            <g transform="translate(5 10)">
                <circle cx="0" cy="0" r="2" fill="#24B989" transform="scale(0.544934 0.544934)">
                    <animateTransform attributeName="transform" type="scale" begin="-0.26666666666666666s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="0.8s" repeatCount="indefinite"></animateTransform>
                </circle>
            </g>
            <g transform="translate(15 10)">
                <circle cx="0" cy="0" r="2" fill="#24B989" transform="scale(0.998004 0.998004)">
                    <animateTransform attributeName="transform" type="scale" begin="-0.13333333333333333s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="0.8s" repeatCount="indefinite"></animateTransform>
                </circle>
            </g>
            <g transform="translate(25 10)">
                <circle cx="0" cy="0" r="2" fill="#24B989" transform="scale(0.987271 0.987271)">
                    <animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="0.8s" repeatCount="indefinite"></animateTransform>
                </circle>
            </g>
        </svg>
    )

    const startCount = (start) => {
        if (start > 0) {
            setCount(start-1)
            setTimer(
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

    return () => (
        <div>
            {count === 60 ? canGet : counting}
        </div>
    )
}

export default CheckCode
