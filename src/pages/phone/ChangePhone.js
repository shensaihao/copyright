import React from 'react'
import { Menu} from 'antd'
import { Layout } from 'antd';
import { Link } from 'react-router-dom'

const { Content, Sider } = Layout;

export default function ChangePhone() {
    return (
        <div className="phone_box">
            <div className="flex-start-center phone_wraper">
                <Sider width={200} className="site-layout-background">
                        <Menu
                        mode="inline"
                        style={{ height: '100%', borderRight: 0 }}
                        defaultSelectedKeys={['3']}
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
                            <div className="change_phone">
                                <div className="flex-between-center">
                                    <div>
                                        <div className="ft-size-18 color-lable">已绑定手机</div>
                                        <div className="color-lable">手机号和登录账号一致，更换绑定手机登录账号将会变更，请谨慎操作！</div>
                                    </div>
                                    <div className="color-main ft-size-18 font-weight">187******41</div>
                                </div>
                                <div className="change_phone_button flex-center-center">更换手机号</div>
                            </div>
                        </Content>
                    </Layout>
            </div>
        </div>
        
    )
}
