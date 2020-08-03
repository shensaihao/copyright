import React from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import {Dropdown, Menu} from 'antd'


const _home = '/home'
const _process="/process"
const _works="/works"

export default () => {

    const matchHome = useRouteMatch({ path: _home, strict: true, sensitive: true })
    const matchProcess = useRouteMatch({ path: _process, strict: true, sensitive: true })
    const matchWorks = useRouteMatch({ path: _works, strict: true, sensitive: true })

    const isSHome = matchHome && matchHome.isExact
    const isProcess = matchProcess && matchProcess.isExact
    const isWorks = matchWorks && matchWorks.isExact


    if (!isSHome && !isProcess && !isWorks) return null

    const history = useHistory()

    const onClickTab = (tab) => {
        history.push(tab)
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

    return (
        <div className="main-tab flex-around-center">
            <div className="flex-around-center">
                <div className='main-tab-item text-center p-x-25' onClick={() => { onClickTab(_home) }}>
                    <div className="main-tab-item">
                        首页
                    </div>
                </div>
                <div className='main-tab-item text-center' onClick={() => { onClickTab(_process) }}>
                    <div className="main-tab-item">
                        版权存证
                    </div>
                </div>
                <div className='main-tab-item text-center' onClick={() => { onClickTab(_works) }}>
                    <div className="main-tab-item">
                        授权作品
                    </div>
                </div>
                <div className='main-tab-item text-center'>
                    区块信息
                </div>
            </div>
            <div className="flex-around-center">
                {/* <div className="main-right-btn m-x-13 mr-30 curser-pointer" onClick={handelOriginal}>原创登记</div>
                <div className="main-right-btn m-x-13 curser-pointer">版权登记</div> */}
                <div className="main-right-icon m-x-13">
                    <img src={require('src/images/search.png')} alt=""/>
                </div>
                <div className="main-right-icon m-x-13">
                    <img src={require('src/images/notice.png')} alt=""/>
                </div>
                <Dropdown overlay={menu}>
                    <div className="main-right-avatar curser-pointer flex-around-center ml-23">
                        <img src={require('src/images/avatar.png')} alt=""/>
                        <span className="user-name-box">June</span>
                    </div>
                </Dropdown>
            </div>
        </div>
    )
}