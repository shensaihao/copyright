import React,{useState, useEffect} from 'react'
import { Form, Button, Select, Input, DatePicker } from 'antd';
import { Upload, Modal, Radio, Checkbox } from 'antd';
import { useLocation } from 'react-router-dom'
import { UploadOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/zh_CN';

const { Option } = Select;
const { TextArea } = Input;

export default function StepOne(props) {
    const [programList, setProgramList] = useState([])
    const [compositionList, setCompositionList] = useState([])
    const [fontList, setFontList] = useState([])
    const [worksList, setWorksList] = useState([])
    const [jishuList, setJishuList] = useState([])
    const [zuopingList, setZuopingList] = useState([])
    const [useList, setUseList] = useState([])
    const [shangbiaoList, setShangbiaoList] = useState([])
    const [invoiceList, setInvoiceList] = useState([])
    const [chuantongList, setChuantongList] = useState([])
    const [finish, setFinish] = useState(null)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const type = location.search.split('=')
        if (type) {
            setType(type[1])
        }
    }, [location])

    const [type, setType] = useState('技术成果存证')


    const onFinish = values => {
        console.log(values)
        setFinish(values)
      };

    const handelProgramListChange = (res) => {
        const {fileName, originalFilename, relativePath} = res.data
        setProgramList([{
            uid: fileName,
            name: originalFilename,
            status: 'done',
            url: relativePath,
        }])
    }

    const handelCompositionListChange = (res) => {
        const {fileName, originalFilename, relativePath} = res.data
        setCompositionList([{
            uid: fileName,
            name: originalFilename,
            status: 'done',
            url: relativePath,
        }])
    }

    const handelFontListChange = (res) => {
        const {fileName, originalFilename, relativePath} = res.data
        setFontList([{
            uid: fileName,
            name: originalFilename,
            status: 'done',
            url: relativePath,
        }])
    }

    const handelWorksListChange = (res) => {
        const {fileName, originalFilename, relativePath} = res.data
        setWorksList([{
            uid: fileName,
            name: originalFilename,
            status: 'done',
            url: relativePath,
        }])
    }

    useEffect(()=>{
        if (type==='trademark'&&useList[0]&&finish) {
            finish.serviceCondition = useList[0].url
            finish.productionFile = shangbiaoList[0].url
            finish.type = type
            props.handelStepOneSubmit(finish)
        }
        if (type==='copyright'&&zuopingList[0]&&finish) {
            finish.saveFile = zuopingList[0].url
            finish.type = type
            props.handelStepOneSubmit(finish)
        }
        if (type === 'tradition'&&chuantongList[0]&&finish) {
            console.log('enter')
            finish.saveFile = chuantongList[0].url
            finish.type = type
            props.handelStepOneSubmit(finish)
        }
        if (type === 'technology'&&jishuList[0]&&finish) {
            finish.saveFile = jishuList[0].url
            finish.productionFile = worksList[0].url
            finish.type = type
            props.handelStepOneSubmit(finish)
        }
        if (type === 'origin'&&invoiceList[0]&&finish) {
            finish.exportInvoice = invoiceList[0].url
            finish.productionProcedure = programList[0].url
            finish.productionElement = compositionList[0].url
            finish.type = type
            finish.saveFile = fontList[0].url
            props.handelStepOneSubmit(finish)
        }
    },[worksList, jishuList, zuopingList, useList, shangbiaoList, compositionList, invoiceList, fontList, programList, chuantongList, props, finish, type])

    const handelChuantogListChange = (res) => {
        const {fileName, originalFilename, relativePath} = res.data
        setChuantongList([{
            uid: fileName,
            name: originalFilename,
            status: 'done',
            url: relativePath,
        }])
    }

    const handelJishuListChange  = (res) => {
        const {fileName, originalFilename, relativePath} = res.data
        setJishuList([{
            uid: fileName,
            name: originalFilename,
            status: 'done',
            url: relativePath,
        }])
    }

    const handelZuopingListChange = (res) => {
        const {fileName, originalFilename, relativePath} = res.data
        setZuopingList([{
            uid: fileName,
            name: originalFilename,
            status: 'done',
            url: relativePath,
        }])
    }

    const handelUseListChange = (res) => {
        const {fileName, originalFilename, relativePath} = res.data
        setUseList([{
            uid: fileName,
            name: originalFilename,
            status: 'done',
            url: relativePath,
        }])
    }

    const handelShangbiaoListChange = (res) => {
        const {fileName, originalFilename, relativePath} = res.data
        setShangbiaoList([{
            uid: fileName,
            name: originalFilename,
            status: 'done',
            url: relativePath,
        }])
    }

    const handelInvoiceListChange = (res) => {
        const {fileName, originalFilename, relativePath} = res.data
        setInvoiceList([{
            uid: fileName,
            name: originalFilename,
            status: 'done',
            url: relativePath,
        }])
    }

    const uploadButton = (
        <div className="flex-column-center-center upload-immage">
            <img src={require('src/images/upload_icon.png')} alt=""/>
            <div className="mt-10 ft-size-18 color-lable">点击上传文件</div>
        </div>
    )

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

    const jishu_origin = [
        {key: 'HIGH_TECHNOLOGY_PROGRAM',label: '863计划'},
        {key: 'NATIONAL_KEY_PROGRAM',label: '国家科技攻关计划'},
        {key: 'BASIC_RESEARCH_PROGRAM',label: '基础研究计划'},
        {key: 'RESEARCH_DEVELOP_CONSTRUCT',label: '研究开发能力建设'},
        {key: 'TECH_ENVIRONMENT_PROGRAM',label: '科技产业化环境建设计划'},
        {key: 'DEPART_PROGRAM',label: '部门计划'},
        {key: 'PLACE_PROGRAM',label: '地方计划'},
        {key: 'DEPART_FUND',label: '部门基金'},
        {key: 'FOLK_FUND',label: '民间基金'},
        {key: 'INTERNATIONAL_COOPERATION',label: '国际合作'},
        {key: 'LATERAL_ENTRUST',label: '横向委托'},
        {key: 'OPTIONAL',label: '自选'},
        {key: 'OTHER',label: '其他'}]

    const jishu = (
        <Form.Item>
            <div className="flex-column-center pl-30 pt-20">
            <span className="label-gray mb-16">成果名称</span>
            <Form.Item
                style={{width: '700px'}}
                name="productionName"
                rules={[{ required: true, message: '请输入成果名称' }]}
            >
                <Input placeholder="成果名称"/>
            </Form.Item>
            <span className="label-gray mb-16">第一完成单位</span>
            <Form.Item
                style={{width: '700px'}}
                name="completeDepart"
                rules={[{ required: true, message: '请输入第一完成单位' }]}
            >
                <Input placeholder="第一完成单位"/>
            </Form.Item>
            <span className="label-gray mb-16">单位地址</span>
            <Form.Item
                style={{width: '700px'}}
                name="departAddress"
                rules={[{ required: true, message: '请输入单位地址' }]}
            >
                <Input placeholder="单位地址"/>
            </Form.Item>
            <span className="label-gray mb-16">身份证号码（纳税识别号）</span>
            <Form.Item
                style={{width: '700px'}}
                name="identityNumber"
                rules={[{ required: true, message: '请输入身份证号码（纳税识别号）' }]}
            >
                <Input placeholder="身份证号码（纳税识别号）"/>
            </Form.Item>
            <span className="label-gray mb-16">技术类型</span>
            <Form.Item
                name="techType"
            >
                <Select
                    allowClear
                    placeholder="请选择类型"
                    >
                    <Option value="BASIC_TYPE">基础</Option>
                    <Option value="THEORY_TYPE">理论</Option>
                    <Option value="SOFT_SCIENCE_TYPE">软科学</Option>
                    <Option value="OTHER">其他</Option>
                </Select>
            </Form.Item>
            <span className="label-gray mb-16">成果水平</span>
            <Form.Item
                name="productionLevel"
            >
                <Select
                    allowClear
                    placeholder="请选择成果水平"
                    >
                    <Option value="INTERNATIONAL_LEADING">国际领先</Option>
                    <Option value="INTERNATIONAL_ADVANCED">国际先进</Option>
                    <Option value="DOMESTIC_LEADING">国内领先</Option>
                    <Option value="DOMESTIC_ADVANCED">国内先进</Option>
                    <Option value="OTHER">其他</Option>
                </Select>
            </Form.Item>
            <span className="label-gray mb-16">技术课题来源</span>
            <Form.Item
                style={{width: '700px'}}
                name="techProjectSource"
                rules={[{ required: true, message: '请选择技术成果来源' }]}
            >
                <Select
                    allowClear
                    placeholder="请选择来源"
                    >
                    {
                        jishu_origin.map((item) => <Option value={item.key} key={item.key}>{item.label}</Option>)
                    }
                </Select>
            </Form.Item>
            <span className="label-gray mb-16">课题立项编号</span>
            <Form.Item
                style={{width: '700px'}}
                name="projectNumber"
                rules={[{ required: true, message: '请输入课题立项编号' }]}
            >
                <Input placeholder="课题立项编号"/>
            </Form.Item>
            <span className="label-gray mb-16">评价方式</span>
            <Form.Item
                name="evaluationWay"
            >
                <Select
                    allowClear
                    placeholder="请选择评价方式"
                    >
                    <Option value="AUTHENTICATE_WAY">鉴定</Option>
                    <Option value="ACCEPT_WAY">验收</Option>
                    <Option value="REVIEW_WAY">评审</Option>
                    <Option value="CONCLUSION_WAY">结题</Option>
                    <Option value="OTHER">其他</Option>
                </Select>
            </Form.Item>
            <span className="label-gray mb-16">结题日期</span>
            <Form.Item
                style={{width: '700px'}}
                name="finishDate"
                rules={[{ required: true, message: '请输入结题日期' }]}
            >
                <DatePicker style={{width: '700px',height: '42px',borderRadius: '6px'}} locale={locale}/>
            </Form.Item>
            <span className="label-gray mb-16">所处阶段</span>
            <Form.Item
                name="productionStage"
            >
                <Select
                    allowClear
                    placeholder="请选择所处阶段"
                    >
                    <Option value="PRELIMINARY_STAGE">初期</Option>
                    <Option value="INTERIM_STAGE">中期</Option>
                    <Option value="MATURE_STAGE">成熟应用</Option>
                    <Option value="OTHER">其他</Option>
                </Select>
            </Form.Item>
            <span className="label-gray mb-16">应用状态</span>
            <Form.Item
                name="productionUseType"
            >
                <Select
                    allowClear
                    placeholder="请选择应用状态"
                    >
                    <Option value="STABLE_USE">稳定应用</Option>
                    <Option value="AFTER_STOP_USE">应用后停用</Option>
                    <Option value="UN_USE">未应用</Option>
                    <Option value="OTHER">其他</Option>
                </Select>
            </Form.Item>
            <span className="label-gray mb-16">成果主要完成人员</span>
            <Form.Item
                style={{width: '700px'}}
                name="productionFinishPerson"
                rules={[{ required: true, message: '请输入成果主要完成人员' }]}
            >
                <Input placeholder="成果主要完成人员"/>
            </Form.Item>
            <span className="label-gray mb-16">成果简介</span>
            <Form.Item
                style={{width: '700px'}}
                name="productionBrief"
                rules={[{ required: true, message: '请输入成果简介' }]}
            >
                <Input placeholder="成果简介"/>
            </Form.Item>
            <span className="label-gray mb-16">存证文件</span>
            <Form.Item
                style={{width: '700px'}}
                name="saveFile"
                rules={[{ required: true, message: '请上传存证文件' }]}
                className="step_one_upload"
            >
                <Upload
                    action='/v1/files/fileUpload'
                    fileList={jishuList}
                    listType="picture-card"
                    onPreview={handlePreview}
                    onSuccess={handelJishuListChange}
                    >
                        {
                            jishuList.length >= 1? null : uploadButton
                        }
                </Upload>
            </Form.Item>
            <span className="label-gray mb-16">作品文件</span>
            <Form.Item
                style={{width: '700px'}}
                name="productionFile"
                rules={[{ required: true, message: '请上传作品文件' }]}
            >
                <Upload
                    action='/v1/files/fileUpload'
                    fileList={worksList}
                    onPreview={handlePreview}
                    listType="picture-card"
                    className="step_one_upload"
                    onSuccess={handelWorksListChange}
                    >
                        {
                            worksList.length >= 1 ? null :uploadButton
                        }
                </Upload>
            </Form.Item>
            </div>
        </Form.Item>
    )

    const zuoping = (
        <Form.Item>
            <div className="flex-column-center pl-30 pt-20">
            <span className="label-gray mb-16">作品名称</span>
            <Form.Item
                style={{width: '700px'}}
                name="productionName"
                rules={[{ required: true, message: '请输入作品名称' }]}
            >
                <Input placeholder="作品名称"/>
            </Form.Item>
            <span className="label-gray mb-16">创作人</span>
            <Form.Item
                style={{width: '700px'}}
                name="productionComposer"
                rules={[{ required: true, message: '请输入创作人' }]}
            >
                <Input placeholder="创作人"/>
            </Form.Item>
            <span className="label-gray mb-16">权利人（企业）名称</span>
            <Form.Item
                style={{width: '700px'}}
                name="applicantName"
                rules={[{ required: true, message: '请输入权利人（企业）名称' }]}
            >
                <Input placeholder="权利人（企业）名称"/>
            </Form.Item>
            <span className="label-gray mb-16">身份证号码（纳税识别号）</span>
            <Form.Item
                style={{width: '700px'}}
                name="identityNumber"
                rules={[{ required: true, message: '请输入身份证号码（纳税识别号）' }]}
            >
                <Input placeholder="身份证号码（纳税识别号）"/>
            </Form.Item>
            <span className="label-gray mb-16">作品类型</span>
            <Form.Item
                style={{width: '700px'}}
                name="productionType"
                rules={[{ required: true, message: '请选择作品类型' }]}
            >
                <Select
                    allowClear
                    placeholder="请选择作品类型"
                    >
                    <Option value="LITERAL_TYPE">文字作品</Option>
                    <Option value="DICTATE_TYPE">口述作品</Option>
                    <Option value="MUSIC_TYPE">音乐、戏剧杂技、舞蹈、曲艺艺术作品</Option>
                    <Option value="ART_TYPE">美术、建筑作品</Option>
                    <Option value="PHOTOGRAPHY_TYPE">摄影作品</Option>
                    <Option value="MOVIE_TYPE">电影作品和以类似手法创作的作品</Option>
                    <Option value="GRAPH_TYPE">图形、模型</Option>
                    <Option value="OTHER">其他</Option>
                </Select>
            </Form.Item>
            <span className="label-gray mb-16">创作思路概述</span>
            <Form.Item
                style={{width: '700px'}}
                name="createThinking"
                rules={[{ required: true, message: '创作思路概述' }]}
            >
                <Input placeholder="创作思路概述"/>
            </Form.Item>
            <span className="label-gray mb-16">存证文件（文件，图片等）</span>
            <Form.Item
                style={{width: '700px'}}
                name="saveFile"
                rules={[{ required: true, message: '请上传存证文件' }]}
            >
                <Upload
                    action='/v1/files/fileUpload'
                    fileList={zuopingList}
                    onPreview={handlePreview}
                    listType="picture-card"
                    className="step_one_upload"
                    onSuccess={handelZuopingListChange}
                    >
                        {
                            zuopingList.length >= 1 ? null : uploadButton
                        }
                </Upload>
            </Form.Item>
            </div>
        </Form.Item>
    )

    const shangbiao = (
        <Form.Item>
            <div className="flex-column-center pl-30 pt-20">
            <span className="label-gray mb-16">商标（商号）名称</span>
            <Form.Item
                style={{width: '700px'}}
                name="brandName"
                rules={[{ required: true, message: '请输入商标（商号）名称' }]}
            >
                <Input placeholder="商标（商号）名称"/>
            </Form.Item>
            <span className="label-gray mb-16">申请人/企业名称</span>
            <Form.Item
                style={{width: '700px'}}
                name="applicantName"
                rules={[{ required: true, message: '请输入申请人/企业名称' }]}
            >
                <Input placeholder="申请人/企业名称"/>
            </Form.Item>
            <span className="label-gray mb-16">身份证号码（纳税识别号）</span>
            <Form.Item
                style={{width: '700px'}}
                name="identityNumber"
                rules={[{ required: true, message: '请输入身份证号码（纳税识别号）' }]}
            >
                <Input placeholder="身份证号码（纳税识别号）"/>
            </Form.Item>
            <span className="label-gray mb-16">商标（商号）类别</span>
            <Form.Item
                style={{width: '700px'}}
                name="brandType"
                rules={[{ required: true, message: '请输入商标（商号）类别' }]}
            >
                <Input placeholder="商标（商号）类别"/>
            </Form.Item>
            <span className="label-gray mb-16">使用情况（附相关证明）</span>
            <Form.Item
                style={{width: '700px'}}
                name="serviceCondition"
                rules={[{ required: true, message: '请上传使用情况证明' }]}
            >
                <Upload
                    action='/v1/files/fileUpload'
                    fileList={useList}
                    onPreview={handlePreview}
                    listType="picture-card"
                    className="step_one_upload"
                    onSuccess={handelUseListChange}
                    >
                        {
                            useList.length >= 1 ? null : uploadButton
                        }
                </Upload>
            </Form.Item>
            <span className="label-gray mb-16">创作思路概述</span>
            <Form.Item
                style={{width: '700px'}}
                name="createThinking"
                rules={[{ required: true, message: '创作思路概述' }]}
            >
                <Input placeholder="创作思路概述"/>
            </Form.Item>
            <span className="label-gray mb-16">作品文件（文件，图片等）</span>
            <Form.Item
                style={{width: '700px'}}
                name="productionFile"
                rules={[{ required: true, message: '请上传作品文件' }]}
            >
                <Upload
                    action='/v1/files/fileUpload'
                    fileList={shangbiaoList}
                    listType="picture-card"
                    className="step_one_upload"
                    onPreview={handlePreview}
                    onSuccess={handelShangbiaoListChange}
                    >
                        {
                            shangbiaoList.length >= 1 ? null : uploadButton
                        }
                </Upload>
            </Form.Item>
            </div>
        </Form.Item>
    )

    const yuanchandi = (
        <Form.Item>
            <div className="flex-column-center pl-30 pt-20">
            <span className="label-gray mb-16">货品名称</span>
            <Form.Item
                style={{width: '700px'}}
                name="productionName"
                rules={[{ required: true, message: '请输入货品名称' }]}
            >
                <Input placeholder="货品名称"/>
            </Form.Item>
            <span className="label-gray mb-16">货品产地</span>
            <Form.Item
                style={{width: '700px'}}
                name="productionArea"
                rules={[{ required: true, message: '请输入货品产地' }]}
            >
                <Input placeholder="货品产地"/>
            </Form.Item>
            <span className="label-gray mb-16">出口单位名称</span>
            <Form.Item
                style={{width: '700px'}}
                name="exportDepart"
                rules={[{ required: true, message: '请输入出口单位名称' }]}
            >
                <Input placeholder="出口单位名称"/>
            </Form.Item>
            <span className="label-gray mb-16">出口营业执照</span>
            <Form.Item
                style={{width: '700px'}}
                name="yuancd_exit_license"
                rules={[{ required: true, message: '请输入出口营业执照' }]}
            >
                <Input placeholder="出口营业执照"/>
            </Form.Item>
            <span className="label-gray mb-16">出口经营资格证</span>
            <Form.Item
                style={{width: '700px'}}
                name="exportLicense"
                rules={[{ required: true, message: '请输入出口经营资格证' }]}
            >
                <Input placeholder="出口经营资格证"/>
            </Form.Item>
            <span className="label-gray mb-16">出口商地址</span>
            <Form.Item
                style={{width: '700px'}}
                name="exportAddress"
                rules={[{ required: true, message: '请输入出口商地址' }]}
            >
                <Input placeholder="出口商地址"/>
            </Form.Item>
            <span className="label-gray mb-16">出口商商业发票（图片）</span>
            <Form.Item
                style={{width: '700px'}}
                name="exportInvoice"
                rules={[{ required: true, message: '请上传出口商商业发票' }]}
            >
                <Upload
                    action='/v1/files/fileUpload'
                    fileList={invoiceList}
                    listType="picture-card"
                    onPreview={handlePreview}
                    className="step_one_upload"
                    onSuccess={handelInvoiceListChange}
                    >
                        {
                            invoiceList.length >= 1 ? null : uploadButton
                        }
                </Upload>
            </Form.Item>
            <span className="label-gray mb-16">商品编号</span>
            <Form.Item
                style={{width: '700px'}}
                name="productionNumber"
                rules={[{ required: true, message: '请输入商品编号' }]}
            >
                <Input placeholder="商品编号"/>
            </Form.Item>
            <span className="label-gray mb-16">商品数量及重量</span>
            <Form.Item
                style={{width: '700px'}}
                name="productionTotal"
                rules={[{ required: true, message: '请输入商品数量及重量' }]}
            >
                <Input placeholder="商品数量及重量"/>
            </Form.Item>
            <span className="label-gray mb-16">运输方式及航线</span>
            <Form.Item
                style={{width: '700px'}}
                name="transportWay"
                rules={[{ required: true, message: '请输入运输方式及航线' }]}
            >
                <Input placeholder="运输方式及航线"/>
            </Form.Item>
            <span className="label-gray mb-16">货品生产程序（文件、图片等）</span>
            <Form.Item
                style={{width: '700px'}}
                name="productionProcedure"
                rules={[{ required: true, message: '请上传货品生产程序' }]}
            >
                <Upload
                    action='/v1/files/fileUpload'
                    fileList={programList}
                    listType="picture-card"
                    onPreview={handlePreview}
                    className="step_one_upload"
                    onSuccess={handelProgramListChange}
                    >
                        {
                            programList.length >= 1 ? null : uploadButton
                        }
                </Upload>
            </Form.Item>
            <span className="label-gray mb-16">货品成分（文件、图片等）</span>
            <Form.Item
                style={{width: '700px'}}
                name="productionElement"
                rules={[{ required: true, message: '请上传货品成分' }]}
            >
                <Upload
                    action='/v1/files/fileUpload'
                    fileList={compositionList}
                    listType="picture-card"
                    onPreview={handlePreview}
                    className="step_one_upload"
                    onSuccess={handelCompositionListChange}
                    >
                        {
                            compositionList.length >= 1 ? null : uploadButton
                        }
                </Upload>
            </Form.Item>
            <span className="label-gray mb-16">证明文字</span>
            <Form.Item
                style={{width: '700px'}}
                name="testifyNote"
                rules={[{ required: true, message: '证明文字' }]}
            >
                <Input placeholder="证明文字"/>
            </Form.Item>
            <span className="label-gray mb-16">存证文件（文件，图片等）</span>
            <Form.Item
                style={{width: '700px'}}
                name="saveFile"
                rules={[{ required: true, message: '请上传存证文件' }]}
            >
                <Upload
                    action='/v1/files/fileUpload'
                    fileList={fontList}
                    listType="picture-card"
                    onPreview={handlePreview}
                    className="step_one_upload"
                    onSuccess={handelFontListChange}
                    >
                        {
                            fontList.length >= 1 ? null : uploadButton
                        }
                </Upload>
            </Form.Item>
            </div>
        </Form.Item>
    )

    const chuangtongzhishi = (
        <Form.Item>
            <div className="flex-column-center pl-30 pt-20">
            <span className="label-gray mb-16">来源</span>
            <Form.Item
                name="sourceType"
                rules={[{ required: true, message: '请选择来源' }]}
            >
                <Select
                    allowClear
                    placeholder="请选择来源"
                    >
                    <Option value="TERRITORY_TYPE">地域</Option>
                    <Option value="CROWD_TYPE">人群</Option>
                    <Option value="OTHER">其他</Option>
                </Select>
            </Form.Item>
            <span className="label-gray mb-16">流传证据</span>
            <Form.Item
                style={{width: '700px'}}
                name="spreadEvidence"
                rules={[{ required: true, message: '请输入流传证据' }]}
            >
                <Input placeholder="流传证据"/>
            </Form.Item>
            <span className="label-gray mb-16">流传时间</span>
            <Form.Item
                style={{width: '700px'}}
                name="spreadTime"
                rules={[{ required: true, message: '请输入流传时间' }]}
            >
                <Input placeholder="流传时间"/>
            </Form.Item>
            <span className="label-gray mb-16">流传期间改进点</span>
            <Form.Item
                style={{width: '700px'}}
                name="spreadImprove"
                rules={[{ required: true, message: '请输入流传期间改进点' }]}
            >
                <Input placeholder="流传期间改进点"/>
            </Form.Item>
            <span className="label-gray mb-16">简要概述</span>
            <Form.Item
                style={{width: '700px'}}
                name="briefOverview"
                rules={[{ required: true, message: '请输入简要概述' }]}
            >
                <Input placeholder="简要概述"/>
            </Form.Item>
            <span className="label-gray mb-16">存证文件（文件，图片等）</span>
            <Form.Item
                style={{width: '700px'}}
                name="saveFile"
                rules={[{ required: true, message: '请上传存证文件' }]}
            >
                <Upload
                    action='/v1/files/fileUpload'
                    fileList={chuantongList}
                    listType="picture-card"
                    onPreview={handlePreview}
                    className="step_one_upload"
                    onSuccess={handelChuantogListChange}
                    >
                        {
                            chuantongList.length >= 1 ? null : uploadButton
                        }
                </Upload>
            </Form.Item>
            </div>
        </Form.Item>
    )

    return (
        <div className="flex-center step_one">
            <Form
                name="basic"
                onFinish={onFinish}
                size="middle"
            >
                
                {
                    type==='technology'&&
                    jishu
                }

                {
                    type==='copyright'&&
                    zuoping
                }

                {
                    type==='trademark' &&
                    shangbiao
                }
                {
                    type==='origin'&&
                    yuanchandi
                }
                {
                    type==='tradition'&&
                    chuangtongzhishi
                }
                
                <Form.Item style={{width: '700px'}}>
                    <Form.Item
                        name="open"
                        label="是否公开作品或存证文件"
                        rules={[{ required: true, message: '请选择是否公开作品或存证文件' }]}
                    >
                        <Radio.Group>
                            <Radio value='0'>是</Radio>
                            <Radio value='1'>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Checkbox>
                        <span className="label-gray">
                                已确认遵守
                        </span>
                        <span className="font-main ft-size-18">《原创性声明》</span>
                    </Checkbox>
                </Form.Item>
        
                <Form.Item style={{width: '700px'}}>
                    <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                        下一步
                    </Button>
                </Form.Item>
            </Form>
            <Modal
                visible={previewVisible}
                footer={null}
                onCancel={handleCancel}
                >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    )
}
