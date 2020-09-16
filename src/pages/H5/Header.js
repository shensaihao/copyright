import React, {useState, useEffect} from 'react'
import { Drawer } from 'antd-mobile';
import { Radio, message} from 'antd';
import { useHistory } from 'react-router-dom';
import { mineService, useLoading } from 'src/service';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'src/store/actions';


export default function Header(props) {
    const [open, setOpen] = useState(false)
    const [filter, setFilter] = useState(false)
    const [searchQuery, setSearchQuery] = useState('ALL')
    const history = useHistory()
    const dispatch = useDispatch()
    const [loading, getAuthLogout] = useLoading(mineService.getAuthLogout)
    
    const login = useSelector(state => state.login)

    const handelClickLogout = () => {
        getAuthLogout().then(() => {
            message.success('退出登录成功')
            dispatch(actions.setLogin(false))
            history.push('/login')
        }).catch(() => {
            history.push('/login')
            message.success('退出登录成功')
            dispatch(actions.setLogin(false))
        })
    }

    const sidebar = (
        <div className="flex-column-center h5_home_header_top">
            <div className="h5_home_header_search_input flex-start">
                <img src={require('src/images/h5_drwar_icon_search.png')} alt=""/>
                <input type="text" className="home_search_input ml-10"/>
            </div>
            {
                !login&&
                    <div className="flex-start h5_home_header_item" onClick={() => history.push('/login')}>
                        <img className="h5_home_header_item_img" src={require('src/images/h5_drwar_icon_user.png')} alt=""/>
                        <div className="h5_home_header_item_name">登录注册</div>
                    </div>
            }
            <div className="flex-start h5_home_header_item" onClick={() => history.push('/workslist')}>
                <img className="h5_home_header_item_img" src={require('src/images/h5_drwar_icon_works.png')} alt=""/>
                <div className="h5_home_header_item_name">公开作品</div>
            </div>
            {
                login&&
                <>
                    <div className="flex-start h5_home_header_item" onClick={() => history.push('/copyrightlist')}>
                        <img className="h5_home_header_item_img" src={require('src/images/h5_drwar_icon_myworks.png')} alt=""/>
                        <div className="h5_home_header_item_name">我的作品</div>
                    </div>
                    <div className="flex-start h5_home_header_item" onClick={() => history.push('/userphone')}>
                        <img className="h5_home_header_item_img" src={require('src/images/h5_drwar_icon_acount.png')} alt=""/>
                        <div className="h5_home_header_item_name">手机账号</div>
                    </div>
                    <div className="flex-center h5_home_header_btn" onClick={handelClickLogout}>
                        退出登录
                    </div>
                </>
            }
        </div>
    );

    const options = [
        { label: '全部', value: 'ALL' },
        { label: '版权登记', value: 'COPYRIGHT_TYPE' },
        { label: '商标与商号认证', value: 'BRAND_TYPE' },
        { label: '技术成果认证', value: 'TECH_TYPE' },
        { label: '原产地认证', value: 'SOURCE_TYPE' },
        { label: '传统文化保护与认证', value: 'TRADITION_TYPE' },
    ];

    // useEffect(() => {
    //     if (props.handelClickFilter) {
    //         if (searchQuery==='ALL') {
    //             props.handelClickFilter('ALL')
    //         } else {
    //             props.handelClickFilter(searchQuery)
    //         }
    //     }
    // }, [props, searchQuery])

    const onSearchQuery = (e) => {
        setSearchQuery(e.target.value)
            if (props.handelClickFilter) {
                if (e.target.value==='ALL') {
                    props.handelClickFilter('ALL')
                } else {
                    props.handelClickFilter(e.target.value)
                }
            }
    }

    const filtersidebar = (
        <div className="flex-column-center">
            <div className="h5_home_header_filter">
                筛选
            </div>
            <div className="h5_home_header_line"></div>
            <div className="h5_home_header_title">
                登记类型
            </div>
            <div>
                <Radio.Group
                    options={options}
                    onChange={onSearchQuery}
                    value={searchQuery}
                    optionType="button"
                    buttonStyle="solid"
                    className="h5_filter_button"
                />
            </div>
        </div>
    )

    const handelChangeOpen = () => {
        setOpen(!open)
    }

    const handelChangeFilter = () => {
        setFilter(!filter)
    }

    return (
        <>
            <div className="h5_header position-fixed flex-between-center">
                {
                    !open&&
                    <div className="flex-start">
                        {
                            !open&&<img className="h5_header_icon" src={require('src/images/h5_header_left_icon.png')} onClick={handelChangeOpen} alt=""/>
                        }
                        {
                            (props.back&&!open)&&<img className="h5_header_icon_back h5_header_icon" src={require('src/images/h5_header_icon_back.png')} onClick={() => history.goBack()} alt=""/>
                        }
                    </div>
                }
                {
                    open&&<img className="h5_header_icon" src={require('src/images/h5_drawer_close.png')} onClick={handelChangeOpen} alt=""/>
                }
                <div className="h5_header_title">{props.title}</div>
                {
                    props.right&&<img className="h5_header_icon" src={require('src/images/h5_header_right_icon.png')} alt="" onClick={handelChangeFilter}/>
                }
                {
                    !props.right&&<div></div>
                }
            </div>
            <Drawer
                className={'header-drawer header-drawer-top'}
                enableDragHandle
                sidebar={sidebar}
                open={open}
                onOpenChange={(value) => {
                    if (value) {
                        document.getElementsByTagName('body')[0].setAttribute('style', 'overflow: hidden;')
                    } else {
                        document.getElementsByTagName('body')[0].setAttribute('style', 'overflow: hidden;')
                    }
                    setOpen(value)
                }}
            >
                <div></div>
            </Drawer>
            <Drawer
                className={'header-drawer header-drawer-right'}
                style={{ minHeight: document.documentElement.clientHeight }}
                enableDragHandle
                sidebar={filtersidebar}
                open={filter}
                onOpenChange={(value) => {
                    if (value) {
                        document.getElementsByTagName('body')[0].setAttribute('style', 'overflow: hidden;')
                    } else {
                        document.getElementsByTagName('body')[0].setAttribute('style', '')
                    }
                    setFilter(value)
                }}
            >
                <div></div>
            </Drawer>
        </>
    )
}
