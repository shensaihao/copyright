import React, {useState, useEffect} from 'react'
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import Header from 'src/pages/H5/Header';
import { message } from 'antd';
import {  useLoading, copyrightService } from 'src/service';


export default function H5WorksList() {

    const [worksList, setWorksList] = useState([])
    const [loading, getAllByCondition] = useLoading(copyrightService.getAllByCondition)
    const history = useHistory()

    const copyrightRegister = {
        'TRADITION_TYPE': '传统知识存与保护',
        'BRAND_TYPE': '商标和商号存证',
        'TECH_TYPE': '技术成果存证',
        'COPYRIGHT_TYPE': '版权作品存证',
        'SOURCE_TYPE': '原产地存证'
    }

    const handelClickListItme = (id) => {
        history.push(`/worksdetail?id=${id}`)
    }

    const handelClickFilter = (type) => {
        console.log(type)
        if (type==='ALL') {
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
            getAllByCondition({copyrightRegister: type}).then((res) => {
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
    }

    useEffect(() => {
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
    }, [getAllByCondition, history])

    const getImageList = (list) => {
        if (list) {
            const newArr = list.split(",")
            if (newArr) return newArr[0]
            else return list
        }
    }

    return (
        <>
        <Header title={'公开作品'} right={'true'} handelClickFilter={handelClickFilter}/>
        <div className="h5_home_works_box h5_home_works_list_box">
            <div className="h5_home_works_box_workslist flex-between-center flex-wrap">
                {
                    worksList&& worksList.map((item) => {
                        return (
                            <div className="h5_works_item_box flex-column-center curser-pointer" key={item.id} onClick={() => handelClickListItme(item.id)}>
                                <div className="h5_works_item_image flex-center-center">
                                    <img src={getImageList(item.productionCheck)} alt=""/>
                                </div>
                                <div className="flex-between-center">
                                    <div className="color-main h5_works_item_name text-overflow">《{item.productionName}》</div>
                                    <div className="color-secondry h5_works_item_date">{dayjs(item.createDate).format('YYYY-MM-DD')}</div>
                                </div>
                                <div className="flex-start">
                                    {/* <div className="color-secondry ft-size-14">#原创新衣#</div> */}
                                    <div className="color-secondry h5_works_item_tag">#{copyrightRegister[item.copyrightRegister]}#</div>
                                </div>
                                <div className="color-secondry text-overflow h5_works_item_tag">哈希：{item.messageChainHash}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}
