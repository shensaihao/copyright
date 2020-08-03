import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'
import {Dropdown, Menu} from 'antd'
import { Layout } from 'antd';
import { Form, Button, Input,Radio } from 'antd';
import { UserOutlined, LaptopOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default function Certification() {
    const history = useHistory()
    const [license, setLicense] = useState([])
    const [idCard, setIdCard] = useState([])
    const [status, setStatus] = useState(false)
    // const [form, setForm] = useState({})

    // useEffect(() => {
    //     const sta = localStorage.getItem('status')
    //     setStatus(sta)
    //     const info = JSON.parse(localStorage.getItem('info'))
    //     setForm(info)
    //     console.log(info)
    // }, [status])
    

    const handelRegistration = () => {
        history.push('/home')
    }

    const handelOriginal = () => {
        history.push('/original')
    }

    const handelCertification = () => {
        history.push('/certification')
    }

    const onFinish = (value) => {
        setStatus(true)
        localStorage.setItem('status', true)
        const values = JSON.stringify(value)
        localStorage.setItem('info', values)
    };

    const handelChangeIdCard = (fileList) => {
        setIdCard(fileList.fileList)
    }

    const handelChangeLicense = (fileList) => {
        setLicense(fileList.fileList)
    }

    const menu = (
        <Menu>
          <Menu.Item onClick={handelCertification}>
            实名认证
          </Menu.Item>
          <Menu.Item>
            原创作品
          </Menu.Item>
          <Menu.Item>
            版权作品
          </Menu.Item>
          <Menu.Item>
            退出登录
          </Menu.Item>
        </Menu>
      );

    const header = (
        <div className="main-tab flex-around-center">
            <div className="flex-around-center">
                <div className='main-tab-item text-center p-x-25'>
                    <div className="main-tab-item">
                        首页
                    </div>
                </div>
                <div className='main-tab-item text-center'>
                    版权交易
                </div>
                <div className='main-tab-item text-center'>
                    版权查询
                </div>
                <div className='main-tab-item text-center'>
                    区块信息
                </div>
            </div>
            <div className="flex-around-center">
                <div className="main-right-btn m-x-13 mr-30 curser-pointer" onClick={handelOriginal}>原创登记</div>
                <div className="main-right-btn m-x-13 curser-pointer" onClick={handelRegistration}>版权登记</div>
                <div className="main-right-icon m-x-13">
                    <img src={require('src/images/search.png')} alt=""/>
                </div>
                <div className="main-right-icon m-x-13">
                    <img src={require('src/images/notice.png')} alt=""/>
                </div>
                <Dropdown overlay={menu}>
                    <div className="main-right-avatar flex-around-center ml-23">
                        <img src={require('src/images/avatar.png')} alt=""/>
                        <span className="user-name-box">June</span>
                    </div>
                </Dropdown>
            </div>
        </div>
    )

    const uploadBtn = (
        <>
            <UploadOutlined style={{fontSize: '40px',color:'#7D8EA8'}}/>
            <div>上传</div>
        </>
    )

    return (
        <Layout>
            <Header>
                {header}
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                    >
                    <SubMenu key="sub1" icon={<UserOutlined />} title="账号管理">
                        <Menu.Item key="1">实名认证</Menu.Item>
                        <Menu.Item key="2">账号修改</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<LaptopOutlined />} title="作品登记">
                        <Menu.Item key="5">原创作品</Menu.Item>
                        <Menu.Item key="6">版权作品</Menu.Item>
                    </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                    >
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        size="middle"
                    >
                        <Form.Item style={{width: '700px'}}>
                            <span className="label-gray">实名认证</span>
                            <Form.Item
                                name="certification"
                                rules={[{ required: true, message: '请选择实名认证类型' }]}
                            >
                                <Radio.Group>
                                    <Radio value='people'>个人认证</Radio>
                                    <Radio value='compony'>企业认证</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Form.Item>
                        
                        <Form.Item>
                            <span className="label-gray">企业属性</span>
                            <Form.Item
                                style={{width: '700px'}}
                                name="attribute"
                                rules={[{ required: true, message: '请选择企业属性' }]}
                            >
                                <Radio.Group>
                                    <Radio value='profit'>盈利企业</Radio>
                                    <Radio value='public'>公益企业</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item>
                            <span className="label-gray">企业全称</span>
                            <Form.Item
                                style={{width: '700px'}}
                                name="full_name"
                                rules={[{ required: true, message: '请输入企业全称' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        
                        <Form.Item>
                            <span className="label-gray">企业营业执照</span>
                            <div className="step-one-upload flex-center">
                            <Form.Item
                                name="license"
                                rules={[{ required: true, message: '请上传企业营业执照' }]}
                                
                            >
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={license}
                                    onChange={handelChangeLicense}
                                    >
                                        {
                                            license.length > 0 ? null : uploadBtn
                                        }
                                </Upload>
                            </Form.Item>
                            </div>
                        </Form.Item>

                        <Form.Item>
                            <span className="label-gray">企业机构代码</span>
                            <Form.Item
                                style={{width: '700px'}}
                                name="organization_code"
                                rules={[{ required: true, message: '请输入企业机构代码' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item>
                            <span className="label-gray">企业法人代表</span>
                            <Form.Item
                                style={{width: '700px'}}
                                name="legal_representative"
                                rules={[{ required: true, message: '请输入企业法人代表' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item>
                            <span className="label-gray">企业法人身份证</span>
                            <div className="step-one-upload flex-center">
                            <Form.Item
                                name="id_card"
                                rules={[{ required: true, message: '请上传企业法人身份证' }]}
                                
                            >
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={idCard}
                                    onChange={handelChangeIdCard}
                                    >
                                        {
                                            idCard.length > 0 ? null : uploadBtn
                                        }
                                </Upload>
                            </Form.Item>
                            </div>
                        </Form.Item>
                
                        <Form.Item style={{width: '700px'}}>
                            {
                                !status &&
                                <Button type="primary" size="large" htmlType="submit" style={{width: '100%'}}>
                                    登记
                                </Button>
                            }
                            
                            {
                                status &&
                                <Button disabled size="large" style={{width: '100%'}}>
                                    审核中
                                </Button>
                            }
                        </Form.Item>
                    </Form>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}
