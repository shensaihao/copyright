import React,{useState, useEffect, useRef} from 'react'
import { Form, Button, Select, Input } from 'antd';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { originalService, useLoading } from 'src/service';

const { Option } = Select;

export default function StepOne(props) {
    const [fileList, setFileList] = useState([])
    const [programList, setProgramList] = useState([])
    const [compositionList, setCompositionList] = useState([])
    const [fontList, setFontList] = useState([])
    const [productionFile, setProductionFile] = useState([])
    const [brendFile, setBrendFile] = useState([])
    const [techFile, setTechFile] = useState([])
    const [loading, fileUpload] = useLoading(originalService.postFileUpload)
    const [finish, setFinish] = useState({})

    const [type, setType] = useState('技术成果存证')

    const onFinish = values => {
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

    const handelProductionFileChange = (res) => {
        const {fileName, originalFilename, relativePath} = res.data
        setProductionFile([{
            uid: fileName,
            name: originalFilename,
            status: 'done',
            url: relativePath,
        }])
    }

    const handelTechFileChange = (res) => {
        const {fileName, originalFilename, relativePath} = res.data
        setTechFile([{
            uid: fileName,
            name: originalFilename,
            status: 'done',
            url: relativePath,
        }])
    }

    const handelBrendFileSuccess = (res) => {
        const {fileName, originalFilename, relativePath} = res.data
        setBrendFile([{
            uid: fileName,
            name: originalFilename,
            status: 'done',
            url: relativePath,
        }])
    }

    useEffect(()=>{
        if (finish.type==='商标和商号存证') {
            finish.productionFile = brendFile[0].url
            props.handelStepOneSubmit(finish)
        }
        if (finish.type==='版权作品存证') {
            finish.saveFile = productionFile[0].url
            props.handelStepOneSubmit(finish)
        }
        if (finish.type === '传统知识存证与保护') {
            props.handelStepOneSubmit(finish)
        }
        if (finish.type === '技术成果存证') {
            finish.saveFile = techFile[0].url
            props.handelStepOneSubmit(finish)
        }
        if (finish.type === '原产地存证') {
            finish.productionProcedure = programList[0].url
            finish.productionElement = compositionList[0].url
            finish.saveFile = fontList[0].url
            props.handelStepOneSubmit(finish)
        }
    },[brendFile, productionFile, programList, compositionList, fontList, techFile, finish, props])

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
            <span className="label-gray">成果名称</span>
            <Form.Item
                style={{width: '670px'}}
                name="productionName"
                rules={[{ required: true, message: '请输入成果名称' }]}
            >
                <Input placeholder="成果名称"/>
            </Form.Item>
            <span className="label-gray">第一完成单位</span>
            <Form.Item
                style={{width: '670px'}}
                name="completeDepart"
                rules={[{ required: true, message: '第一完成单位' }]}
            >
                <Input placeholder="第一完成单位"/>
            </Form.Item>
            <span className="label-gray">身份证号码（纳税识别号）</span>
            <Form.Item
                style={{width: '670px'}}
                name="identityNumber"
                rules={[{ required: true, message: '请输入身份证号码（纳税识别号）' }]}
            >
                <Input placeholder="身份证号码（纳税识别号）"/>
            </Form.Item>
            <span className="label-gray">技术类型</span>
            <Form.Item
                style={{width: '670px'}}
                name="techType"
                rules={[{ required: true, message: '技术类型' }]}
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
            <span className="label-gray">技术课题来源</span>
            <Form.Item
                style={{width: '670px'}}
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
            <span className="label-gray">存证文件</span>
            <Form.Item
                style={{width: '670px'}}
                name="saveFile"
                rules={[{ required: true, message: '请上传存证文件' }]}
            >
                <Upload
                    action='/v1/files/fileUpload'
                    fileList={techFile}
                    onSuccess={handelTechFileChange}
                    >
                        {
                            <Button>
                                <UploadOutlined /> 点击上传存证文件
                            </Button>
                        }
                </Upload>
            </Form.Item>
            </div>
        </Form.Item>
    )

    const zuoping = (
        <Form.Item>
            <div className="flex-column-center pl-30 pt-20">
            <span className="label-gray">作品名称</span>
            <Form.Item
                style={{width: '670px'}}
                name="productionName"
                rules={[{ required: true, message: '请输入作品名称' }]}
            >
                <Input placeholder="作品名称"/>
            </Form.Item>
            <span className="label-gray">创作人</span>
            <Form.Item
                style={{width: '670px'}}
                name="productionComposer"
                rules={[{ required: true, message: '请输入创作人' }]}
            >
                <Input placeholder="创作人"/>
            </Form.Item>
            <span className="label-gray">权利人（企业）名称</span>
            <Form.Item
                style={{width: '670px'}}
                name="applicantName"
                rules={[{ required: true, message: '请输入权利人（企业）名称' }]}
            >
                <Input placeholder="权利人（企业）名称"/>
            </Form.Item>
            <span className="label-gray">身份证号码（纳税识别号）</span>
            <Form.Item
                style={{width: '670px'}}
                name="identityNumber"
                rules={[{ required: true, message: '请输入身份证号码（纳税识别号）' }]}
            >
                <Input placeholder="身份证号码（纳税识别号）"/>
            </Form.Item>
            <span className="label-gray">作品类型</span>
            <Form.Item
                style={{width: '670px'}}
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
            <span className="label-gray">创作思路概述</span>
            <Form.Item
                style={{width: '670px'}}
                name="createThinking"
                rules={[{ required: true, message: '创作思路概述' }]}
            >
                <Input placeholder="创作思路概述"/>
            </Form.Item>
            <span className="label-gray">存证文件（文件，图片等）</span>
            <Form.Item
                style={{width: '670px'}}
                name="saveFile"
                rules={[{ required: true, message: '请上传存证文件' }]}
            >
                <Upload
                    action='/v1/files/fileUpload'
                    fileList={productionFile}
                    onSuccess={handelProductionFileChange}
                    >
                        {
                            <Button>
                                <UploadOutlined /> 点击上传存证文件
                            </Button>
                        }
                </Upload>
            </Form.Item>
            </div>
        </Form.Item>
    )

    const shangbiao = (
        <Form.Item>
            <div className="flex-column-center pl-30 pt-20">
            <span className="label-gray">商标（商号）名称</span>
            <Form.Item
                style={{width: '670px'}}
                name="brandName"
                rules={[{ required: true, message: '请输入商标（商号）名称' }]}
            >
                <Input placeholder="商标（商号）名称"/>
            </Form.Item>
            <span className="label-gray">企业名称</span>
            <Form.Item
                style={{width: '670px'}}
                name="applicantName"
                rules={[{ required: true, message: '请输入企业名称' }]}
            >
                <Input placeholder="企业名称"/>
            </Form.Item>
            <span className="label-gray">身份证号码（纳税识别号）</span>
            <Form.Item
                style={{width: '670px'}}
                name="identityNumber"
                rules={[{ required: true, message: '请输入身份证号码（纳税识别号）' }]}
            >
                <Input placeholder="身份证号码（纳税识别号）"/>
            </Form.Item>
            <span className="label-gray">商标（商号）类别</span>
            <Form.Item
                style={{width: '670px'}}
                name="brandType"
                rules={[{ required: true, message: '请输入商标（商号）类别' }]}
            >
                <Input placeholder="商标（商号）类别"/>
            </Form.Item>
            <span className="label-gray">创作思路概述</span>
            <Form.Item
                style={{width: '670px'}}
                name="createThinking"
                rules={[{ required: true, message: '创作思路概述' }]}
            >
                <Input placeholder="创作思路概述"/>
            </Form.Item>
            <span className="label-gray">存证文件（文件，图片等）</span>
            <Form.Item
                style={{width: '670px'}}
                name="productionFile"
                rules={[{ required: true, message: '请上传存证文件' }]}
            >
                <Upload
                    action='/v1/files/fileUpload'
                    fileList={brendFile}
                    onSuccess={handelBrendFileSuccess}
                    >
                        {
                            <Button>
                                <UploadOutlined /> 点击上传存证文件
                            </Button>
                        }
                </Upload>
            </Form.Item>
            </div>
        </Form.Item>
    )

    const yuanchandi = (
        <Form.Item>
            <span className="label-gray">其他信息</span>
            <div className="flex-column-center pl-30 pt-20">
            <span className="label-gray">货品名称</span>
            <Form.Item
                style={{width: '670px'}}
                name="productionName"
                rules={[{ required: true, message: '请输入货品名称' }]}
            >
                <Input placeholder="货品名称"/>
            </Form.Item>
            <span className="label-gray">货品产地</span>
            <Form.Item
                style={{width: '670px'}}
                name="productionArea"
                rules={[{ required: true, message: '请输入货品产地' }]}
            >
                <Input placeholder="货品产地"/>
            </Form.Item>
            <span className="label-gray">出口单位名称</span>
            <Form.Item
                style={{width: '670px'}}
                name="exportDepart"
                rules={[{ required: true, message: '请输入出口单位名称' }]}
            >
                <Input placeholder="出口单位名称"/>
            </Form.Item>
            <span className="label-gray">货品生产程序（文件、图片等）</span>
            <Form.Item
                style={{width: '670px'}}
                name="productionProcedure"
                rules={[{ required: true, message: '请上传货品生产程序' }]}
            >
                <Upload
                    action='/v1/files/fileUpload'
                    fileList={programList}
                    onSuccess={handelProgramListChange}
                    >
                        {
                            <Button>
                                <UploadOutlined /> 点击上传货品生产程序
                            </Button>
                        }
                </Upload>
            </Form.Item>
            <span className="label-gray">货品成分（文件、图片等）</span>
            <Form.Item
                style={{width: '670px'}}
                name="productionElement"
                rules={[{ required: true, message: '请上传货品成分' }]}
            >
                <Upload
                    action='/v1/files/fileUpload'
                    fileList={compositionList}
                    onSuccess={handelCompositionListChange}
                    >
                        {
                            <Button>
                                <UploadOutlined /> 点击上传货品成分
                            </Button>
                        }
                </Upload>
            </Form.Item>
            <span className="label-gray">证明文字</span>
            <Form.Item
                style={{width: '670px'}}
                name="testifyNote"
                rules={[{ required: true, message: '证明文字' }]}
            >
                <Input placeholder="证明文字"/>
            </Form.Item>
            <span className="label-gray">存证文件（文件，图片等）</span>
            <Form.Item
                style={{width: '670px'}}
                name="saveFile"
                rules={[{ required: true, message: '请上传存证文件' }]}
            >
                <Upload
                    action='/v1/files/fileUpload'
                    fileList={fontList}
                    onSuccess={handelFontListChange}
                    >
                        {
                            <Button>
                                <UploadOutlined /> 点击上传存证文件
                            </Button>
                        }
                </Upload>
            </Form.Item>
            </div>
        </Form.Item>
    )

    const chuangtongzhishi = (
        <Form.Item>
            <span className="label-gray">其他信息</span>
            <div className="flex-column-center pl-30 pt-20">
            <span className="label-gray">来源</span>
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
            <span className="label-gray">流传证据</span>
            <Form.Item
                style={{width: '670px'}}
                name="spreadEvidence"
                rules={[{ required: true, message: '请输入流传证据' }]}
            >
                <Input placeholder="流传证据"/>
            </Form.Item>
            <span className="label-gray">流传时间</span>
            <Form.Item
                style={{width: '670px'}}
                name="spreadTime"
                rules={[{ required: true, message: '请输入流传时间' }]}
            >
                <Input placeholder="流传时间"/>
            </Form.Item>
            <span className="label-gray">流传期间改进点</span>
            <Form.Item
                style={{width: '670px'}}
                name="spreadImprove"
                rules={[{ required: true, message: '请输入流传期间改进点' }]}
            >
                <Input placeholder="流传期间改进点"/>
            </Form.Item>
            </div>
        </Form.Item>
    )

    return (
        <div className="flex-center">
            <Form
                name="basic"
                onFinish={onFinish}
                size="middle"
            >
                <Form.Item style={{width: '700px'}}>
                    <span className="label-gray">作品登记类型</span>
                    <Form.Item
                        name="type"
                    >
                        <Select
                            placeholder="请选择类型"
                            initialValues={type}
                            onChange={(val) => setType(val)}
                            >
                            <Option value="技术成果存证">技术成果存证</Option>
                            <Option value="版权作品存证">版权作品存证</Option>
                            <Option value="商标和商号存证">商标和商号存证</Option>
                            <Option value="原产地存证">原产地存证</Option>
                            <Option value="传统知识存证与保护">传统知识存证与保护</Option>
                        </Select>
                    </Form.Item>
                </Form.Item>
                
                {
                    type==='技术成果存证'&&
                    jishu
                }

                {
                    type==='版权作品存证'&&
                    zuoping
                }

                {
                    type==='商标和商号存证' &&
                    shangbiao
                }
                {
                    type==='原产地存证'&&
                    yuanchandi
                }
                {
                    type==='传统知识存证与保护'&&
                    chuangtongzhishi
                }

                <div className="step-one-tips mb-20" style={{width: '700px'}}>
                    原创登记须知：
                    <br />
                    1. 您需要保证作品无侵权行为
                    <br />
                    2. 系统会自动检测全网已备案作品，若存在相似度高于50%的作品，则自动判断为无效申请，且15天内您不可以再进行版权保护申请        
                </div>
        
                <Form.Item style={{width: '700px'}}>
                    <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                        下一步
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
