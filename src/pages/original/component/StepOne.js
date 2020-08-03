import React,{useState} from 'react'
import { Form, Button, Select, Input } from 'antd';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function StepOne(props) {
    const [fileList, setFileList] = useState([])
    const onFinish = values => {
        props.handelStepOneSubmit(values)
      };

    const uploadBtn = (
        <>
            <UploadOutlined style={{fontSize: '40px',color:'#7D8EA8'}}/>
            <div>上传</div>
        </>
    )

    const handelChange = (fileList) => {
        console.log(fileList.fileList)
        setFileList(fileList.fileList)
    }

    return (
        <div className="flex-center">
            <Form
                name="basic"
                onFinish={onFinish}
                size="middle"
            >
                <Form.Item style={{width: '700px'}}>
                    <span className="label-gray">版权登记类型</span>
                    <Form.Item
                        name="type"
                        rules={[{ required: true, message: '请选择登记类型' }]}
                    >
                        <Select
                            allowClear
                            placeholder="请选择类型"
                            >
                            <Option value="技术成果存证">技术成果存证</Option>
                            <Option value="版权作品存证">版权作品存证</Option>
                            <Option value="商标和商号存证">商标和商号存证</Option>
                            <Option value="原产地存证">原产地存证</Option>
                            <Option value="传统知识存证与保护">传统知识存证与保护</Option>
                        </Select>
                    </Form.Item>
                </Form.Item>
                
                <Form.Item>
                    <span className="label-gray">作品名称</span>
                    <Form.Item
                        style={{width: '700px'}}
                        name="name"
                        rules={[{ required: true, message: '请输入作品名称' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form.Item>
                
                <Form.Item>
                    <span className="label-gray">上传作品</span>
                    <div className="step-one-upload flex-center">
                    <Form.Item
                        name="works"
                        rules={[{ required: true, message: '请上传作品' }]}
                        
                    >
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onChange={handelChange}
                            >
                                {
                                    fileList.length > 0 ? null : uploadBtn
                                }
                        </Upload>
                    </Form.Item>
                    </div>
                </Form.Item>

                <Form.Item>
                    <span className="label-gray">其他信息</span>
                    <div className="flex-column-center">
                    <Form.Item
                        style={{width: '700px'}}
                        name="name"
                        rules={[{ required: true, message: '请输入成果名称' }]}
                    >
                        <Input placeholder="成果名称"/>
                    </Form.Item>
                    <Form.Item
                        style={{width: '700px'}}
                        name="name"
                        rules={[{ required: true, message: '第一完成单位' }]}
                    >
                        <Input placeholder="第一完成单位"/>
                    </Form.Item>
                    <Form.Item
                        style={{width: '700px'}}
                        name="name"
                        rules={[{ required: true, message: '技术类型' }]}
                    >
                        <Input placeholder="第一完成单位"/>
                    </Form.Item>
                    <Form.Item
                        style={{width: '700px'}}
                        name="name"
                        rules={[{ required: true, message: '技术成果来源描述' }]}
                    >
                        <Input placeholder="技术成果来源描述"/>
                    </Form.Item>
                    <Form.Item
                        style={{width: '700px'}}
                        name="name"
                        rules={[{ required: true, message: '存证文件' }]}
                    >
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            fileList={fileList}
                            onChange={handelChange}
                            >
                                {
                                    fileList.length > 0 ? null : uploadBtn
                                }
                        </Upload>
                    </Form.Item>
                    </div>
                </Form.Item>

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
