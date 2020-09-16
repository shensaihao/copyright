import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import {copyrightService, useLoading} from 'src/service';
import { Carousel } from 'antd-mobile';
import {message} from 'antd'
import dayjs from 'dayjs'
import Header from 'src/pages/H5/Header'

export default function H5WorksDetail() {
    const location = useLocation()
    const history = useHistory()
    const [id, setId] = useState('')
    const [detailInfo, setDetailInfo] = useState({})
    const [detailImage, setDetailImage] = useState([])
    const [slideIndex, setSlideIndex] = useState(0)
    const [loading, getDetailInfo] = useLoading(copyrightService.getDetailInfo)

    useEffect(() => {
        const query = location.search.split('=')
        if (query) {
            setId(query[1])
        }
        if (id) {
            getDetailInfo({id: id}).then((res) => {
                setDetailInfo(res.data)
                setDetailImage(res.data.productionCheck.split(','))
            }).catch((res) => {
                if (res.responseCode==='_501') {
                    message.warning('登录已过期')
                    history.push('/login')
                } else {
                    message.warning(res.errorMsg)
                }
            })
        }
    }, [ getDetailInfo, history, id, location])

    const copyrightRegister = {
        'TRADITION_TYPE': '传统知识存与保护',
        'BRAND_TYPE': '商标和商号存证',
        'TECH_TYPE': '技术成果存证',
        'COPYRIGHT_TYPE': '版权作品存证',
        'SOURCE_TYPE': '原产地存证',
    }

    return (
        <>
        <Header title={'作品详情'} back={'true'}/>
        <div className="h5_detail_box">
            <div className="works_info">
                <div className="color-main font-weight h5_detail_box_info">作品信息</div>
                <div className="works_info_line"></div>
                <div className="h5_slider_wraper">
                    {
                        detailImage&&
                        <Carousel className="space-carousel"
                            frameOverflow="visible"
                            infinite
                            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                            afterChange={index => setSlideIndex(index)}
                        >
                            <div className=" flex-start">
                                {
                                    detailImage.map((item, index) => {
                                        return (
                                            <div key={index} className="works_info_img flex-center">
                                                <img src={item} alt=""/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Carousel>
                    }
                    {/* {
                        detailImage.length<3&&detailImage.map((item, index) => {
                            return (
                                <div key={index} className="works_info_img flex-center">
                                    <img src={item} alt=""/>
                                </div>
                            )
                        })
                    } */}
                </div>
                <div className="flex-column-center">
                    <div className="flex-between-center">
                        <div className="h5_detail_box_lable">作品名称</div>
                        <div className="h5_detail_box_value">
                            {detailInfo.productionName}
                        </div>
                    </div>
                    <div className="flex-between-center">
                        <div className="h5_detail_box_lable">作品类型</div>
                        <div className="h5_detail_box_value">
                            {copyrightRegister[detailInfo.copyrightRegister]}
                        </div>
                    </div>
                    <div className="flex-between-center">
                        <div className="h5_detail_box_lable">所处阶段</div>
                        <div className="h5_detail_box_value">
                            完成并应用
                        </div>
                    </div>  
                    <div className="flex-between-center">
                        <div className="h5_detail_box_lable">作品完成人员</div>
                        <div className="h5_detail_box_value">
                            {detailInfo.authorName}
                        </div>
                    </div>
                    <div className="flex-between-center">
                        <div className="h5_detail_box_lable">作品简介</div>
                        <div className="h5_detail_box_value">
                            我是作品简介，我是作品简介，我是作品简介，我是作品简介，我是作品简介我是作品简介，我是作品简介我是作品简介，我是作品简介我是作品简介
                        </div>
                    </div>
                </div>
            </div>
            <div className="certification_info">
                <div className="color-main h5_detail_box_info font-weight">认证信息</div>
                <div className="works_info_line"></div>
                <div className="certification_info_img mr-75">
                    <img src={detailInfo.registerCertificate} alt=""/>
                </div>
                <div className="flex-column-center">
                    <div className="flex-between-center">
                        <div className="h5_detail_box_lable">登记号</div>
                        <div className="h5_detail_box_value">
                            {detailInfo.registerNumber}
                        </div>
                    </div>
                    <div className="flex-between-center">
                        <div className="h5_detail_box_lable">著作权人</div>
                        <div className="h5_detail_box_value">
                            {detailInfo.authorName}
                        </div>
                    </div>
                    <div className="flex-between-center">
                        <div className="h5_detail_box_lable">登记链上哈希</div>
                        <div className="h5_detail_box_value text-overflow">
                            {detailInfo.messageChainHash}
                        </div>
                    </div>
                    <div className="flex-between-center">
                        <div className="h5_detail_box_lable">区块信息</div>
                        <div className="h5_detail_box_value">
                            {detailInfo.chainBlock}
                        </div>
                    </div>
                    <div className="flex-between-center">
                        <div className="h5_detail_box_lable">登记日期</div>
                        <div className="h5_detail_box_value">
                            {dayjs(detailInfo.createDate).format('YYYY-MM-DD')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

