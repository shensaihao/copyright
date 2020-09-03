import React,{useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Form, Menu, Table, Card, Space, Button, Select,message  } from 'antd';
import { UserOutlined, LaptopOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

import {originalService, useLoading} from 'src/service'


const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const { Option } = Select;

export default function Certification() {
    const [loading, cpyrightVerifyByCondition] = useLoading(originalService.getCopyrightVerifyByCondition)
    const [type, setType] = useState('ORIGINAL_TYPE')
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
        }).catch((res) => {
            if (res.responseCode==='_501') {
                message.warning('登录已过期')
                history.push('/login')
            }
        })
    }, [cpyrightVerifyByCondition, history, type])

    const copyrightRegister = {
        'TRADITION_TYPE': '传统知识存与保护',
        'BRAND_TYPE': '商标和商号存证',
        'TECH_TYPE': '技术成果存证',
        'COPYRIGHT_TYPE': '版权作品存证',
        'SOURCE_TYPE': '原产地存证'
    }

    const columns = [
        {
            title: '登记类型',
            dataIndex: 'copyrightRegister',
            key: 'copyrightRegister',
            render: text => <a>{copyrightRegister[text]}</a>,
          },
          {
            title: '登记号',
            dataIndex: 'registerNumber',
            key: 'registerNumber',
          },
          {
            title: '登记时间',
            dataIndex: 'createDate',
            key: 'createDate',
            render: (text) => (
                dayjs(text).format('YYYY-MM-DD')
            )
          },
          {
              title: '登记上链哈希',
              dataIndex: 'messageChainHash',
              key: 'messageChainHash',
          },
          {
              title: '上链区块',
              dataIndex: 'chainBlock',
              key: 'chainBlock',
          },
          {
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <Space size="middle">
                  <Button onClick={() => history.push({pathname:'/originaldetail', state: record})} type='link'>详情</Button>
              </Space>
            ),
          },
      ];

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
      
      const handelTableChange = (item) => {
        cpyrightVerifyByCondition({'registerType': type,'page': item.current-1,'copyrightRegister': copyright}).then((res) => {
            setDataList(res.data.content)
            setTotal(res.data.totalElements)
            setSize(res.data.size)
        }).catch((res) => {
            if (res.responseCode==='_501') {
                message.warning('登录已过期')
                history.push('/login')
            }
        })
      }

      const form = (
            <div className="mb-30">
                <span>登记类型：</span>
                <Select
                    value={copyright}
                    placeholder="请选择类型"
                    onChange={setCopyright}
                    >
                    <Option value="TECH_TYPE">技术成果存证</Option>
                    <Option value="COPYRIGHT_TYPE">版权作品存证</Option>
                    <Option value="BRAND_TYPE">商标和商号存证</Option>
                    <Option value="SOURCE_TYPE">原产地存证</Option>
                    <Option value="TRADITION_TYPE">传统知识存证与保护</Option>
                </Select>
            </div>
      )

    return (
        <div className="flex-start-center">
            <Sider width={200} className="site-layout-background">
                    <Menu
                    mode="inline"
                    style={{ height: '100%', borderRight: 0 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    >
                        <Menu.Item key="1">
                            <Link to="/originallist">我的作品</Link>   
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/originallist">绑定手机</Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/copyrightlist">实名信息</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px',minHeight: '520px', background: 'rgba(249,251,253,1)' }}>
                    <Content
                    className="site-content-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                    >
                      <Card style={{minHeight:'520px'}}>
                          {
                              form
                          }
                        <Table columns={columns} dataSource={dataList} onChange={handelTableChange} pagination={{total: total, defaultPageSize: 15}}/>
                    </Card>
                    </Content>
                </Layout>
        </div>
    )
}
