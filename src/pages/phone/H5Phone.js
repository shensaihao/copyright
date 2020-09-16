import React,{useState} from 'react'
import Header from 'src/pages/H5/Header'
import {Modal, Button, message} from 'antd'
import { useLoading, mineService} from 'src/service';
import Input from 'src/pages/component/Input';
import { useHistory } from 'react-router-dom'

export default function H5Phone() {
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
            <Header title={'手机账号'}/>
            <div className="flex-column-center h5_user_phone_box">
                <div className="h5_user_phone">已绑定手机</div>
                <div className="h5_user_phone_number">187******41</div>
                <div className="h5_user_phone">手机号和登录账号一致，更换绑定手机登录账号将会变更，请谨慎操作！</div>
                <div className="h5_user_phone_button flex-center" onClick={() => setModal(true)}>更换手机号</div>
            </div>
            <Modal
                visible={modal}
                className="h5_phone_mmodal"
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
                    <Button className="phone_modal_button" type="primary" onClick={handelClickChange}>确定</Button>
                </div>
            </Modal>
        </>
    )
}
