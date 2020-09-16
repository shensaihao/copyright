import React,{useState, useEffect} from 'react'
import {  useSelector, useDispatch } from 'react-redux';
import { Menu, message} from 'antd'
import { Layout } from 'antd';
import { Form, Button, Input,Radio } from 'antd';
import { Upload, Modal} from 'antd';
import { dentificationService, useLoading, mineService } from 'src/service';
import { Link,useHistory } from 'react-router-dom'
import * as actions from 'src/store/actions';

const { Content, Sider } = Layout;

export default function Certification() {
    const [license, setLicense] = useState([])
    const [idCardFont, setIdCardFont] = useState([])
    const [inCardBack, setInCardBack] = useState([])
    const [personIdentityCardsBack, setPersonIdentityCardsBack] = useState([])
    const [personIdentityCardsFace, setPersonIdentityCardsFace] = useState([])
    const [enterpriseProperty, setEnterpriseProperty] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [loading, identificationCreate] = useLoading(dentificationService.postIdentificationCreate)
    const [loading2, getIdentificationInfo] = useLoading(dentificationService.getIdentificationInfo)
    const [loading1, getUserInfo] = useLoading(mineService.getUserInfo)
    const [peoFinish, setPeoFinish] = useState(null)
    const [comFinish, setComFinish] = useState(null)
    const [initialValues, setInitialValues] = useState({})
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState(false)
    const [isCertification, setIsCertification] = useState(false)
    const user = useSelector(state => state.user)
    const [userType, setUserType] = useState('PERSONAL_CREATOR')
    const dispatch = useDispatch();
    const history = useHistory()
    const [identificatinInfo, setIdentificatinInfo] = useState({})
    // const [form, setForm] = useState({})


    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    useEffect(() => {
        if (user.userType) {
            setUserType(user.userType)
        }
        if (user.authenticationType) {
            setIsCertification(true)
            getIdentificationInfo().then((res) => {
                setIdentificatinInfo(res.data)
            }).catch((res) => {
                if (res.responseCode==='_501') {
                    dispatch(actions.setLogin(false))
                    message.warning('登录已过期')
                    history.push('/login')
                } else {
                    message.warning(res.errorMsg)
                }
            })
        }
    }, [dispatch, getIdentificationInfo, history, user])

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
    };

    const uploadButton = (
        <div className="flex-column-center-center upload-immage">
            <img src={require('src/images/upload_icon.png')} alt=""/>
            <div className="mt-10 ft-size-18 color-lable">点击上传营业执照</div>
        </div>
    );

    const uploadCardButton = (
        <div className="flex-column-center-center upload-card-button">
            <img src={require('src/images/upload_icon.png')} alt=""/>
            <div className="mt-10 ft-size-18 color-lable">点击上传身份证件</div>
        </div>
    )

    const onComponyFinish = (value) => {
        if(!(/^(\d{18,18}|\d{15,15}|\d{17,17}X)$/.test(value.legalIdentityCards))) {
            message.error('身份证号码输入有误，请检查')
        } else {
            setComFinish(value)
        }
    };

    useEffect(() => {
        if (comFinish) {
            comFinish.enterpriseLicense = license[0].url
            comFinish.legalIdentityCardsFace=idCardFont[0].url
            comFinish.legalIdentityCardsBack=inCardBack[0].url
            identificationCreate(comFinish).then((res) => {
                message.success('认证成功')
                setIsSuccess(true)
                dispatch(actions.setUser({authenticationType: true}))
            }).catch((res) => {
                if (res.responseCode==='_501') {
                    dispatch(actions.setLogin(false))
                    message.warning('登录已过期')
                    history.push('/login')
                } else {
                    message.warning(res.errorMsg)
                }
            })
        }
    }, [history, identificationCreate, comFinish, idCardFont, inCardBack, dispatch, enterpriseProperty, license])

    const onPersonalFinish = (value) => {
        if(!(/^(\d{18,18}|\d{15,15}|\d{17,17}X)$/.test(value.personIdentityCards))) {
            message.error('身份证号码输入有误，请检查')
        } else {
            setPeoFinish(value)
        }
    }

    useEffect(() => {
        if (peoFinish) {
            peoFinish.personIdentityCardsBack=personIdentityCardsBack[0].url
            peoFinish.personIdentityCardsFace=personIdentityCardsFace[0].url
            identificationCreate(peoFinish).then((res) => {
                message.success('认证成功')
                setIsSuccess(true)
                dispatch(actions.setUser({authenticationType: true}))
            }).catch((res) => {
                if (res.responseCode==='_501') {
                    dispatch(actions.setLogin(false))
                    message.warning('登录已过期')
                    history.push('/login')
                } else {
                    message.warning(res.errorMsg)
                }
            })
        }
    }, [dispatch, history, identificationCreate, peoFinish, personIdentityCardsBack, personIdentityCardsFace])

    const handelChangeIdCardFont = (res) => {
        const {fileName, originalFilename, relativePath} = res.data
        setIdCardFont([{
            uid: fileName,
            name: originalFilename,
            status: 'done',
            url: relativePath,
        }])
    }

    const handelChangeIdCardBack = (res) => {
        const {fileName, originalFilename, relativePath} = res.data
        setInCardBack([{
            uid: fileName,
            name: originalFilename,
            status: 'done',
            url: relativePath,
        }])
    }

    const handelChangeLicense = (res) => {
        const {fileName, originalFilename, relativePath} = res.data
        setLicense([{
            uid: fileName,
            name: originalFilename,
            status: 'done',
            url: relativePath,
        }])
    }

    const handelChangePersonIdCardFont = (res) => {
        const {fileName, originalFilename, relativePath} = res.data
        setPersonIdentityCardsFace([{
            uid: fileName,
            name: originalFilename,
            status: 'done',
            url: relativePath,
        }])
    }

    const handelChangePersonIdCardBack = (res) => {
        const {fileName, originalFilename, relativePath} = res.data
        setPersonIdentityCardsBack([{
            uid: fileName,
            name: originalFilename,
            status: 'done',
            url: relativePath,
        }])
    }

    const key2 = (
        <Form
            name="basic"
            onFinish={onPersonalFinish}
            size="middle"
            initialValues={initialValues}
        >

            <Form.Item>
                <span className="label-gray">姓名</span>
                <Form.Item
                    style={{width: '836px', marginTop: '10px'}}
                    name="personName"
                    rules={[{ required: true, message: '请输入姓名' }]}
                >
                    <Input />
                </Form.Item>
            </Form.Item>

            <Form.Item>
                <span className="label-gray">身份证号码</span>
                <Form.Item
                    style={{width: '836px', marginTop: '10px'}}
                    name="personIdentityCards"
                    rules={[{ required: true, message: '请输入身份证号码' }]}
                >
                    <Input />
                </Form.Item>
            </Form.Item>

            <Form.Item style={{marginBottom: '50px'}}>
                <span className="label-gray">身份证</span>
                <div className="flex-between-center" style={{width: '836px'}}>
                    <Form.Item
                        name="personIdentityCardsFace"
                        className="legal-identity-cards"
                        style={{ marginTop: '30px'}}
                        rules={[{ required: true, message: '请上传身份证' }]}
                        
                    >
                        <Upload
                            action='/v1/files/fileUpload'
                            fileList={personIdentityCardsFace}
                            listType="picture-card"
                            onPreview={handlePreview}
                            onSuccess={handelChangePersonIdCardFont}
                            showUploadList={{showRemoveIcon:false}}
                        >
                            {personIdentityCardsFace.length >= 1 ? null : uploadCardButton}
                        </Upload>
                    </Form.Item>
                    <div className="legal-identity-cards-temp flex-column-center-center">
                        <img src={require('src/images/id_card_font.png')} alt=""/>
                        <div className="color-lable ft-size-18">身份证正面</div>
                    </div>
                </div>
            </Form.Item>
            
            <Form.Item>
                <div className="flex-between-center" style={{width: '836px'}}>
                    <Form.Item
                        name="personIdentityCardsBack"
                        className="legal-identity-cards"
                        style={{ marginTop: '10px'}}
                        rules={[{ required: true, message: '请上传身份证' }]}
                        
                    >
                        <Upload
                            action='/v1/files/fileUpload'
                            fileList={personIdentityCardsBack}
                            listType="picture-card"
                            onPreview={handlePreview}
                            onSuccess={handelChangePersonIdCardBack}
                            showUploadList={{showRemoveIcon:false}}
                        >
                            {personIdentityCardsBack.length >= 1 ? null : uploadCardButton}
                        </Upload>
                    </Form.Item>
                    <div className="legal-identity-cards-temp flex-column-center-center">
                        <img src={require('src/images/id_card_back.png')} alt=""/>
                        <div className="color-lable ft-size-18">身份证反面</div>
                    </div>
                </div>
            </Form.Item>
    
            <Form.Item style={{width: '836px'}}>
                <Button style={{float: 'right'}} size="large" htmlType="submit" className="certification-commit-button mt-10">
                    认证
                </Button>
            </Form.Item>
            <Modal
                visible={previewVisible}
                footer={null}
                onCancel={handleCancel}
                >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </Form>
    )

    const key1 = (
        <Form
            name="basic"
            onFinish={onComponyFinish}
            size="middle"
            initialValues={initialValues}
        >
            
            <Form.Item>
                <span className="label-gray mb-10">企业属性</span>
                <Form.Item
                    name="enterpriseProperty"
                    rules={[{ required: true, message: '请选择企业属性' }]}
                >
                    <Radio.Group value={enterpriseProperty}>
                        <Radio value='PROFIT_ENTERPRISE'>盈利企业</Radio>
                        <Radio value='COMMONWEAL_ENTERPRISE'>公益企业</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form.Item>

            <Form.Item>
                <span className="label-gray">企业全称</span>
                <Form.Item
                    style={{width: '836px', marginTop: '10px'}}
                    name="enterpriseName"
                    rules={[{ required: true, message: '请输入企业全称' }]}
                >
                    <Input />
                </Form.Item>
            </Form.Item>
            
            <Form.Item>
                <span className="label-gray">企业营业执照</span>
                <Form.Item
                    name="enterpriseLicense"
                    className="enterprise-license"
                    style={{ marginTop: '10px'}}
                    rules={[{ required: true, message: '请上传企业营业执照' }]}
                    
                >
                    <Upload
                        action='/v1/files/fileUpload'
                        fileList={license}
                        listType="picture-card"
                        onPreview={handlePreview}
                        onSuccess={handelChangeLicense}
                        showUploadList={{showRemoveIcon:false}}
                    >
                        {license.length >= 1 ? null : uploadButton}
                    </Upload>
                </Form.Item>
            </Form.Item>

            <Form.Item>
                <span className="label-gray">企业机构代码</span>
                <Form.Item
                    style={{width: '836px', marginTop: '10px'}}
                    name="institutionCode"
                    rules={[{ required: true, message: '请输入企业机构代码' }]}
                >
                    <Input />
                </Form.Item>
            </Form.Item>

            <Form.Item>
                <span className="label-gray">企业法人代表</span>
                <Form.Item
                    style={{width: '836px', marginTop: '10px'}}
                    name="legalRepresentative"
                    rules={[{ required: true, message: '请输入企业法人代表' }]}
                >
                    <Input />
                </Form.Item>
            </Form.Item>

            <Form.Item>
                <span className="label-gray">企业法人身份证号码</span>
                <Form.Item
                    style={{width: '836px', marginTop: '10px'}}
                    name="legalIdentityCards"
                    rules={[{ required: true, message: '请输入身份证号码' }]}
                >
                    <Input />
                </Form.Item>
            </Form.Item>

            <Form.Item style={{marginBottom: '35px'}}>
                <span className="label-gray">企业法人身份证</span>
                <div className="flex-between-center" style={{width: '836px'}}>
                    <Form.Item
                        name="legalIdentityCardsFace"
                        className="legal-identity-cards"
                        style={{ marginTop: '10px'}}
                        rules={[{ required: true, message: '请上传企业法人身份证' }]}
                        
                    >
                        <Upload
                            action='/v1/files/fileUpload'
                            fileList={idCardFont}
                            listType="picture-card"
                            onPreview={handlePreview}
                            onSuccess={handelChangeIdCardFont}
                            showUploadList={{showRemoveIcon:false}}
                        >
                            {idCardFont.length >= 1 ? null : uploadCardButton}
                        </Upload>
                    </Form.Item>
                    <div className="legal-identity-cards-temp flex-column-center-center">
                        <img src={require('src/images/id_card_font.png')} alt=""/>
                        <div className="color-lable ft-size-18">身份证正面</div>
                    </div>
                </div>
            </Form.Item>
            
            <Form.Item>
                <div className="flex-between-center" style={{width: '836px'}}>
                    <Form.Item
                        name="legalIdentityCardsBack"
                        className="legal-identity-cards"
                        style={{ marginTop: '10px'}}
                        rules={[{ required: true, message: '请上传企业法人身份证' }]}
                        
                    >
                        <Upload
                            action='/v1/files/fileUpload'
                            fileList={inCardBack}
                            listType="picture-card"
                            onPreview={handlePreview}
                            onSuccess={handelChangeIdCardBack}
                            showUploadList={{showRemoveIcon:false}}
                        >
                            {inCardBack.length >= 1 ? null : uploadCardButton}
                        </Upload>
                    </Form.Item>
                    <div className="legal-identity-cards-temp flex-column-center-center">
                        <img src={require('src/images/id_card_back.png')} alt=""/>
                        <div className="color-lable ft-size-18">身份证反面</div>
                    </div>
                </div>
            </Form.Item>
    
            <Form.Item style={{width: '900px'}}>
                <Button style={{float: 'right'}} size="large" htmlType="submit" className="certification-commit-button mt-10">
                    认证
                </Button>
            </Form.Item>
            <Modal
                visible={previewVisible}
                footer={null}
                onCancel={handleCancel}
                >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </Form>
    )

    const certificationSuccess = (
        <div className="certification_succ">
            <div className="certification_succ_top flex-start mb-20">
                <img src={require('src/images/step_one_sucess.png')} className="ml-58" alt=""/>
                <div className="ml-30">
                    <div className="ft-size-24 color-main font-weight">实名认证成功</div>
                    <div className="color-secondry">您已完成实名认证，现在可以对您的原创作品进行认证了哦~</div>
                </div>
            </div>
            <div className="flex-end">
                <div className="certification_button flex-center-center mr-20" onClick={() => history.push('/works?type=COPYRIGHT_TYPE')}>作品认证</div>
                <div className="certification_back_button flex-center-center" onClick={() => history.push('/home')}>返回首页</div>
            </div>
        </div>
    )

    const hasCertification = (
        <div className="has_certification flex-column-center">
            <div className="flex-start mb-20">
                <div className="color-lable ft-size-18 mr-90 has_certification_lable">认证类型</div>
                <div className="color-main ft-size-18">企业认证</div>
            </div>
            <div className="flex-start m-y-20">
                <div className="color-lable ft-size-18 mr-90 has_certification_lable">企业类型</div>
                <div className="color-main ft-size-18">{identificatinInfo.enterpriseProperty}</div>
            </div>
            <div className="flex-start m-y-20">
                <div className="color-lable ft-size-18 mr-90 has_certification_lable">企业名称</div>
                <div className="color-main ft-size-18">{identificatinInfo.enterpriseName}</div>
            </div>
            <div className="flex-start-center m-y-20">
                <div className="color-lable ft-size-18 mr-90 has_certification_lable">营业执照</div>
                <div className="has_certification_img mb-40">
                    <img src={identificatinInfo.enterpriseLicense} alt=""/>
                </div>
            </div>
            <div className="flex-start m-y-20">
                <div className="color-lable ft-size-18 mr-90 has_certification_lable">企业机构代码</div>
                <div className="color-main ft-size-18">{identificatinInfo.institutionCode}</div>
            </div>
            <div className="flex-start m-y-20">
                <div className="color-lable ft-size-18 mr-90 has_certification_lable">企业法人代表</div>
                <div className="color-main ft-size-18">{identificatinInfo.legalRepresentative}</div>
            </div>
            <div className="flex-start m-y-20">
                <div className="color-lable ft-size-18 mr-90 has_certification_lable">企业法人身份证号</div>
                <div className="color-main ft-size-18">{identificatinInfo.legalIdentityCards}</div>
            </div>
            <div className="flex-column m-y-20">
                <div className="color-lable ft-size-18 mb-16">身份证件</div>
                <div className="has_certification_card">
                    <img className="mr-30" src={identificatinInfo.legalIdentityCardsFace} alt=""/>
                    <img src={identificatinInfo.legalIdentityCardsBack} alt=""/>
                </div>
            </div>
        </div>
    )

    const hasCertification1 = (
        <div className="has_certification flex-column-center">
            <div className="flex-start mb-20">
                <div className="color-lable ft-size-18 mr-90 has_certification_lable">认证类型</div>
                <div className="color-main ft-size-18">个人认证</div>
            </div>
            <div className="flex-start m-y-20">
                <div className="color-lable ft-size-18 mr-90 has_certification_lable">姓名</div>
                <div className="color-main ft-size-18">{identificatinInfo.personName}</div>
            </div>
            <div className="flex-start m-y-20">
                <div className="color-lable ft-size-18 mr-90 has_certification_lable">身份证号码</div>
                <div className="color-main ft-size-18">{identificatinInfo.personIdentityCards}</div>
            </div>
            <div className="flex-column m-y-20">
                <div className="color-lable ft-size-18 mb-16">身份证件</div>
                <div className="has_certification_card">
                    <img className="mr-30" src={identificatinInfo.personIdentityCardsBack} alt=""/>
                    <img src={identificatinInfo.personIdentityCardsFace} alt=""/>
                </div>
            </div>
        </div>
    )

    return (
        <>
        <div className="humberger_box flex-start">
            <div className="humberger_box_name curser-pointer" onClick={() => history.push('/home')}>首页</div>
            <div className="humberger_box_line"> / </div>
            <div className="humberger_box_active curser-pointer">实名认证</div>
        </div>
        <div className="certification_box">
            <div className="flex-start-center certification_wraper">
                <Sider width={200} className="site-layout-background">
                    <Menu
                    mode="inline"
                    style={{ height: '100%', borderRight: 0 }}
                    defaultSelectedKeys={['4']}
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
                <Layout style={{ background: '#fff',minHeight: '748px' }}>
                    <Content
                    className="site-content-background certification_form"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                    >
                    {/* 个人已认证 */}
                    {
                        (userType==='PERSONAL_CREATOR'&&isCertification&&!isSuccess)&&
                        hasCertification1
                    }
                    {/* 企业已认证 */}
                    {
                        (userType==='ENTERPRISE_CREATOR'&&isCertification&&!isSuccess)&&
                        hasCertification
                    }
                    {/* 个人未认证 */}
                    {
                        (userType==='PERSONAL_CREATOR'&&!isCertification&&!isSuccess)&&
                        key2
                    }
                    {/* 企业未认证 */}
                    {
                        (userType==='ENTERPRISE_CREATOR'&&!isCertification&&!isSuccess)&&
                        key1
                    }
                    {
                        isSuccess&&certificationSuccess
                    }
                    </Content>
                </Layout>
            </div>
        </div>
        </>
    )
}
