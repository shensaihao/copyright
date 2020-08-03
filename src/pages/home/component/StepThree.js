import React, {useState} from 'react'
import { Form, Button, Select, Input } from 'antd';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;


export default function StepTree(props) {
    const [file1, setFile1] = useState([])
    const [file2, setFile2] = useState([])
    const [file3, setFile3] = useState([])

    const onFinish = values => {
        props.handelStepTreeSubmit(values)
      };

      const upladBtn = (
          <>
            <UploadOutlined style={{fontSize: '32px', color: '#C6D4DF',fontWeight: "bolder"}}/>
            <div className="upload-text">上传</div>
          </>
      )

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
                        name="person_type"
                        rules={[{ required: true, message: '请选择登记类型' }]}
                    >
                        <Select
                            allowClear
                            placeholder="请选择类型"
                            >
                            <Option value="公民个体">公民个体</Option>
                        </Select>
                    </Form.Item>
                </Form.Item>
                
                <Form.Item>
                    <span className="label-gray">作者姓名</span>
                    <Form.Item
                        style={{width: '700px'}}
                        name="person_name"
                        rules={[{ required: true, message: '请输入作者姓名' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form.Item>
                <Form.Item>
                    <span className="label-gray">证件号码</span>
                    <Form.Item
                        style={{width: '700px'}}
                        name="person_number"
                        rules={[{ required: true, message: '请输入证件号码' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form.Item>
                
                <Form.Item>
                    <span className="label-gray">手机号</span>
                    <Form.Item
                        style={{width: '700px'}}
                        name="phone"
                        rules={[{ required: true, message: '请输入手机号' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form.Item>
                
                {/* <Form.Item>
                    <span className="label-gray">验证码</span>
                    <Form.Item
                        style={{width: '700px'}}
                        name="code"
                        rules={[{ required: true, message: '请输入验证码' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form.Item> */}
                
                <Form.Item>
                    <span className="label-gray">上传证件</span>
                    <div className="flex-between" style={{width: '700px'}}>
                        <div className="step-upload-image flex-center-end">
                            <Form.Item
                                name="id_card_1"
                                rules={[{ required: true, message: '请上传身份证正面' }]}
                                
                            >
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={file1}
                                    onChange={(file) => setFile1(file.fileList)}
                                    >
                                        {
                                            file1.length > 0 ? null : upladBtn
                                        }
                                </Upload>
                            </Form.Item>
                        </div>
                        <div className="step-three-id-card-1">
                            <img src={require('src/images/id-card-1.png')} alt=""/>
                            <div className="text-center upload-text">身份证正面</div>
                        </div>
                    </div>
                    <div className="flex-between m-y-20" style={{width: '700px'}}>
                        <div className="step-upload-image flex-center-end">
                            <Form.Item
                                name="id_card_2"
                                rules={[{ required: true, message: '请上传身份证反面' }]}
                                
                            >
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={file2}
                                    onChange={(file) => setFile2(file.fileList)}
                                    >
                                        {
                                            file2.length > 0 ? null : upladBtn
                                        }
                                </Upload>
                            </Form.Item>
                        </div>
                        <div className="step-three-id-card-1">
                            <img src={require('src/images/id-card-2.png')} alt=""/>
                            <div className="text-center upload-text">身份证反面</div>
                        </div>
                    </div>
                    <div className="flex-between" style={{width: '700px'}}>
                        <div className="step-upload-image flex-center-end step-three-upload">
                            <Form.Item
                                name="id_card_3"
                                rules={[{ required: true, message: '请上传手持身份证照片' }]}
                            >
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={file3}
                                    onChange={(file) => setFile3(file.fileList)}
                                    >
                                        {
                                            file3.length > 0 ? null : upladBtn
                                        }
                                </Upload>
                            </Form.Item>
                        </div>
                        <div className="step-three-id-card-1">
                            <img src={require('src/images/id-card-3.png')} alt=""/>
                            <div className="text-center upload-text">手持身份证照片</div>
                        </div>
                    </div>
                </Form.Item>
        
                <Form.Item style={{width: '700px'}}>
                    <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                        下一步
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
