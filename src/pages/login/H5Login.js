import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import * as actions from 'src/store/actions';
import { mineService, useLoading } from 'src/service';
import { Input, Button } from 'src/pages/component';
import { Tabs, Radio, message } from 'antd';
import md5 from 'js-md5';
import Header from 'src/pages/H5/Header';

const { TabPane } = Tabs;

export default function H5Login() {
    const dispatch = useDispatch();
    const login = useSelector(state => state.login)

    const [username, setUsername] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [account, setAccount] = useState('')
    const [telephone, setTelephone] = useState('')
    const [code, setCode] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const [userType, setUserType] = useState('PERSONAL_CREATOR')
    const history = useHistory()
    const [loading, logins] = useLoading(mineService.postAuthAccessLogin)
    const [loading1, register] = useLoading(mineService.postUserCreate)

    useEffect(() => {
        dispatch(actions.setLogin(false))
    }, [dispatch])

    const onLogin = () => {
        if (telephone&&password) {
            const passwords = md5(password)
            const query = {
                username: telephone,
                password: passwords
            }
            logins(query)
            .then((res) => {
                dispatch(actions.setLogin(true))
                console.log(res.data)
                if (res.data) dispatch(actions.setUser(res.data))
                message.success('登录成功！')
                history.push('/')
            }).catch((res) => {
                message.warning(res.errorMsg)
            })
        } else {
            message.warning('请先完善账号密码！')
        }
        
    }

    const onRegister = () => {
        if(!telephone||!password){
            return message.warning('请先完善账号密码！')
        } else if (!code) {
            return message.warning('请输入验证码')
        } else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(telephone)))
            return message.warning('电话号码填写有误，请重新填写')
        register({userType, password: md5(password), userName, account: telephone, verificationCode: code}).then(() => {
            message.success('注册成功，快去登录吧！')
            setUsername(account)
            setPassword(password)
        }).catch((res) => {
            message.warning(res.errorMsg)
        })
    }

    const handelChangeTabs = (key) => {
        if (key==='login') {

        }
    }

    const logincontent = (
        <div className="flex-column-around">
            <div className="h5_login_form">
                <div className="mb-40">
                    <Input
                        icon={'phone'}
                        value={telephone}
                        onChange={setTelephone}
                        placeholder={'电话号码'}
                        
                    />
                </div>
                <div>
                    <Input
                        icon={'lock'}
                        value={password}
                        placeholder={'请输入密码'}
                        onChange={setPassword}
                        type={"password"}
                        isH5={true}
                    />
                </div>
            </div>
            <div>
                <Button
                    className="mt-40 h5_login_button"
                    type={'primary'}
                    onClick={onLogin}
                    loading={loading}
                >
                登录
                </Button>
            </div>
        </div>
    )

    const registercontent = (
        <div className="flex-column-around">
            <div className="h5_login_form">
                <div>
                    <Radio.Group value={userType} onChange={(e) => setUserType(e.target.value)}>
                        <Radio value='PERSONAL_CREATOR'>我是个人创作者</Radio>
                        <Radio value='ENTERPRISE_CREATOR'>我是企业创作者</Radio>
                    </Radio.Group>
                </div>
                {
                    userType==='ENTERPRISE_CREATOR'&&
                    <div className="mt-30 mb-40">
                        <Input
                            icon={'compony'}
                            value={userName}
                            onChange={setUserName}
                            placeholder={'企业名称'}
                        />
                    </div>
                }
                <div className="mt-30 mb-40">
                    <Input
                        icon={'phone'}
                        value={telephone}
                        onChange={setTelephone}
                        placeholder={'手机号'}
                    />
                </div>
                <div className="mb-40">
                    <Input
                        icon={'lock'}
                        value={password}
                        placeholder={'密码'}
                        onChange={setPassword}
                        type={"password"}
                        isH5={true}
                    />
                </div>
                <div>
                    <Input
                        icon={'code'}
                        value={code}
                        onChange={setCode}
                        placeholder={'验证码'}
                        telephone={telephone}
                        addonafter={'12'}
                        isRegister={true}
                    />
                </div>
                <Button
                    className="mt-40 h5_login_button"
                    type={'primary'}
                    onClick={onRegister}
                    loading={loading}
                >
                注册
                </Button>
            </div>
        </div>
    )

    return (
        <>
            <Header title='登录注册'/>
            <div className="flex-colunm-center h5_login_box">
                <div className="flex-column-center h5_login_wraper">
                    <div className="h5_login_conent flex-column-center-center">
                        <img src={require('src/images/h5_login_top_logo.png')} alt=""/>
                        <div className="h5_login_top_title">
                            至泰链原创认证平台
                        </div>
                        <div className="h5_login_top_desc">
                            区块链存证 • 公平 • 专业 • 不可篡改
                        </div>
                        {/* <div className="flex-column-center">
                            <img src={require('src/images/register_left_bg.png')} alt=""/>
                        </div> */}
                    </div>
                    <div className="login-right">
                        <Tabs defaultActiveKey="login" centered onChange={handelChangeTabs}>
                            <TabPane tab="登录" key="login">
                            {
                                logincontent
                            }
                            </TabPane>
                            <TabPane tab="注册" key="register">
                            {
                                registercontent
                            }
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    )
}
