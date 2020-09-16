import React,{ useState, useEffect } from 'react'
import {Button, message, Radio} from 'antd';
import {useHistory, useLocation} from 'react-router-dom'
import {homeService, useLoading,copyrightService} from 'src/service';
import dayjs from 'dayjs'

export default function WorksList() {

    const [worksList, setWorksList] = useState([])
    const [loading, findByProductionName] = useLoading(homeService.findByProductionName)
    const [loading1, getAllByCondition] = useLoading(copyrightService.getAllByCondition)
    const [productionName, setProductionName] = useState('')
    const history = useHistory()
    const location = useLocation()
    const [searchQuery, setSearchQuery] = useState('ALL')

    const handelClickListItme = (id) => {
        history.push(`/worksdetail?id=${id}`)
    }

    const copyrightRegister = {
        'TRADITION_TYPE': '传统知识存与保护',
        'BRAND_TYPE': '商标和商号存证',
        'TECH_TYPE': '技术成果存证',
        'COPYRIGHT_TYPE': '版权作品存证',
        'SOURCE_TYPE': '原产地存证',
    }

    useEffect(() => {
        const productionName = getParam(location.search, 'productionName')
        setProductionName(productionName)
        if (productionName) {
            findByProductionName({productionName: productionName, page: 1,size: 20}).then((res) => {
                setWorksList(res.data.records)
            }).catch((res) => {
                if (res.responseCode==='_501') {
                    message.warning('登录已过期')
                    history.push('/login')
                } else {
                    message.warning(res.errorMsg)
                }
            })
        }
    }, [findByProductionName, history, location.search])
    
    useEffect(() => {
        if (searchQuery==='ALL') {
            getAllByCondition().then((res) => {
                setWorksList(res.data.records)
            }).catch((res) => {
                if (res.responseCode==='_501') {
                    message.warning('登录已过期')
                    history.push('/login')
                } else {
                    message.warning(res.errorMsg)
                }
            })
        } else {
            getAllByCondition({copyrightRegister: searchQuery}).then((res) => {
                setWorksList(res.data.records)
            }).catch((res) => {
                if (res.responseCode==='_501') {
                    message.warning('登录已过期')
                    history.push('/login')
                } else {
                    message.warning(res.errorMsg)
                }
            })
        }
    }, [getAllByCondition, history, searchQuery])


    const getParam = (url, name) => {
        try {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = url.split('?')[1].match(reg);
            if(r != null) {
                return r[2];
            }
            return "";//如果此处只写return;则返回的是undefined
        } catch(e) {
            return "";//如果此处只写return;则返回的是undefined
        }
    }

    const onSearchQuery = (e) => {
        setSearchQuery(e.target.value)
    }

    const refreshPage = () => {
        setSearchQuery('ALL')
    }
    
    const options = [
        { label: '全部', value: 'ALL' },
        { label: '版权登记', value: 'COPYRIGHT_TYPE' },
        { label: '商标与商号认证', value: 'BRAND_TYPE' },
        { label: '技术成果认证', value: 'TECH_TYPE' },
        { label: '原产地认证', value: 'SOURCE_TYPE' },
        { label: '传统文化保护与认证', value: 'TRADITION_TYPE' },
    ];

    const getImageList = (list) => {
        if (list) {
            const newArr = list.split(",")
            if (newArr) return newArr[0]
            else return list
        }
    }

    return (
        <>
        <div className="humberger_box flex-start">
            <div className="humberger_box_name curser-pointer" onClick={() => history.push('/home')}>首页</div>
            <div className="humberger_box_line"> / </div>
            <div className="humberger_box_active curser-pointer">公开作品</div>
        </div>
        <div className="list_box">
            <div className="list_wraper">
                <div className="list_top flex-start mb-25">
                    <div className="color-secondry ft-size-18 mr-40">登记类型</div>
                    <Radio.Group
                        options={options}
                        onChange={onSearchQuery}
                        value={searchQuery}
                        optionType="button"
                        buttonStyle="solid"
                    />
                </div>
                {
                    worksList.length === 0 &&
                    <div className="flex-column-center-center mt-100">
                        <img src={require('src/images/works_list_empty.png')} alt=""/>
                        <div className="color-secondry mt-20">
                            <span> 作品被藏起来了 </span>
                            <span className="font-main curser-pointer" onClick={refreshPage}> 刷新  </span>
                            <span> 试试</span>
                        </div>
                    </div>
                }
                {
                    worksList.length > 0&&
                    <div className="list_item_wraper flex-wrap flex-start">
                        {
                            worksList.map((item) => {
                                return (
                                    <div className="list_item_box flex-column-center curser-pointer" key={item.id} onClick={() => handelClickListItme(item.id)}>
                                        <div className="works_item_image flex-center-center">
                                            <img src={getImageList(item.productionCheck)} alt=""/>
                                        </div>
                                        <div className="flex-between-center mt-15">
                                            <div className="color-main">《{item.productionName}》</div>
                                            <div className="color-secondry ft-size-14">{dayjs(item.createDate).format('YYYY-MM-DD')}</div>
                                        </div>
                                        <div className="flex-start">
                                            {/* <div className="color-secondry ft-size-14">#{item.type}#</div> */}
                                            <div className="color-secondry ft-size-14">#{copyrightRegister[item.copyrightRegister]}#</div>
                                        </div>
                                        <div className="color-secondry ft-size-14 text-overflow">哈希：{item.messageChainHash}......</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </div>
        </>
    )
}
