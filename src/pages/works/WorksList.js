import React,{ useState, useEffect } from 'react'
import {Button} from 'antd';
import {useHistory} from 'react-router-dom'

export default function WorksList() {

    const [worksList, setWorksList] = useState([])
    const histiry = useHistory()

    const handelClickListItme = (id) => {
        histiry.push(`/worksdetail?id=${id}`)
    }

    return (
        <div className="list_box">
            <div className="list_wraper">
                <div className="list_top flex-start mb-25">
                    <div className="color-secondry ft-size-18 mr-40">登记类型</div>
                    <Button type="primary" className="mr-40">全部</Button>
                    <Button  className="mr-40">版权登记</Button>
                    <Button  className="mr-40">商标与商号认证</Button>
                    <Button  className="mr-40">技术成果认证</Button>
                    <Button  className="mr-40">原产地认证</Button>
                    <Button  className="mr-40">传统文化保护与认证</Button>
                </div>
                {
                    worksList.length === 0 &&
                    <div className="flex-column-center-center mt-100">
                        <img src={require('src/images/works_list_empty.png')} alt=""/>
                        <div className="color-secondry mt-20">
                            <span> 作品被藏起来了 </span>
                            <span className="font-main curser-pointer"> 刷新  </span>
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
                                    <div className="list_item_box flex-column-center" onClick={() => handelClickListItme(item.id)}>
                                    <div className="works_item_image flex-center-center">
                                        <img src={item.url} alt=""/>
                                    </div>
                                    <div className="flex-between-center mt-15">
                                        <div className="color-main">《{item.name}》</div>
                                        <div className="color-secondry ft-size-14">{item.date}</div>
                                    </div>
                                    <div className="flex-start">
                                        <div className="color-secondry ft-size-14">#{item.type}#</div>
                                        <div className="color-secondry ft-size-14">#{item.type}#</div>
                                    </div>
                                    <div className="color-secondry ft-size-14">哈希：{item.hash}......</div>
                                </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}
