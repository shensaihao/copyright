import React,{useState, useEffect} from 'react'
import { Menu} from 'antd'
import { Layout } from 'antd';
import { Form, Button, Input,Radio } from 'antd';
import { Upload, Modal} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { dentificationService, useLoading } from 'src/service';
import { Link } from 'react-router-dom'

const { Content, Sider } = Layout;

export default function Certification() {
    const [license, setLicense] = useState([])
    const [idCardFont, setIdCardFont] = useState([])
    const [inCardBack, setInCardBack] = useState([])
    const [status, setStatus] = useState(false)
    const [certification, setCertification] = useState('')
    const [enterpriseName, setEnterpriseName] = useState('')
    const [institutionCode, setInstitutionCode] = useState('')
    const [legalRepresentative, setLegalRepresentative] = useState('')
    const [enterpriseProperty, setEnterpriseProperty] = useState('')
    const [loading, identificationCreate] = useLoading(dentificationService.postIdentificationCreate)
    const [finish, setFinish] = useState(null)
    const [initialValues, setInitialValues] = useState({})
    const [key, setKey] = useState('1')
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState(false)
    const [isCertification, setIsCertification] = useState(false)
    // const [form, setForm] = useState({})

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

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

    const onFinish = (value) => {
        setFinish(value)
        localStorage.setItem('form', JSON.stringify(value))
        localStorage.setItem('register', true)
    };

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

    const handelRemoveLicense = (res) => {
        console.log(res)
    }

    useEffect(() => {
        if (localStorage.getItem('register')) {
            setStatus(true)
            if (localStorage.getItem('form')) {
                const form = JSON.parse(localStorage.getItem('form'))
                console.log(form)
                setLicense(form.enterpriseLicense.fileList)
                setIdCardFont(form.legalIdentityCards.fileList)
                setCertification(form.certification)
                setEnterpriseName(form.enterpriseName)
                setInstitutionCode(form.institutionCode)
                setLegalRepresentative(form.legalRepresentative)
                setEnterpriseProperty(form.enterpriseProperty)
            }
        }
        console.log(status)
    }, [status])

    useEffect(()=>{
        if (finish&&!status) {
            finish.legalIdentityCards = idCardFont[0].url
            finish.enterpriseLicense = license[0].url
            identificationCreate(finish)
                .then((res) => {
                    setStatus(true)
                    localStorage.setItem('status', true)
                    const values = JSON.stringify(finish)
                    localStorage.setItem('info', values)
                })
        }
    },[finish, idCardFont, identificationCreate, license, status])

    const key1 = (
        <Form
            name="basic"
            onFinish={onFinish}
            size="middle"
            initialValues={initialValues}
        >
            <Form.Item>
                <span className="label-gray mb-10">实名认证</span>
                <Form.Item
                    name="certification"
                    rules={[{ required: true, message: '请选择实名认证类型' }]}
                >
                    <Radio.Group value={certification}>
                        <Radio value='PERSONAL_CERTIFICATION'>个人认证</Radio>
                        <Radio value='ENTERPRISE_CERTIFICATION'>企业认证</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form.Item>
            
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
                    <Input placeholder={enterpriseName}/>
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
                        onRemove={handelRemoveLicense}
                        onSuccess={handelChangeLicense}
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
                    <Input placeholder={institutionCode}/>
                </Form.Item>
            </Form.Item>

            <Form.Item>
                <span className="label-gray">企业法人代表</span>
                <Form.Item
                    style={{width: '836px', marginTop: '10px'}}
                    name="legalRepresentative"
                    rules={[{ required: true, message: '请输入企业法人代表' }]}
                >
                    <Input placeholder={legalRepresentative}/>
                </Form.Item>
            </Form.Item>

            <Form.Item style={{marginBottom: '35px'}}>
                <span className="label-gray">企业法人身份证</span>
                <div className="flex-between-center" style={{width: '836px'}}>
                    <Form.Item
                        name="legalIdentityCards1"
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
                        name="legalIdentityCards2"
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
                {
                    !status &&
                    <Button style={{float: 'right'}} size="large" htmlType="submit" className="certification-commit-button mt-10">
                        认证
                    </Button>
                }
                
                {
                    status &&
                    <Button disabled size="large">
                        审核中
                    </Button>
                }
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
                <div className="certification_button flex-center-center mr-20">作品认证</div>
                <div className="certification_back_button flex-center-center">返回首页</div>
            </div>
        </div>
    )

    const hasCertification = (
        <div className="has_certification flex-column-center">
            <div className="flex-start m-y-20">
                <div className="color-lable ft-size-18 mr-90">认证类型</div>
                <div className="color-main ft-size-18">企业</div>
            </div>
            <div className="flex-start m-y-20">
                <div className="color-lable ft-size-18 mr-90">企业类型</div>
                <div className="color-main ft-size-18">公益</div>
            </div>
            <div className="flex-start m-y-20">
                <div className="color-lable ft-size-18 mr-90">企业名称</div>
                <div className="color-main ft-size-18">成都链博</div>
            </div>
            <div className="flex-start-center m-y-20">
                <div className="color-lable ft-size-18 mr-90">上传执照</div>
                <div className="has_certification_img mb-40">
                    <img src={require('src/images/step_six_emplete.png')} alt=""/>
                </div>
            </div>
            <div className="flex-start m-y-20">
                <div className="color-lable ft-size-18 mr-90">企业机构代码</div>
                <div className="color-main ft-size-18">123456789</div>
            </div>
            <div className="flex-start m-y-20">
                <div className="color-lable ft-size-18 mr-90">企业法人代表</div>
                <div className="color-main ft-size-18">XXXXXX</div>
            </div>
            <div className="flex-column m-y-20">
                <div className="color-lable ft-size-18 mb-16">上传证件</div>
                <div className="has_certification_card">
                    <img className="mr-30" src={require('src/images/id_card_font.png')} alt=""/>
                    <img src={require('src/images/id_card_back.png')} alt=""/>
                </div>
            </div>
        </div>
    )

    return (
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
                    className="site-content-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                    >
                    {
                        !isCertification ? certificationSuccess : hasCertification
                    }
                    </Content>
                </Layout>
            </div>
        </div>
    )
}
