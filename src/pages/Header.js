import React from 'react'
import { Icon } from 'antd'
import { useHistory } from 'react-router-dom'

export default (props) => {

    const history = useHistory()

    const goBack = <Icon type={'left'} />

    const leftContent = (
        <div className="header-left" onClick={() => {
            props.goBack ? props.goBack() : history.goBack()
        }}>
            {props.leftContent ? props.leftContent : goBack}
        </div>
    )

    const title = (
        <div className="header-title">
            {props.title}
        </div>
    )

    const rightContent = (
        <div className="header-right">
            {props.rightContent}
        </div>
    )

    return (
        <div className="header">
            {leftContent}
            {title}
            {rightContent}
        </div>
    )
}
