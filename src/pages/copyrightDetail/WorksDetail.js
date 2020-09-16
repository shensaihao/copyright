import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import {copyrightService, useLoading} from 'src/service';
import { message, Carousel } from 'antd';
import dayjs from 'dayjs'
import copy from 'copy-to-clipboard';

export default function WorksDetail() {

    const location = useLocation()
    const history = useHistory()
    const [id, setId] = useState('')
    const [detailInfo, setDetailInfo] = useState({})
    const [detailImage, setDetailImage] = useState([])
    const [loading, getDetailInfo] = useLoading(copyrightService.getDetailInfo)

    const handelClickCopyHash = (hash) => {
        copy(hash)
        message.success('复制成功')
    }

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
    }, [getDetailInfo, history, id, location])

    const copyrightRegister = {
        'TRADITION_TYPE': '传统知识存与保护',
        'BRAND_TYPE': '商标和商号存证',
        'TECH_TYPE': '技术成果存证',
        'COPYRIGHT_TYPE': '版权作品存证',
        'SOURCE_TYPE': '原产地存证',
    }

    return (
        <>
        <div className="humberger_box flex-start">
            <div className="humberger_box_name curser-pointer" onClick={() => history.push('/home')}>首页</div>
            <div className="humberger_box_line"> / </div>
            <div className="humberger_box_name curser-pointer" onClick={() => history.push('/workslist')}>公开作品</div>
            <div className="humberger_box_line"> /</div>
            <div className="humberger_box_active curser-pointer">作品详情</div>
        </div>
        <div className="detail_box">
            <div className="works_info mb-50">
                <div className="color-main ft-size-20 font-weight">作品信息</div>
                <div className="works_info_line mt-10 mb-40"></div>
                <div className="slider_wraper">
                <Carousel>
                    <div className="flex-start">
                        {
                            detailImage&&detailImage.map((item, index) => {
                                return (
                                    <div key={index} className="works_info_img flex-center mr-20">
                                        <img src={item} alt=""/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Carousel>
                    
                </div>
                <div className="flex-column-center">
                    <div className="flex-start m-y-10 ft-size-16">
                        <div className="step-four-label detail_lable_box mr-30">作品名称</div>
                        <div>
                            {detailInfo.productionName}
                        </div>
                    </div>
                    <div className="flex-start m-y-10 ft-size-16">
                        <div className="step-four-label detail_lable_box mr-30">作品类型</div>
                        <div>
                            {copyrightRegister[detailInfo.copyrightRegister]}
                        </div>
                    </div>
                    <div className="flex-start m-y-10 ft-size-16">
                        <div className="step-four-label detail_lable_box mr-30">所处阶段</div>
                        <div>
                            完成并应用
                        </div>
                    </div>  
                    <div className="flex-start m-y-10 ft-size-16">
                        <div className="step-four-label detail_lable_box mr-30">作品完成人员</div>
                        <div>
                            {detailInfo.authorName}
                        </div>
                    </div>
                    <div className="flex-start m-y-10 ft-size-16">
                        <div className="step-four-label detail_lable_box mr-30">作品简介</div>
                        <div>
                            我是作品简介，我是作品简介，我是作品简介
                        </div>
                    </div>
                </div>
            </div>
            <div className="certification_info">
                <div className="color-main ft-size-20 font-weight">认证信息</div>
                <div className="works_info_line mt-10 mb-40"></div>
                <div className="flex-start">
                    <div className="certification_info_img mr-75">
                        <img src={detailInfo.registerCertificate} alt=""/>
                    </div>
                    <div className="flex-column-center">
                        <div className="flex-start m-y-10 ft-size-16" style={{width: '600px'}}>
                            <div className="step-four-label detail_lable_box mr-30">登记号</div>
                            <div>
                                {detailInfo.registerNumber}
                            </div>
                        </div>
                        <div className="flex-start m-y-10 ft-size-16" style={{width: '600px'}}>
                            <div className="step-four-label detail_lable_box mr-30">著作权人</div>
                            <div>
                                {detailInfo.authorName}
                            </div>
                        </div>
                        <div className="flex-start m-y-10 ft-size-16" style={{width: '600px'}}>
                            <div className="step-four-label detail_lable_box mr-30">登记链上哈希</div>
                            <div className="detail_lable_box_value">
                                {detailInfo.messageChainHash} <img onClick={() => handelClickCopyHash(detailInfo.messageChainHash)} className="curser-pointer ml-10" src={require('src/images/h5_modal_copy.png')} alt=""/>
                            </div>
                        </div>
                        <div className="flex-start m-y-10 ft-size-16" style={{width: '600px'}}>
                            <div className="step-four-label detail_lable_box mr-30">区块信息</div>
                            <div>
                                {detailInfo.chainBlock}
                            </div>
                        </div>
                        <div className="flex-start m-y-10 ft-size-16" style={{width: '600px'}}>
                            <div className="step-four-label detail_lable_box mr-30">登记日期</div>
                            <div>
                                {dayjs(detailInfo.createDate).format('YYYY-MM-DD')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
