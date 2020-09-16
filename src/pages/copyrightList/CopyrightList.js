import React,{useState, useEffect} from 'react'
import { Menu} from 'antd'
import { Layout } from 'antd';
import { message } from 'antd';
import { Link, useHistory } from 'react-router-dom'
import dayjs from 'dayjs'
import {  useSelector } from 'react-redux';

import {mineService, useLoading} from 'src/service'

const { Content, Sider } = Layout;

const copyrightRegister = {
    'TRADITION_TYPE': '传统知识存与保护',
    'BRAND_TYPE': '商标和商号存证',
    'TECH_TYPE': '技术成果存证',
    'COPYRIGHT_TYPE': '版权作品存证',
    'SOURCE_TYPE': '原产地存证'
}

export default function Certification() {
    const [loading, getOwnByCondition] = useLoading(mineService.getOwnByCondition)
    const [dataList, setDataList] = useState([])
    const [isCertification, setIsCertification] = useState(false)
    const history = useHistory()
    const user = useSelector(state => state.user)

    useEffect(() => {
        if (user.authenticationType) {
            setIsCertification(true)
        }
    }, [user])

    useEffect(() => {
        getOwnByCondition().then((res) => {
            setDataList(res.data.records)
        }).catch((res) => {
            if (res.responseCode==='_501') {
                message.warning('登录已过期')
                history.push('/login')
            } else {
                message.warning(res.errorMsg)
            }
        })
    }, [getOwnByCondition, history])

    const handelClickCertification = () => {
        history.push('/certification')
    }

    const handelClickWorks = () => {
        history.push('/works?type=COPYRIGHT_TYPE')
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

    const NotCertification = (
        <div className="flex-column-center-center">
            <div className="flex-column-center-center">
                <img src={require('src/images/user_not_works.png')} alt=""/>
                <div className="color-secondry">
                    您还没有实名认证
                    <span className="font-main ml-10 curser-pointer" onClick={handelClickCertification}>
                        立即认证
                    </span>
                </div>
            </div>
        </div>
    )
    const NoCertificationList = (
        <div className="flex-column-center-center">
            <div className="flex-column-center-center mt-70">
                <img src={require('src/images/user_not_certification.png')} alt=""/>
                <div className="color-secondry">
                    您还没有认证作品
                    <span className="font-main ml-10 curser-pointer" onClick={handelClickWorks}>
                        立即认证
                    </span>
                </div>
            </div>
        </div>
    )

    const MyWorksList  = (
        <div className="works_list flex-start flex-wrap">
            {
                dataList&& dataList.map((item) => {
                    return (
                        <div className="works_item_box flex-column-center curser-pointer" key={item.id} onClick={() => handelClickListItme(item.id)}>
                            <div className="works_item_image flex-center-center">
                                <img src={getImageList(item.productionCheck)} alt=""/>
                            </div>
                            <div className="flex-between-center mt-15">
                                <div className="color-main">《{item.productionName}》</div>
                                <div className="color-secondry ft-size-14">{dayjs(item.createDate).format('YYYY-MM-DD')}</div>
                            </div>
                            <div className="flex-start">
                                {/* <div className="color-secondry ft-size-14">#原创新衣#</div> */}
                                <div className="color-secondry ft-size-14">#{copyrightRegister[item.copyrightRegister]}#</div>
                            </div>
                            <div className="color-secondry ft-size-14 text-overflow">哈希：{item.messageChainHash}</div>
                        </div>
                    )
                })
            }
        </div>
    )

    return (
        <>
        <div className="humberger_box flex-start">
            <div className="humberger_box_name curser-pointer" onClick={() => history.push('/home')}>首页</div>
            <div className="humberger_box_line"> / </div>
            <div className="humberger_box_active curser-pointer">我的作品</div>
        </div>
        <div className="copyright_box">
            <div className="flex-start-center copyright_wraper">
                <Sider width={200} className="site-layout-background">
                        <Menu
                        mode="inline"
                        style={{ height: '100%', borderRight: 0 }}
                        defaultSelectedKeys={['1']}
                        >
                            <Menu.Item key="1">
                                <Link to="/copyrightlist">我的作品</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/userphone">绑定手机</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to="/certification">实名信息</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px',minHeight: '748px', background: '#fff' }}>
                        <Content
                        className="site-content-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                        >
                        {
                            MyWorksList
                        }
                        {
                            !isCertification&&NotCertification
                        }
                        {
                            dataList.length===0&&NoCertificationList
                        }
                        </Content>
                    </Layout>
            </div>
        </div>
        </>
    )
}
