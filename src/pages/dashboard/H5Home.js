import React, {useState, useEffect} from 'react'
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import { Modal, message } from 'antd'
import Header from 'src/pages/H5/Header'
import { useLoading, copyrightService} from 'src/service';
import copy from 'copy-to-clipboard';

export default function H5Home() {

    const initialState = {
        img: 'h5_home_partner_1',
        name: '链博科技',
        desc: `成立于2018年3月，是业界领先的区块链技术及行业解决方案提供商、区块链+数字生态经济体构建者，
        拥有一支研究前沿、技术扎实、商业敏锐、执行力强、迭代高效的实战型团队，在公链、联盟链、BaaS、
        跨链、共识算法、智能合约、数字钱包、资产交易、隐私保护等区块链以及大数据和机器学习领域拥有全栈技术能力和经验，
        为客户提供产业和商业数字化的底层技术解决方案和系统集成服务，帮助客户打造基于区块链的自主可控、安全高效、
        易用可拓展的数字化平台，并以商业模式创新帮助客户进行业务创新和产业升级。 成立以来，
        链博科技已陆续为来自金融、供应链、溯源、大数据、医疗、教育、网络游戏、
        电子商务等不同方向的二十多家企事业单位提供区块链解决方案，成为业内具备全栈链改技术和商业解决方案设计的引领者。`
    }

    const initialState1 = {
        img: 'h5_home_partner_2',
        name: '成都恒道',
        desc: `成立于2015年9月，由四川省内从业多年具有经验的知识产权代理机构作为发起人，
        在国家相关部门登记注册并拥有独立法人资格的民办非营利性研究机构。研究院聚集一批在知识产权战略理论与实务方面造诣很高的权威专家，
        组建具有高水准的研究团队。在承担知识产权与科技创新研究的同时，
        研究院还开展了知识产权战略规划、知识产权预警、知识产权管理等与知识产权相关的实务工作。`
    }

    const initialservice = {
        img: 'h5_advantage_fuwu',
        name: `平台以时间戳技术、数字签名、哈希等数字认证方式，实时保存创作过程和结果，将原创作品作为证据固化保全，形成严谨的证据链，
        为创作者提供维权时作为司法采集的电子证据。平台通过了国家工信部的相关备案和认证，具有高度的权威性。在服务方面，平台致力于知识产权确权、
        维权、用权的全链条服务，同时，平台还整合企业管理咨询、法律服务等资源，为用户提供全方位、一站式服务，助力企业发展。`
    }

    const ziyuanservice = {
        img: 'h5_advantage_ziyuan',
        name: '资源整合与专业服务优势',
        desc: `“至泰链”原创认证服务平台由链博(成都)科技有限公司、成都恒道知识产权与科技创新研究院等单位联合打造并负责运营，其中，链博(成都)科技有限公司负责平台的技术服务支持，
        成都恒道知识产权与科技创新研究院负责专业服务支持；此外，平台还组建过一支运营团队，联合平台各方资源，为用户提供专业化服务。`
    }

    const xueshu = {
        img: 'h5_advantage_xueshu',
        name: '学术研究与实战经验优势',
        desc: `平台合作方之一的链博(成都)科技有限公司是区块链领域技术领先的一家企业，
        开发出多项基于区块链的技术解决方案；成都恒道知识产权与科技创新研究院为省内知名的知识产权研究机构，承担过国家级、省级的相关课题研究。`
    }

    const shangbiao = {
        img: 'h5_service_shangbiao',
        name: '商标与商号认证',
        desc: `注册商标所有人可从平台提取认证后的证书，以证书上的时间证明其在先使用，以对抗注册商标专有权人，达到在原使用范围内继续使用该商标的目的。
        即将申请注册的商标与商号上传平台，由平台对上传的商标与商号进行认证，确认所有人使用该商标与商号的时间，固化保全所有人在商标经核准注册前使用该商标的事实。`,
        address: 'http://47.100.225.40:8888/#/works?type=BRAND_TYPE'
    }

    const banquan = {
        img: 'h5_service_banquan',
        name: '版权认证',
        desc: `将文字、口述、音乐、戏剧、曲艺、舞蹈、杂技、美术、建筑类、摄影、电影、图形、模型、计算机软件等其他作品，
        通过至泰链平台进行保存并盖时间擢。全部操作均通过互联网完成，用户足不出户即可提取有效维权证据。
        节省了律师取证、公证处公证、真实无篡改鉴定等各种耗费大量人力物力的线下过程。`,
        address: 'http://47.100.225.40:8888/#/works?type=COPYRIGHT_TYPE'
    }

    const jishu = {
        img: 'h5_service_jishu',
        name: '技术成果认证',
        desc: `将一项发明向公众公开以阻止别人对其申请专利。这可以确保任何人都不会再获得该项发明的排他权，从而为所有的人都提供了一定的运作自由，
        进行防御性公开时一定要注意在有可能被专利审查员审查将来的专利申请时作为检索文献的受到广泛承认的技术性杂志或出版物上公开。
        通过上传平台存证、认证，从而实现相应成果的前置保护。`,
        address: 'http://47.100.225.40:8888/#/works?type=TECH_TYPE'
    }

    const yuanchandi = {
        img: 'h5_service_yuanchandi',
        name: '原产地认证',
        desc: `由用户上传与商品原产地相关的系列影像资料，平台对资料进行认证，并提供认证证书，标注该商品源于某一特定地点。用于确定商品原产地的资料和信息。`,
        address: 'http://47.100.225.40:8888/#/works?type=SOURCE_TYPE'
    }

    const chuantong = {
        img: 'h5_service_chuantong',
        name: '传统文化保护与认证',
        desc: `我国现有的法律制度没有全面涵盖传统知识的保护，传统知识因缺乏必要保护方面的制度设计与技术策略，常常面临尴尬境地。在平台建立和开通我国传统知识网络认证板块，
        由申请人自愿申请传统知识和民间文学艺术作品权利人认证。经过平台认证后，申请人所拥有的传统知识可以获得纳入传统知识基因库的资格，
        确保其有关权利的实现与转化，并获得必要的人身权与惠益分享等财产权。`,
        address: 'http://47.100.225.40:8888/#/works?type=TRADITION_TYPE'
    }

    const [worksList, setWorksList] = useState([])
    const [modal1, setModal1] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [modal3, setModal3] = useState(false)
    const [serviceModal, setServiceModal] = useState(initialservice)
    const [componyMadal, setComponyMadal] = useState(initialState)
    const [copyrightModal, setCopyrightModal] = useState(banquan)
    const [loading, getAllByCondition] = useLoading(copyrightService.getAllByCondition)
    const history = useHistory()

    const copyrightRegister = {
        'TRADITION_TYPE': '传统知识存与保护',
        'BRAND_TYPE': '商标和商号存证',
        'TECH_TYPE': '技术成果存证',
        'COPYRIGHT_TYPE': '版权作品存证',
        'SOURCE_TYPE': '原产地存证'
    }

    useEffect(() => {
        getAllByCondition({page: 1, size: 4}).then((res) => {
            setWorksList(res.data.records)
        }).catch((res) => {
            if (res.responseCode==='_501') {
                message.warning('登录已过期')
                history.push('/login')
            } else {
                message.warning(res.errorMsg)
            }
        })
    }, [getAllByCondition, history])

    const handelClickListItme = (id) => {
        history.push(`/worksdetail?id=${id}`)
    }

    const handelClickModal = (type) => {
        if (type==='lianbo') {
            setComponyMadal(initialState)
            setModal1(true)
        }
        if (type==='hengdao') {
            setComponyMadal(initialState1)
            setModal1(true)
        }
    }

    const handelClickService = (type) => {
        if (type==='ziyuan') {
            setServiceModal(ziyuanservice)
            setModal2(true)
        }
        if (type==='fuwu') {
            setServiceModal(initialservice)
            setModal2(true)
        }
        if (type==='xueshu') {
            setServiceModal(xueshu)
            setModal2(true)
        }
    }

    const handelClickCopyright = (type) => {
        if (type==='banquan') {
            setCopyrightModal(banquan)
            setModal3(true)
        }
        if (type==='shangbiao') {
            setCopyrightModal(shangbiao)
            setModal3(true)
        }
        if (type==='jishu') {
            setCopyrightModal(jishu)
            setModal3(true)
        }
        if (type==='yuanchandi') {
            setCopyrightModal(yuanchandi)
            setModal3(true)
        }
        if (type==='chuantong') {
            setCopyrightModal(chuantong)
            setModal3(true)
        }
    }

    const getImageList = (list) => {
        if (list) {
            const newArr = list.split(",")
            if (newArr) return newArr[0]
            else return list
        }
    }

    const handelClickCopyAdress = (adress) => {
        copy(adress)
        message.success('复制成功')
    }

    const top = (
        <div className="h5_home_top_content">
            <div className="h5_home_top_title">至泰链原创认证平台</div>
            <div className="h5_home_top_desc">区块链存证 • 公平 • 专业 • 不可篡改</div>
        </div>
    )

    const service = (
        <div className="h5_home_service_box">
            <div className="h5_home_service_box_top flex-column-center-center">
                <div className="h5_home_certification_title_desc">多种认证服务</div>
                <div className="h5_home_certification_line"></div>
            </div>
            <div className="h5_home_service_box_services flex-between-center flex-wrap">
                <div className="h5_home_service_box_services_item flex-column-center-center" onClick={() => handelClickCopyright('banquan')}>
                    <div className="h5_home_service_box_services_item_img">
                        <img src={require('src/images/h5_service_banquan.png')} alt=""/>
                    </div>
                    <div className="h5_home_service_box_services_item_title">版权认证</div>
                    <div className="h5_home_service_box_services_item_desc">包含文字作品，音乐舞蹈，美术，建筑，电影模型，计算机软件等作品</div>
                </div>
                <div className="h5_home_service_box_services_item flex-column-center-center" onClick={() => handelClickCopyright('shangbiao')}>
                    <div className="h5_home_service_box_services_item_img">
                        <img src={require('src/images/h5_service_shangbiao.png')} alt=""/>
                    </div>
                    <div className="h5_home_service_box_services_item_title">商标与商号认证</div>
                    <div className="h5_home_service_box_services_item_desc">保全所有人在商标经核准注册前使用该商标的事实</div>
                </div>
                <div className="h5_home_service_box_services_item flex-column-center-center" onClick={() => handelClickCopyright('jishu')}>
                    <div className="h5_home_service_box_services_item_img">
                        <img src={require('src/images/h5_service_jishu.png')} alt=""/>
                    </div>
                    <div className="h5_home_service_box_services_item_title">技术成果认证</div>
                    <div className="h5_home_service_box_services_item_desc">技术成功和发明专利进行认证，可以确保该发明的排他权</div>
                </div>
                <div className="h5_home_service_box_services_item flex-column-center-center" onClick={() => handelClickCopyright('yuanchandi')}>
                    <div className="h5_home_service_box_services_item_img">
                        <img src={require('src/images/h5_service_yuanchandi.png')} alt=""/>
                    </div>
                    <div className="h5_home_service_box_services_item_title">原产地认证</div>
                    <div className="h5_home_service_box_services_item_desc">确定商品原产地的资料和信息</div>
                </div>
                <div className="h5_home_service_box_services_item flex-column-center-center" onClick={() => handelClickCopyright('chuantong')}>
                    <div className="h5_home_service_box_services_item_img">
                        <img src={require('src/images/h5_service_chuantong.png')} alt=""/>
                    </div>
                    <div className="h5_home_service_box_services_item_title">传统文化保护与认证</div>
                    <div className="h5_home_service_box_services_item_desc">通过图像和摄影资料将传统文化进行保护和认证</div>
                </div>
                <div className="h5_home_service_box_services_item flex-column-center-center">
                    <div className="h5_home_service_box_services_item_img">
                        <img src={require('src/images/h5_service_jingqing.png')} alt=""/>
                    </div>
                    <div className="h5_home_service_box_services_item_title">敬请期待</div>
                    <div className="h5_home_service_box_services_item_desc">之后将会开放更多的认证和保护模块</div>
                </div>
            </div>
        </div>
    )

    const workslist = (
        <div className="h5_home_works_box">
            <div className="h5_home_works_box_top flex-column-center-center">
                <div className="h5_home_works_title_desc">公开作品展示</div>
                <div className="h5_home_works_line"></div>
            </div>
            <div className="h5_home_works_box_workslist flex-between-center flex-wrap">
                {
                    worksList&& worksList.map((item) => {
                        return (
                            <div className="h5_works_item_box flex-column-center curser-pointer" key={item.id} onClick={() => handelClickListItme(item.id)}>
                                <div className="h5_works_item_image flex-center-center">
                                    <img src={getImageList(item.productionCheck)} alt=""/>
                                </div>
                                <div className="flex-between-center mt-15">
                                    <div className="color-main h5_works_item_name text-overflow">《{item.productionName}》</div>
                                    <div className="color-secondry h5_works_item_date">{dayjs(item.createDate).format('YYYY-MM-DD')}</div>
                                </div>
                                <div className="flex-start">
                                    {/* <div className="color-secondry ft-size-14">#原创新衣#</div> */}
                                    <div className="color-secondry h5_works_item_tag">#{copyrightRegister[item.copyrightRegister]}#</div>
                                </div>
                                <div className="color-secondry h5_works_item_tag text-overflow">哈希：{item.messageChainHash}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

    const advantage = (
        <div className="h5_home_advantage">
            <div className="h5_home_advantage_top flex-column-center-center">
                <div className="h5_home_advantage_title_desc">平台优势</div>
                <div className="h5_home_advantage_line"></div>
            </div>
            <div className="h5_home_advantage_list flex-column-center-center">
                <div className="h5_home_advantage_list_item flex-center-center" onClick={() => handelClickService('ziyuan')}>
                    <img src={require('src/images/h5_advantage_ziyuan.png')} alt=""/>
                    <div className="h5_home_advantage_list_item_name">资源整合与专业服务优势</div>
                </div>
                <div className="h5_home_advantage_list_item flex-center-center" onClick={() => handelClickService('fuwu')}>
                    <img src={require('src/images/h5_advantage_fuwu.png')} alt=""/>
                    <div className="h5_home_advantage_list_item_name">服务权威性与服务全面性优势</div>
                </div>
                <div className="h5_home_advantage_list_item flex-center-center" onClick={() => handelClickService('xueshu')}>
                    <img src={require('src/images/h5_advantage_xueshu.png')} alt=""/>
                    <div className="h5_home_advantage_list_item_name">学术研究与实战经验优势</div>
                </div>
            </div>
        </div>
    )

    const process = (
        <div className="h5_home_process">
            <div className="h5_home_process_top flex-column-center-center">
                <div className="h5_home_process_title_desc">认证流程</div>
                <div className="h5_home_process_line"></div>
            </div>
            <div className="h5_home_process_content flex-column-around-center">
                <div className="h5_home_process_step flex-start-end">
                    <img className="h5_home_process_step_img" src={require('src/images/h5_process_step3.png')} alt=""/>
                    <div className="h5_home_process_step_title flex-between-center flex-1">
                        <div className="flex-column-start">
                            <div className="h5_home_process_step_name">上传作品信息</div>
                            <div className="h5_home_process_step_desc">原创创作者将作品信息上传至平台</div>
                        </div>
                        <div className="h5_home_process_step_step">01</div>
                    </div>
                </div>
                <div className="h5_home_process_step flex-start-end">
                    <img className="h5_home_process_step_img" src={require('src/images/h5_process_step3.png')} alt=""/>
                    <div className="h5_home_process_step_title flex-between-center flex-1">
                        <div className="flex-column-start">
                            <div className="h5_home_process_step_name">有效性检测</div>
                            <div className="h5_home_process_step_desc">平台对作品进行有效性检测</div>
                        </div>
                        <div className="h5_home_process_step_step">02</div>
                    </div>
                </div>
                <div className="h5_home_process_step flex-start-end">
                    <img className="h5_home_process_step_img" src={require('src/images/h5_process_step3.png')} alt=""/>
                    <div className="h5_home_process_step_title flex-between-center flex-1">
                        <div className="flex-column-start">
                            <div className="h5_home_process_step_name">登记信息上链</div>
                            <div className="h5_home_process_step_desc">检测后将作品和创作者信息登记上链</div>
                        </div>
                        <div className="h5_home_process_step_step">03</div>
                    </div>
                </div>
                <div className="h5_home_process_step flex-start-end">
                    <img className="h5_home_process_step_img" src={require('src/images/h5_process_step3.png')} alt=""/>
                    <div className="h5_home_process_step_title flex-between-center flex-1">
                        <div className="flex-column-start">
                            <div className="h5_home_process_step_name">登记证书</div>
                            <div className="h5_home_process_step_desc">登记完成后平台将会给创作者发放证书</div>
                        </div>
                        <div className="h5_home_process_step_step">04</div>
                    </div>
                </div>
                <div className="h5_home_process_step flex-start-end">
                    <img className="h5_home_process_step_img" src={require('src/images/h5_process_step3.png')} alt=""/>
                    <div className="h5_home_process_step_title flex-between-center flex-1">
                        <div className="flex-column-start">
                            <div className="h5_home_process_step_name">官方确认信</div>
                            <div className="h5_home_process_step_desc">官方确认所有信息无误，流程结束</div>
                        </div>
                        <div className="h5_home_process_step_step">05</div>
                    </div>
                </div>
            </div>
        </div>
    )

    const templete = (
        <div className="h5_home_templete">
            <div className="h5_home_templete_top flex-column-center-center">
                <div className="h5_home_templete_title_desc">证书模板</div>
                <div className="h5_home_templete_line"></div>
            </div>
            <div className="flex-center-center h5_home_templete_temp"></div>
        </div>
    )

    const partner = (
        <div className="h5_home_partner">
            <div className="h5_home_partner_top flex-column-center-center">
                <div className="h5_home_partner_title_desc">合作伙伴</div>
                <div className="h5_home_partner_line"></div>
            </div>
            <div className="h5_home_partner_item_top_one flex-center-center">
                <img src={require('src/images/h5_home_partner_1.png')} alt=""/>
            </div>
            <div className="h5_home_partner_item_top_name text-center">链博科技</div>
            <div className="h5_home_partner_item_top_desc text-center">业界领先的区块链技术及行业解决方案提供商、区块链+数字生态经济体构建者</div>
            <div className="flex-end h5_home_partner_item_top_more">
                <div className="h5_home_partner_item_top_desc" onClick={() => handelClickModal('lianbo')}>查看详情</div>
                <img src={require('src/images/h5_home_partner_arrow.png')} alt=""/>
            </div>
            <div className="h5_home_partner_item_top_two flex-center-center">
                <img src={require('src/images/h5_home_partner_2.png')} alt=""/>
            </div>
            <div className="h5_home_partner_item_top_name text-center">成都恒道</div>
            <div className="h5_home_partner_item_top_desc text-center">四川省内从业多年具有经验的知识产权代理机构</div>
            <div className="flex-end h5_home_partner_item_top_more">
                <div className="h5_home_partner_item_top_desc" onClick={() => handelClickModal('hengdao')}>查看详情</div>
                <img src={require('src/images/h5_home_partner_arrow.png')} alt=""/>
            </div>
        </div>
    )

    const otherservice = (
        <div className="h5_home_other_service">
            <div className="h5_home_other_service_top flex-column-center-center">
                <div className="h5_home_other_service_title_desc">增值服务</div>
                <div className="h5_home_other_service_line"></div>
            </div>
            <div className="h5_home_other_service_name_box flex-start-center">
                <img src={require('src/images/h5_home_service_quequan.png')} alt=""/>
                <div className="h5_home_other_service_name">确权服务</div>
            </div>
            <div className="h5_home_other_service_desc">
                1、版权登记  根据平台用户需要，帮助用户完成版权登记的全部工作；
            </div>
            <div className="h5_home_other_service_desc">
                2、商标注册  根据平台用户委托，代理用户商标注册申请工作； 
            </div>
            <div className="h5_home_other_service_desc">
                3、其他知识产权确权服务  根据平台用户委托，代理用户其他知识产权的确权服务法律法规另有规定的除外）。
            </div>
            <div className="h5_home_other_service_name_box flex-start-center">
                <img src={require('src/images/h5_home_service_weiquan.png')} alt=""/>
                <div className="h5_home_other_service_name">维权服务</div>
            </div>
            <div className="h5_home_other_service_desc">
                1、取证服务  根据平台用户申请，为用户提供作品的存证证明的法律证据；
            </div>
            <div className="h5_home_other_service_desc">
                2、公证服务  根据平台用户申请，由本平台合作的公证机关为用户提供作品的公证服务；
            </div>
            <div className="h5_home_other_service_desc">
                3、权益保护  根据平台用户需要，由本平台法律顾问为用户提供诉讼代理、调解等法律服务。
            </div>
            <div className="h5_home_other_service_name_box flex-start-center">
                <img src={require('src/images/h5_home_service_yunying.png')} alt=""/>
                <div className="h5_home_other_service_name">运营服务</div>
            </div>
            <div className="h5_home_other_service_desc">
                利用本平台的展示交易功能，为用户提供作品相关知识产权转让与许可、知识产权评估及质押融资等知识产权运营服务。
            </div>
            <div className="h5_home_other_service_name_box flex-start-center">
                <img src={require('src/images/h5_home_service_guanli.png')} alt=""/>
                <div className="h5_home_other_service_name">管理服务</div>
            </div>
            <div className="h5_home_other_service_desc">
                为平台用户提供知识产权托管、知识产权贯标、知识产权战略、知识产权咨询等企业知识产权管理服务。
            </div>
            <div className="h5_home_other_service_name_box flex-start-center">
                <img src={require('src/images/h5_home_service_qita.png')} alt=""/>
                <div className="h5_home_other_service_name">其他服务</div>
            </div>
            <div className="h5_home_other_service_desc">
                利用平台整合服务资源的优势，为平台用户提供项目申报、管理咨询等其他相关服务。
            </div>
        </div>
    )

    const footer = (
        <div className="h5_footer">
            <div className="flex-column-center-center h5_footer_top">
                <img src={require('src/images/h5_home_qrcode.png')} alt=""/>
                <div className="h5_footer_top_title">详情请扫码咨询</div>
            </div>
            <div className="h5_home_other_service_desc h5_footer_top_title_top">
                如果您有任何需要咨询和帮助的都可以和我们联系，我们7x24小时为您服务!
            </div>
            <div className="h5_home_other_service_desc">
                联系电话：
            </div>
            <div className="h5_home_other_service_desc">
                028-83176307
            </div>
            <div className="h5_home_other_service_desc">
                15281035712（雷琴)
            </div>
            <div className="h5_home_other_service_desc">
                15002804663（钟玄）
            </div>
        </div>
    )

    const componyModal1 = (
        <Modal
          visible={modal1}
          className="h5_compony_mmodal"
          maskClosable={true}
          onCancel={() => setModal1(false)}
          centered={true}
        >
          <div className="compony_modal_content flex-column-center-center">
              <img className={componyMadal.img} src={require(`src/images/${componyMadal.img}.png`)} alt=""/>
              <div className="compony_modal_name">{componyMadal.name}</div>
              <div className="compony_modal_desc">
                {componyMadal.desc}
              </div>
          </div>
        </Modal>
    )

    const servicemodal = (
        <Modal
          visible={modal2}
          className="h5_compony_mmodal"
          maskClosable={true}
          onCancel={() => setModal2(false)}
          centered={true}
        >
          <div className="service_modal_content flex-column-center-center">
              <div className="flex-start">
                <img src={require(`src/images/${serviceModal.img}.png`)} alt=""/>
                <div className="compony_modal_name">{serviceModal.name}</div>
              </div>
              <div className="compony_modal_desc">
                {serviceModal.desc}
              </div>
          </div>
        </Modal>
    )

    const copyrightmodal = (
        <Modal
          visible={modal3}
          className="h5_compony_mmodal"
          maskClosable={true}
          onCancel={() => setModal3(false)}
          centered={true}
        >
          <div>
            <div className="copyright_modal_content flex-column-center-center">
                <img src={require(`src/images/${copyrightModal.img}.png`)} alt=""/>
                <div className="compony_modal_name">{copyrightModal.name}</div>
                <div className="compony_modal_desc">
                    {copyrightModal.desc}
                </div>
            </div>
            <div className="flex-column copyright_modal_content">
                <div className="compony_modal_desc compony_modal_adress_title">认证地址：</div>
                <div className="compony_modal_adress">
                    {copyrightModal.address}
                    <img onClick={() => handelClickCopyAdress(copyrightModal.address)} className="compony_modal_adress_copy" src={require('src/images/h5_modal_copy.png')} alt=""/>
                </div>
            </div>
          </div>
        </Modal>
    )

    return (
        <div>
            <Header title={'首页'}/>
            {
                top
            }
            {
                service
            }
            {
                worksList.length>0&&workslist
            }
            {
                advantage
            }
            {
                process
            }
            {
                templete
            }
            {
                partner
            }
            {
                otherservice
            }
            {
                footer
            }
            {
                componyModal1
            }
            {
                servicemodal
            }
            {
                copyrightmodal
            }
        </div>
    )
}
