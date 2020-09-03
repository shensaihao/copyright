import React,{useState, useEffect} from 'react'
import { Menu} from 'antd'
import { Layout } from 'antd';
import { UserOutlined, LaptopOutlined } from '@ant-design/icons';
import { message, Table, Card, Space, Select, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom'
import dayjs from 'dayjs'

import {originalService, useLoading} from 'src/service'

const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const { Option } = Select;

const copyrightRegister = {
    'TRADITION_TYPE': '传统知识存与保护',
    'BRAND_TYPE': '商标和商号存证',
    'TECH_TYPE': '技术成果存证',
    'COPYRIGHT_TYPE': '版权作品存证',
    'SOURCE_TYPE': '原产地存证'
}

export default function Certification() {
    const [loading, cpyrightVerifyByCondition] = useLoading(originalService.getCopyrightVerifyByCondition)
    const [type, setType] = useState('AUTH_TYPE')
    const [dataList, setDataList] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(15)
    const [copyright, setCopyright] = useState(null)
    const history = useHistory()

    useEffect(() => {
        cpyrightVerifyByCondition({'registerType': type}).then((res) => {
            setDataList(res.data.content)
            setTotal(res.data.totalElements)
            setSize(res.data.size)
            console.log(res)
        }).catch((res) => {
            if (res.responseCode==='_501') {
                message.warning('登录已过期')
                history.push('/login')
            }
        })
    }, [cpyrightVerifyByCondition, history, type])

    useEffect(() => {
    cpyrightVerifyByCondition({'registerType': type,'copyrightRegister': copyright}).then((res) => {
        setDataList(res.data.content)
        setTotal(res.data.totalElements)
        setSize(res.data.size)
    }).catch((res) => {
        if (res.responseCode==='_501') {
            message.warning('登录已过期')
            history.push('/login')
        }
    })
    }, [copyright, cpyrightVerifyByCondition, history, type])

    const handelClickCertification = () => {
        history.push('/certification')
    }

    const handelClickWorks = () => {
        history.push('/works')
    }

    const NotCertification = (
        <div className="flex-column-center-center">
            <div className="flex-column-center-center mb-70">
                <img src={require('src/images/user_not_works.png')} alt=""/>
                <div className="color-secondry">
                    您还没有认实名认证
                    <span className="font-main ml-10 curser-pointer" onClick={handelClickCertification}>
                        立即认证
                    </span>
                </div>
            </div>
            <div className="flex-column-center-center">
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
            <div className="works_item_box flex-column-center">
                <div className="works_item_image flex-center-center">
                    <img src="" alt=""/>
                </div>
                <div className="flex-between-center mt-15">
                    <div className="color-main">《皇帝的新衣》</div>
                    <div className="color-secondry ft-size-14">2020-08-15</div>
                </div>
                <div className="flex-start">
                    <div className="color-secondry ft-size-14">#原创新衣#</div>
                    <div className="color-secondry ft-size-14">#版权登记#</div>
                </div>
                <div className="color-secondry ft-size-14">哈希：ahjsdkjhfajksfakshfhasdsas......</div>
            </div>

        </div>
    )

    return (
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
                        </Content>
                    </Layout>
            </div>
        </div>
        
    )
}
