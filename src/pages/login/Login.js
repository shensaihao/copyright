import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import * as actions from 'src/store/actions';
import { mineService, useLoading } from 'src/service';
import { Input, Button } from 'src/pages/component';
import { message, Tabs, Radio } from 'antd';
import md5 from 'js-md5';

const { TabPane } = Tabs;

const Login = () => {

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
    

    const onLogin = () => {
        if (username&&password) {
            const passwords = md5(password)
            const query = {
                username,
                password: passwords
            }
            logins(query)
            .then((res) => {
                dispatch(actions.setLogin(true))
                if (res.data) dispatch(actions.setUser(res.data))
                message.success('登录成功！')
                setTimeout(() => {
                    history.push('/')
                }, 1000);
            }).catch(() => {
                message.error('账号或密码错误，请检查！')
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
        const userDO = {userType, password, userName, telephone}
        const verificationCode = code
        register({userDO, verificationCode}).then(() => {
            message.success('注册成功！')
            setTimeout(() => {
                setIsLogin(true)
                setUsername(account)
                setPassword(password)
            }, 1000);
        }).catch(() => {
            message.error('注册失败，请重试！')
        })
    }

    const handelChangeTabs = (key) => {
        if (key==='login') {
            
        }
    }

    const logincontent = (
        <div className="flex-column-around">
            <div className="login-form">
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
                    />
                </div>
            </div>
            <div>
                <Button
                    className="mt-40 login-button"
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
        <div className="flex-column">
            <div className="login-form">
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
                    />
                </div>
                <div>
                    <Input
                        icon={'code'}
                        value={code}
                        onChange={setCode}
                        placeholder={'验证码'}
                        telephone={telephone}
                        addonafter={true}
                    />
                </div>
                <Button
                    className="mt-40 login-button"
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
        <div className="flex-center pt-70 pb-100">
            <div className="flex-between login-conent ">
                <div className="login-logo flex-column-center-center">
                    <img className="mb-50" src={require('src/images/register_logo_small.png')} alt=""/>
                    <img className="mb-20" src={require('src/images/register_logo_name.png')} alt=""/>
                    <div className="login-left-desc">
                        区块链存证 • 公平 • 专业 • 不可篡改
                    </div>
                    {/* <div className="flex-column-center">
                        <img src={require('src/images/register_left_bg.png')} alt=""/>
                    </div> */}
                </div>
                <div className="pr-80 pt-50 login-right">
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
                {/* {
                    isLogin&&
                    logincontent
                }
                {
                    !isLogin&&
                    registercontent
                } */}
            </div>
        </div>
    )
}
export default Login