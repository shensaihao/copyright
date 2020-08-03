import React, {useState} from 'react'
import {Modal} from 'antd'

export default function StepSix(props) {

    const [perviewVisible, setPerviewVisible] = useState(false)

    const downLoadRecord = () => {
        const img = document.getElementById('download-image'); // 获取要下载的图片
        const url = img.src;                            // 获取图片地址
        const a = document.createElement('a');          // 创建一个a节点插入的document
        const event = new MouseEvent('click')           // 模拟鼠标click点击事件
        a.download = '登记证书'                  // 设置a节点的download属性值
        a.href = url;                                 // 将图片的src赋值给a节点的href
        a.dispatchEvent(event)
    }

    return (
        <div>
            <div className="flex-center step-six-title">
                版权确认
            </div>
            <div className="flex-column-center-center">
                <div className="flex-between m-y-20" style={{width: '700px'}}>
                    <div className="step-four-label ft-size-18">信息上链哈希</div>
                    <div className="step-four-content ft-size-18">0x29789njfirhfuierfhnwuifcbndecihrfureifhqoq</div>
                </div>
                <div className="flex-between m-y-20" style={{width: '700px'}}>
                    <div className="step-four-label ft-size-18">上链区块</div>
                    <div className="step-four-content ft-size-18">125121</div>
                </div>
                <div className="flex-between m-y-20" style={{width: '700px'}}>
                    <div className="step-four-label ft-size-18">登记信息</div>
                    <div></div>
                </div>
            </div>
            <div className="flex-column-center-center">
                <div className="flex-start m-y-20" style={{width: '600px'}}>
                    <div className="step-four-label mr-30 ft-size-16">登记号</div>
                    <div>川作登字-2020-B-01428462</div>
                </div>
                <div className="flex-start m-y-20 ft-size-16" style={{width: '600px'}}>
                    <div className="step-four-label mr-30">作品类型</div>
                    <div>
                    {
                            props.worksInfo.type
                        }
                    </div>
                </div>
                <div className="flex-start m-y-20 ft-size-16" style={{width: '600px'}}>
                    <div className="step-four-label mr-30">作品名称</div>
                    <div>
                    {
                            props.worksInfo.name
                        }
                    </div>
                </div>
                <div className="flex-start m-y-20 ft-size-16" style={{width: '600px'}}>
                    <div className="step-four-label mr-30">作者姓名</div>
                    <div>
                    {
                            props.worksInfo.person_name
                        }
                    </div>
                </div>
                <div className="flex-start m-y-20 ft-size-16" style={{width: '600px'}}>
                    <div className="step-four-label mr-30">作品查看</div>
                    <div className="blue-color-font curser-pointer" onClick={() => setPerviewVisible(true)}>点击查看 </div>
                </div>
            </div>
            <div className="flex-column-center-center">
                <div className="flex-between m-y-20" style={{width: '700px'}}>
                    <div className="step-four-label ft-size-18">登记证明</div>
                    <div></div>
                </div>
                <div className="flex-start-end" style={{width: '700px'}}>
                    <img src={require('src/images/zhengming.png')} alt="" id="download-image"/>
                    <div className="flex-start ml-20">
                        <img src={require('src/images/download.png')} alt=""/>
                        <div className="ml-8 blue-color-font curser-pointer" onClick={downLoadRecord}>下载登记证书</div>
                    </div>
                </div>
            </div>
            <Modal
                visible={perviewVisible}
                onCancel={() => setPerviewVisible(false)}
                footer={null}
                >
                <img alt="" style={{ width: '100%' }} src={props.worksInfo.works.file.thumbUrl} />
            </Modal>
        </div>
    )
}
