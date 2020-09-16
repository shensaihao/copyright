import React,{useState} from 'react'
import { Menu} from 'antd'
import { Layout, Modal, message, Button } from 'antd';
import { Link } from 'react-router-dom'
import { useLoading, mineService} from 'src/service';
import Input from 'src/pages/component/Input';
import { useHistory } from 'react-router-dom'

const { Content, Sider } = Layout;

export default function ChangePhone() {
    const [modal, setModal] = useState(false)
    const [telephone, setTelephone] = useState('')
    const [verificationCode, setVerificationCode] = useState('')
    const [loading, changeTelephone] = useLoading(mineService.changeTelephone)

    const history = useHistory()

    const handelClickChange = () => {
        changeTelephone({telephone, verificationCode, }).then(() => {
            message.success('修改成功')
        }).catch((res) => {
            if (res.responseCode==='_501') {
                message.warning('登录已过期')
                history.push('/login')
            } else {
                message.warning(res.errorMsg)
            }
        })
    }

    return (
        <>
        <div className="humberger_box flex-start">
            <div className="humberger_box_name curser-pointer" onClick={() => history.push('/home')}>首页</div>
            <div className="humberger_box_line"> / </div>
            <div className="humberger_box_active curser-pointer">个人中心</div>
        </div>
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
                                        <div className="color-lable ft-size-14 mt-10">手机号和登录账号一致，更换绑定手机登录账号将会变更，请谨慎操作！</div>
                                    </div>
                                    <div className="color-main ft-size-18 font-weight">187******41</div>
                                </div>
                                <div className="change_phone_button flex-center-center" onClick={() => setModal(true)}>更换手机号</div>
                            </div>
                            <Modal
                                visible={modal}
                                className="phone_mmodal"
                                maskClosable={true}
                                onCancel={() => setModal(false)}
                                centered={true}
                                >
                                <div className="phone_modal_content flex-column-center">
                                    <div className="text-center phone_modal_title">更改绑定手机</div>
                                    <span className="phone_modal_lable">手机号</span>
                                    <Input 
                                        value={telephone}
                                        onChange={setTelephone}
                                    />
                                    <span className="phone_modal_lable">验证码</span>
                                    <Input 
                                        value={verificationCode}
                                        onChange={setVerificationCode}
                                        telephone={telephone}
                                        addonafter={'12'}
                                        isRegister={false}
                                    />
                                    <div className="flex-between-center">
                                        <Button className="phone_modal_button" onClick={() => setModal(false)}> 取消</Button>
                                        <Button className="phone_modal_button" type="primary" onClick={handelClickChange}>确定</Button>
                                    </div>
                                </div>
                            </Modal>
                        </Content>
                    </Layout>
            </div>
        </div>
        </>
    )
}
