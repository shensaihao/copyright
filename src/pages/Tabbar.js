import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Tabbar() {
    const location = useLocation()

    return (
        <>
            {
                location.pathname!=='/home'&&
                <div className="header_normal">
                    <div className="header_normal_search">
                        <img src={require('src/images/home_logo.png')} alt=""/>
                        <div className="header_normal_search_input"></div>
                    </div>
                </div>
            }
        </>
    )
}
