import React,{useState} from 'react'
import { Form, Button, Select, Input, DatePicker } from 'antd';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/zh_CN';

const { Option } = Select;
const { TextArea } = Input;

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
                            <Option value="美术作品">美术作品</Option>
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
                    <span className="label-gray">创作完成日期</span>
                    <Form.Item
                        style={{width: '700px'}}
                        name="finishDate"
                        rules={[{ required: true, message: '请输入创作完成日期' }]}
                    >
                        <DatePicker style={{width: '700px'}} locale={locale}/>
                    </Form.Item>
                </Form.Item>
                
                <Form.Item>
                    <span className="label-gray">首次发表/出版/制作日期</span>
                    <Form.Item
                        style={{width: '700px'}}
                        name="date"
                    >
                        <DatePicker style={{width: '700px'}} locale={locale}/>
                    </Form.Item>
                </Form.Item>
                
                <Form.Item>
                    <span className="label-gray">创作目的</span>
                    <Form.Item
                        style={{width: '700px'}}
                        name="purpose"
                        rules={[{ required: true, message: '请输入创作目的' },{min: 20, message: '请输入不低于20字'}]}
                    >
                        <TextArea maxLength={100} placeholder="请输入创作目的（不低于20字）"/>
                    </Form.Item>
                </Form.Item>
                
                <Form.Item>
                    <span className="label-gray">创作过程</span>
                    <Form.Item
                        style={{width: '700px'}}
                        name="process"
                        rules={[{ required: true, message: '请输入创作过程' },{min: 20, message: '请输入不低于20字'}]}
                    >
                        <TextArea maxLength={100} placeholder="请输入创作过程（不低于20字）"/>
                    </Form.Item>
                </Form.Item>
                
                <Form.Item>
                    <span className="label-gray">作品独创性</span>
                    <Form.Item
                        style={{width: '700px'}}
                        name="independent"
                        rules={[{ required: true, message: '请输入作品独创性' },{min: 20, message: '请输入不低于20字'}]}
                    >
                        <TextArea maxLength={100} placeholder="请输入作品独创性（不低于20字）"/>
                    </Form.Item>
                </Form.Item>
                

                <div className="step-one-tips mb-20" style={{width: '700px'}}>
                    版权登记须知：
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
