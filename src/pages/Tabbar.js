import React,{useState} from 'react'
import { useLocation } from 'react-router-dom'
import {message} from 'antd'
import { useHistory } from 'react-router-dom'
import {homeService, useLoading} from 'src/service';

export default function Tabbar() {
    const location = useLocation()
    const [search, setSearch] = useState('')
    const [loading, findByProductionName] = useLoading(homeService.findByProductionName)
    const history = useHistory()

    const handelKeyDownSearch = (e) => {
        if (e.keyCode === 13&&search) {
            history.push(`/workslist?productionName=${search}`)
            console.log(findByProductionName)
        }
    }

    return (
        <>
            {
                location.pathname!=='/home'&&
                <div className="header_normal">
                    <div className="header_normal_search">
                        <img className="curser-pointer" src={require('src/images/home_logo.png')} alt="" onClick={() => history.push('/home')}/>
                        <div className="home_header_search_input flex-start pl-10">
                            <img src={require('src/images/home_search_icon.png')} alt=""/>
                            <input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handelKeyDownSearch} type="text" className="home_search_input ml-10"/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
