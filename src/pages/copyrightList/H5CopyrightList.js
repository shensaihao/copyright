import React,{useState, useEffect} from 'react'
import { message } from 'antd';
import { useHistory } from 'react-router-dom'
import dayjs from 'dayjs'

import {mineService, useLoading} from 'src/service'
import Header from 'src/pages/H5/Header'
import copy from 'copy-to-clipboard';

const copyrightRegister = {
    'TRADITION_TYPE': '传统知识存与保护',
    'BRAND_TYPE': '商标和商号存证',
    'TECH_TYPE': '技术成果存证',
    'COPYRIGHT_TYPE': '版权作品存证',
    'SOURCE_TYPE': '原产地存证'
}

export default function H5CopyrightList() {
    const [loading, getOwnByCondition] = useLoading(mineService.getOwnByCondition)
    const [worksList, setWorksList] = useState([])
    const history = useHistory()


    useEffect(() => {
        getOwnByCondition().then((res) => {
            setWorksList(res.data.records)
        }).catch((res) => {
            if (res.responseCode==='_501') {
                message.warning('登录已过期')
                history.push('/login')
            } else {
                message.warning('网络错误，请刷新重试')
            }
        })
    }, [getOwnByCondition, history])

    const handelClickWorks = () => {
        copy('http://47.100.225.40:8888/#/works?type=COPYRIGHT_TYPE')
        message.success('复制成功')
    }

    const handelClickListItme = (id) => {
        history.push(`/worksdetail?id=${id}`)
    }

    const getImageList = (list) => {
        if (list) {
            const newArr = list.split(",")
            if (newArr) return newArr[0]
            else return list
        }
    }

    const NoCertificationList = (
        <div className="flex-column-center-center">
            <div className="flex-column-center-center mt-100">
                <img className="h5_works_list_notcertification" src={require('src/images/h5_works_list_notcertification.png')} alt=""/>
                <div className="color-secondry text-center">
                    您还没有认证作品，请电脑打开网址：                     
                    <span className="font-main ml-10 curser-pointer" onClick={handelClickWorks}>
                        http://47.100.225.40:8888/#/works?type=COPYRIGHT_TYPE
                    </span>
                    进行认证
                </div>
            </div>
        </div>
    )

    const MyWorksList  = (
        <div className="h5_home_works_box h5_home_works_list_box">
            <div className="h5_home_works_box_workslist flex-between-center flex-wrap">
                {
                    worksList&& worksList.map((item) => {
                        return (
                            <div className="h5_works_item_box flex-column-center curser-pointer" key={item.id} onClick={() => handelClickListItme(item.id)}>
                                <div className="h5_works_item_image flex-center-center">
                                    <img src={getImageList(item.productionCheck)} alt=""/>
                                </div>
                                <div className="flex-between-center mt-15">
                                    <div className="color-main h5_works_item_name text-overflow">《{item.productionName}》</div>
                                    <div className="color-secondry h5_works_item_date">{dayjs(item.createDate).format('YYYY-MM-DD')}</div>
                                </div>
                                <div className="flex-start">
                                    {/* <div className="color-secondry ft-size-14">#原创新衣#</div> */}
                                    <div className="color-secondry h5_works_item_tag">#{copyrightRegister[item.copyrightRegister]}#</div>
                                </div>
                                <div className="color-secondry h5_works_item_tag text-overflow">哈希：{item.messageChainHash}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

    return (
        <>
        <Header title={'我的作品'}/>
        <div className="h5_copyright_box">
            {
                worksList.length>0&&
                <div className="flex-start-center h5_copyright_wraper">
                    {
                        MyWorksList
                    }
                </div>
            }
            {
                <div className="flex-column-center-center">
                    {
                        worksList.length===0&&NoCertificationList
                    }
                </div>
            }
            
        </div>
        </>
    )
}
