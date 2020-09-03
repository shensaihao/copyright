import React, {useState} from 'react';
import Slider from "react-slick";
import { useHistory } from 'react-router-dom'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import cs from 'classnames'

export default function Home() {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const [isDetail1Open, setIsDetail1Open] = useState(false)
    const [isDetail2Open, setIsDetail2Open] = useState(false)
    const [isHover, setIsHover] = useState(false)

    const history = useHistory()

    function handelClickGotoWorks (type) {
        if (type) {
            history.push(`/works?type=${type}`)
        }
    }


    const HomeHeader = (
        <div className="home_header">
            <div className="home_header_search flex-between-center">
                <img src={require('src/images/home_logo.png')} alt=""/>
                <div className="home_header_search_input flex-start pl-10">
                    <img src={require('src/images/home_search_icon.png')} alt=""/>
                    <input type="text" className="home_search_input ml-10"/>
                </div>
            </div>
            <div className="home_header_banner flex-between-center">
                <div className="home_header_banner_name">
                    <img src={require('src/images/home_name.png')} alt=""/>
                    <div className="home_header_banner_name_title">区块链存证 • 公平 • 专业 • 不可篡改</div>
                </div>
                <div className="home_header_banner_user">
                    <div className="home_header_banner_user_bg">
                        <div className="home_header_user_logout">退出登录</div>
                        <div className="flex-center-center font-weight-bold ft-size-20 color-main mb-10">
                            <span className="font-main ft-size-24 mr-10">23</span>件作品已认证
                        </div>
                        <div className="flex-center-center font-weight-bold ft-size-20 color-main">
                            <span className="font-main ft-size-24 mr-10">23</span>家企业已加入认证
                        </div>
                    </div>
                    <div className="home_header_banner_user_modify flex-column-center-center">
                        <div className="home_header_certificationome_btn">实名认证</div>
                        <div className="home_header_user_cneter">个人中心</div>
                    </div>
                </div>
            </div>
        </div>
    )

    const CertificationServices = (
        <div className="home_certification">
            <div className="home_certification_title flex-column-center-center">
                <div className="home_certification_title_name">多种认证服务</div>
                <div className="home_certification_title_desc mt-10">平台为您提供多种认证服务，所有认证信息均在区块链上进行登记</div>
                <div className="home_certification_line"></div>
            </div>
            <div className="flex-between-center home_certification_more_more_box">
                <div></div>
                <div className="home_certification_more">查看更多</div>
            </div>
            <div className="home_certification_swiper">
                <div className="flex-between-center">
                    <div className="slide_banquan">
                        <div className="slide_item_normal mr-20  flex-column-center-center">
                            <img className="slide_item_normal_img mb-20" src={require('src/images/banquan_logo.png')} alt=""/>
                            <div className="slide_item_normal_title mb-15">版权认证</div>
                            <div className="slide_item_normal_lable mb-15 text-center">包含文字作品，音乐舞蹈，美术，建筑，电影模型，计算机软件等作品。</div>
                            <div className="slide_item_normal_line mb-20"></div>
                            <div className="slide_item_normal_btn flex-center-center">去认证</div>
                        </div>
                        <div className="slide_item_big mr-20">
                            <div className="flex-start">
                                <img className="slide_item_normal_img mb-20" src={require('src/images/home_slide_item_banquan.png')} alt=""/>
                                <div className="slide_item_normal_title mb-15">版权认证</div>
                            </div>
                            <div className="slide_item_normal_lable mb-35  text-center">
                                将文字、口述、音乐、戏剧、曲艺、舞蹈、杂技、美术、建筑类、摄影、电影、图形、模型、计算机软件等其他作品，
                                通过至泰链平台进行保存并盖时间擢。
                                全部操作均通过互联网完成，用户足不出户即可提取有效维权证据。
                                节省了律师取证、公证处公证、真实无篡改鉴定等各种耗费大量人力物力的线下过程。
                            </div>
                            <div className="slide_item_normal_line mb-20"></div>
                            <div className="slide_item_normal_btn flex-center-center curser-pointer" onClick={() => handelClickGotoWorks('copyright')}>去认证</div>
                        </div>
                    </div>
                    <div className="slide_shangbiao">
                        <div className="slide_item_normal mr-20 slide_shangbiao_hover flex-column-center-center">
                            <img className="slide_item_normal_img mb-20" src={require('src/images/shangbiao_logo.png')} alt=""/>
                            <div className="slide_item_normal_title mb-15">商标与商号认证</div>
                            <div className="slide_item_normal_lable mb-15 text-center">保全所有人在商标经核准注册前使用该商标的事实。</div>
                            <div className="slide_item_normal_line mb-20"></div>
                            <div className="slide_item_normal_btn flex-center-center">去认证</div>
                        </div>
                        <div className="slide_item_big mr-20">
                            <div className="flex-start">
                                <img className="slide_item_normal_img mb-20" src={require('src/images/home_slide_item_banquan.png')} alt=""/>
                                <div className="slide_item_normal_title mb-15">商标与商号认证</div>
                            </div>
                            <div className="slide_item_normal_lable mb-35  text-center">
                                注册商标所有人可从平台提取认证后的证书，以证书上的时间证明其在先使用，以对抗注册商标专有权人，
                                达到在原使用范围内继续使用该商标的目的。
                                即将申请注册的商标与商号上传平台，由平台对上传的商标与商号进行认证，
                                确认所有人使用该商标与商号的时间，固化保全所有人在商标经核准注册前使用该商标的事实。
                            </div>
                            <div className="slide_item_normal_line mb-20"></div>
                            <div className="slide_item_normal_btn flex-center-center curser-pointer" onClick={() => handelClickGotoWorks('trademark')}>去认证</div>
                        </div>
                    </div>
                    <div className="slide_jishu">
                        <div className="slide_item_normal mr-20 slide_jishu_hover flex-column-center-center">
                            <img className="slide_item_normal_img mb-20" src={require('src/images/jishu_logo.png')} alt=""/>
                            <div className="slide_item_normal_title mb-15">技术成果认证</div>
                            <div className="slide_item_normal_lable mb-15 text-center">技术成功和发明专利进行认证，可以确保该发明的排他权。</div>
                            <div className="slide_item_normal_line mb-20"></div>
                            <div className="slide_item_normal_btn flex-center-center">去认证</div>
                        </div>
                        <div className="slide_item_big mr-20">
                            <div className="flex-start">
                                <img className="slide_item_normal_img mb-20" src={require('src/images/home_slide_item_banquan.png')} alt=""/>
                                <div className="slide_item_normal_title mb-15">技术成果认证</div>
                            </div>
                            <div className="slide_item_normal_lable mb-35  text-center">
                                将一项发明向公众公开以阻止别人对其申请专利。这可以确保任何人都不会再获得该项发明的排他权，从而为所有的人都提供了一定的运作自由，
                                进行防御性公开时一定要注意在有可能被专利审查员审查将来的专利申请时作为检索文献的受到广泛承认的技术性杂志或出版物上公开。
                                通过上传平台存证、认证，从而实现相应成果的前置保护。
                            </div>
                            <div className="slide_item_normal_line mb-20"></div>
                            <div className="slide_item_normal_btn flex-center-center curser-pointer" onClick={() => handelClickGotoWorks('technology')}>去认证</div>
                        </div>
                    </div>
                    <div className={cs('slide_yuanchandi',{'display-none':isHover,'display-block':!isHover} )} >
                        <div className="slide_item_normal mr-20 flex-column-center-center">
                            <img className="slide_item_normal_img mb-20" src={require('src/images/yuanchandi_logo.png')} alt=""/>
                            <div className="slide_item_normal_title mb-15">原产地认证</div>
                            <div className="slide_item_normal_lable mb-35  text-center">确定商品原产地的资料和信息。</div>
                            <div className="slide_item_normal_line mb-20"></div>
                            <div className="slide_item_normal_btn flex-center-center">去认证</div>
                        </div>
                        <div className="slide_item_big mr-20">
                            <div className="flex-start">
                                <img className="slide_item_normal_img mb-20" src={require('src/images/home_slide_item_banquan.png')} alt=""/>
                                <div className="slide_item_normal_title mb-15">原产地认证</div>
                            </div>
                            <div className="slide_item_normal_lable mb-35  text-center">
                                由用户上传与商品原产地相关的系列影像资料，
                                平台对资料进行认证，并提供认证证书，标注该商品源于某一特定地点。用于确定商品原产地的资料和信息。
                            </div>
                            <div className="slide_item_normal_line mb-20"></div>
                            <div className="slide_item_normal_btn flex-center-center curser-pointer" onClick={() => handelClickGotoWorks('origin')}>去认证</div>
                        </div>
                    </div>
                    
                    <div className="slide_chuangtong" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                        <div className="slide_item_normal flex-column-center-center">
                            <img className="slide_item_normal_img mb-20" src={require('src/images/chuantong_logo.png')} alt=""/>
                            <div className="slide_item_normal_title mb-15">传统文化保护与认证</div>
                            <div className="slide_item_normal_lable mb-15 text-center">包含文字作品，音乐舞蹈，美术，建筑，电影模型，计算机软件等作品。</div>
                            <div className="slide_item_normal_line mb-20"></div>
                            <div className="slide_item_normal_btn flex-center-center">去认证</div>
                        </div>
                        <div className="slide_item_big mr-20">
                            <div className="flex-start">
                                <img className="slide_item_normal_img mb-20" src={require('src/images/home_slide_chuantong.png')} alt=""/>
                                <div className="slide_item_normal_title mb-15">传统文化保护与认证</div>
                            </div>
                            <div className="slide_item_normal_lable mb-25">
                                我国现有的法律制度没有全面涵盖传统知识的保护，传统知识因缺乏必要保护方面的制度设计与技术策略，
                                常常面临尴尬境地。在平台建立和开通我国传统知识网络认证板块，由申请人自愿申请传统知识和民间文学艺术作品权利人认证。
                                经过平台认证后，申请人所拥有的传统知识可以获得纳入传统知识基因库的资格，
                                确保其有关权利的实现与转化，并获得必要的人身权与惠益分享等财产权。
                            </div>
                            <div className="slide_item_normal_line mb-20"></div>
                            <div className="slide_item_normal_btn flex-center-center curser-pointer" onClick={() => handelClickGotoWorks('tradition')}>去认证</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    const WorksList = (
        <div className="home_works">
            <div className="home_works_title flex-column-center-center">
                <div className="home_works_title_name">作品展示</div>
                <div className="home_works_title_desc mt-10">平台已认证作品展示</div>
                <div className="home_works_line"></div>
            </div>
            <div className="home_works_swiper">
                <Slider {...settings}>
                    <div className="home_works_box">
                        <div className="home_works_item"></div>
                    </div>
                    <div className="home_works_box">
                        <div className="home_works_item"></div>
                    </div>
                    <div className="home_works_box">
                        <div className="home_works_item"></div>
                    </div>
                </Slider>
            </div>
        </div>
    )

    const PlatformAdvantage = (
        <div className="home_advantage">
            <div className="home_advantage_temp">
                <div className="font-weight ft-size-32 color-main home_advantage_title">
                    平台优势
                </div>
                <div className="home_advantage_desc">
                    <div className="color-secondry ft-size-16">专业，高效，权威的原创认证平台</div>
                    <div className="home_advantage_line"></div>
                </div>
            </div>
            <div className="home_advantage_box">
                <div className="home_advantage_box_item home_advantage_box_item_ziyuan flex-column-center-center mb-20">
                    <div className="flex-start">
                        <img src={require('src/images/home_advantage_ziyuan_before.png')} className="home_advantage_box_item_ziyuan_before_img" alt=""/>
                        <img src={require('src/images/home_advantage_ziyuan_after.png')} className="home_advantage_box_item_ziyuan_after_img" alt=""/>
                        <div className="ml-30 ft-size-20 font-weight color-main home_advantage_box_item_ziyuan_title">资源整合与专业服务优势</div>
                    </div>
                    <div className="ft-size-14 color-white home_advantage_box_item_ziyuan_after">
                        “至泰链”原创认证服务平台由链博(成都)科技有限公司、成都恒道知识产权与科技创新研究院等单位联合打造病负责运营，其中，链博(成都)科技有限公司负责平台的技术服务支持，
                        成都恒道知识产权与科技创新研究院负责专业服务支持；此外，平台还组建国一支运营团队，联合平台各方资源，为用户提供专业化服务。
                    </div>
                </div>
                <div className="home_advantage_box_item home_advantage_box_item_quanwei flex-column-center-center mb-20">
                    <div className="flex-start">
                        <img src={require('src/images/home_advantage_quanwei_before.png')} className="home_advantage_box_item_quanwei_before_img" alt=""/>
                        <img src={require('src/images/home_advantage_quanwei_after.png')} className="home_advantage_box_item_quanwei_after_img" alt=""/>
                        <div className="ml-30 ft-size-20 font-weight color-main home_advantage_box_item_quanwei_title">服务权威性与服务全面性优势</div>
                    </div>
                    <div className="ft-size-14 color-white home_advantage_box_item_quanwei_after">
                        平台以时间戳技术、数字签名、哈希等数字认证方式，实时保存创作过程和结果，将原创作品作为证据固化保全，形成严谨的证据链，
                        为创作者提供维权时作为司法采集的电子证据。平台通过了国家工信部的相关备案和认证，具有高度的权威性。
                        在服务方面，平台致力于知识产权确权、维权、用权的全链条服务，同时，平台还整合企业管理咨询、法律服务等资源，为用户提供全方位、一站式服务，助力企业发展。
                    </div>
                </div>
                <div className="home_advantage_box_item home_advantage_box_item_xueshu flex-column-center-center">
                    <div className="flex-start home_advantage_box_item_xueshu_before">
                        <img src={require('src/images/home_advantage_xueshu_before.png')} className="home_advantage_box_item_xueshu_before_img" alt=""/>
                        <img src={require('src/images/home_advantage_xueshu_after.png')} className="home_advantage_box_item_xueshu_after_img" alt=""/>
                        <div className="ml-30 ft-size-20 font-weight color-main home_advantage_box_item_xueshu_title">学术研究与实战经验优势</div>
                    </div>
                    <div className="ft-size-14 color-white home_advantage_box_item_xueshu_after">
                        平台以时间戳技术、数字签名、哈希等数字认证方式，实时保存创作过程和结果，将原创作品作为证据固化保全，
                        形成严谨的证据链，为创作者提供维权时作为司法采集的电子证据。平台通过了国家工信部的相关备案和认证，
                        具有高度的权威性。在服务方面，平台致力于知识产权确权、维权、用权的全链条服务，同时，
                        平台还整合企业管理咨询、法律服务等资源，为用户提供全方位、一站式服务，助力企业发展。
                    </div>
                </div>
            </div>
        </div>
    )

    const CertificationProcess = (
        <div className="home_process">
            <div className="home_process_title flex-column-center-center">
                <div className="home_process_title_name">认证流程</div>
                <div className="home_process_title_desc mt-10">简约高效的认证流程为您省时省力</div>
                <div className="home_process_line"></div>
            </div>
            <div className="flex-column-center">
                <div className="home_process_step flex-around-center">
                    <img src={require('src/images/home_process_1.png')} alt=""/>
                    <img src={require('src/images/home_process_2.png')} alt=""/>
                    <img src={require('src/images/home_process_3.png')} alt=""/>
                    <img src={require('src/images/home_process_4.png')} alt=""/>
                    <img src={require('src/images/home_process_5.png')} alt=""/>
                </div>
                <div className="home_step_title_box flex-around-center">
                    <div className="home_process_title">上传作品信息</div>
                    <div className="home_process_title">有效性检测</div>
                    <div className="home_process_title">登记信息上链</div>
                    <div className="home_process_title">登记证书</div>
                    <div className="home_process_title">官方确认信息</div>
                </div>
            </div>
        </div>
    )

    const CertificateTemplate = (
        <div className="home_templete">
            <div className="home_templete_box"></div>
            <div className="home_templete_temp">
                <div className="font-weight ft-size-32 color-main home_templete_title">
                    证书模板
                </div>
                <div className="home_templete_desc">
                    <div className="color-secondry ft-size-16">认证完成后您将获得我们为您准备的证书</div>
                    <div className="home_templete_line"></div>
                </div>
            </div>
        </div>
    )

    const CooperativePartner = (
        <div className="home_partner">
            <div className="home_partner_title">合作伙伴</div>
            <div className="home_partner_lable">强有力的合作伙伴为我们加油助益</div>
            <div className="home_partner_line"></div>
            <div className="flex-column-between-center">
                <div className="flex-between mt-40">
                    <div className="home_partner_item">
                        <div className="home_partner_item_name">
                            链博科技
                        </div>
                        {
                            !isDetail1Open ? 
                            <div className="home_partner_lable">
                                成立于2018年3月，是业界领先的区块链技术及行业解决方案提供商、区块链+数字生态经济体构建者，
                                拥有一支研究前沿、技术扎实、商业敏锐、执行力强、迭代高效的实战型团队......
                            </div>
                            :
                            <div className="home_partner_lable">
                                成立于2018年3月，是业界领先的区块链技术及行业解决方案提供商、区块链+数字生态经济体构建者，
                                拥有一支研究前沿、技术扎实、商业敏锐、执行力强、迭代高效的实战型团队，在公链、联盟链、BaaS、
                                跨链、共识算法、智能合约、数字钱包、资产交易、隐私保护等区块链以及大数据和机器学习领域拥有全栈技术能力和经验，
                                为客户提供产业和商业数字化的底层技术解决方案和系统集成服务，帮助客户打造基于区块链的自主可控、安全高效、易用可拓展的数字化平台，
                                并以商业模式创新帮助客户进行业务创新和产业升级。 成立以来，
                                链博科技已陆续为来自金融、供应链、溯源、大数据、医疗、教育、网络游戏、电子商务等不同方向的二十多家企事业单位提供区块链解决方案，
                                成为业内具备全栈链改技术和商业解决方案设计的引领者。
                            </div>
                        }
                        
                        <div className="flex-end curser-pointer">
                            {
                                !isDetail1Open ? 
                                <>
                                    <div className="ft-size-14 color-white mr-5" onClick={() => setIsDetail1Open(true)}>展开</div>
                                    <img src={require('src/images/home_open_icon.png')} alt=""/>
                                </>
                                
                                :
                                <>
                                    <div className="ft-size-14 color-white mr-5" onClick={() => setIsDetail1Open(false)}>收起</div>
                                    <img src={require('src/images/home_open_icon.png')} className="is-rotate" alt=""/>
                                </>
                            }
                            
                        </div>
                    </div>
                    <div className="home_partner_item_logo flex-center-center ml-60">
                        <img src={require('src/images/chainboard_logo.png')} alt=""/>
                    </div>
                </div>
                <div className="flex-between-center mt-40">
                    <div className="home_partner_item">
                        <div className="home_partner_item_name">
                        成都恒道
                        </div>
                        {
                            !isDetail2Open ? 
                            <div className="home_partner_lable">
                                成立于2015年9月，由四川省内从业多年具有经验的知识产权代理机构作为发起人，
                                在国家相关部门登记注册并拥有独立法人资格的民办非营利性研究机构。研究院聚集一批在知识产权战......
                            </div>
                            :
                            <div className="home_partner_lable">
                                成立于2015年9月，由四川省内从业多年具有经验的知识产权代理机构作为发起人，
                                在国家相关部门登记注册并拥有独立法人资格的民办非营利性研究机构。研究院聚集一批在知识产权战略理论与实务方面造诣很高的权威专家，
                                组建具有高水准的研究团队。
                                在承担知识产权与科技创新研究的同时，研究院还开展了知识产权战略规划、知识产权预警、知识产权管理等与知识产权相关的实务工作。
                            </div>
                        }
                        <div className="flex-end curser-pointer">
                            {
                                !isDetail2Open ?
                                <>
                                    <div className="ft-size-14 color-white mr-5" onClick={() => setIsDetail2Open(true)}>展开</div>
                                    <img src={require('src/images/home_open_icon.png')} alt=""/>
                                </>
                                :
                                <>
                                    <div className="ft-size-14 color-white mr-5" onClick={() => setIsDetail2Open(false)}>收起</div>
                                    <img src={require('src/images/home_open_icon.png')} className="is-rotate" alt=""/>
                                </>
                            }
                            
                        </div>
                    </div>
                    <div className="home_partner_hengdao_logo flex-center-center ml-60">
                        <img src={require('src/images/hengdao_logo.png')} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )

    const serviseSetting = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    const ValueAddedServices = (
        <div className="home_services">
            <div className="home_services_title flex-column-center-center">
                <div className="home_services_title_name">多种认证服务</div>
                <div className="home_services_title_desc mt-10">平台为您提供多种认证服务，所有认证信息均在区块链上进行登记</div>
                <div className="home_services_line"></div>
            </div>
            <div className="home_services_swiper">
                <Slider {...serviseSetting}>
                    <div className="home_services_box">
                        <img className="home_services_item_left" src={require('src/images/home_service_left.png')} alt=""/>
                        <div className="flex-column-center-center">
                            <div className="flex-start mb-10 mt-36">
                                <img className="home_service_item_icon mr-10" src={require('src/images/service_quequan.png')} alt=""/>
                                <div className="home_service_item_title">确权服务</div>
                            </div>
                            <div className="home_service_item_desc">1、版权登记  根据平台用户需要，帮助用户完成版权登记的全部工作；</div>
                            <div className="home_service_item_desc"> 2、商标注册  根据平台用户委托，代理用户商标注册申请工作；</div>
                            <div className="home_service_item_desc">3、其他知识产权确权服务  根据平台用户委托，代理用户其他知识产权的确权服务法律法规另有规定的除外）。</div>
                        </div>
                        <img className="home_services_item_right" src={require('src/images/home_service_right.png')} alt=""/>
                    </div>
                    <div className="home_services_box">
                        <img className="home_services_item_left" src={require('src/images/home_service_left.png')} alt=""/>
                        <div className="flex-column-center-center">
                            <div className="flex-start mb-10 mt-36">
                                <img className="home_service_item_icon mr-10" src={require('src/images/service_weiquan.png')} alt=""/>
                                <div className="home_service_item_title">维权服务</div>
                            </div>
                            <div className="home_service_item_desc">1、取证服务  根据平台用户申请，为用户提供作品的存证证明的法律证据；</div>
                            <div className="home_service_item_desc"> 2、公证服务  根据平台用户申请，由本平台合作的公证机关为用户提供作品的公证服务；</div>
                            <div className="home_service_item_desc">3、权益保护  根据平台用户需要，由本平台法律顾问为用户提供诉讼代理、调解等法律服务。</div>
                        </div>
                        <img className="home_services_item_right" src={require('src/images/home_service_right.png')} alt=""/>
                    </div>
                    <div className="home_services_box">
                        <img className="home_services_item_left" src={require('src/images/home_service_left.png')} alt=""/>
                        <div className="flex-column-center-center">
                            <div className="flex-start mb-10 mt-36">
                                <img className="home_service_item_icon mr-10" src={require('src/images/service_yunying.png')} alt=""/>
                                <div className="home_service_item_title">运营服务</div>
                            </div>
                            <div className="home_service_item_desc">利用本平台的展示交易功能，为用户提供作品相关知识产权转让与许可、知识产权评估及质押融资等知识产权运营服务。</div>
                        </div>
                        <img className="home_services_item_right" src={require('src/images/home_service_right.png')} alt=""/>
                    </div>
                    <div className="home_services_box">
                        <img className="home_services_item_left" src={require('src/images/home_service_left.png')} alt=""/>
                        <div className="flex-column-center-center">
                            <div className="flex-start mb-10 mt-36">
                                <img className="home_service_item_icon mr-10" src={require('src/images/service_guanli.png')} alt=""/>
                                <div className="home_service_item_title">管理服务</div>
                            </div>
                            <div className="home_service_item_desc">为平台用户提供知识产权托管、知识产权贯标、知识产权战略、知识产权咨询等企业知识产权管理服务。</div>
                        </div>
                        <img className="home_services_item_right" src={require('src/images/home_service_right.png')} alt=""/>
                    </div>
                    <div className="home_services_box">
                        <img className="home_services_item_left" src={require('src/images/home_service_left.png')} alt=""/>
                        <div className="flex-column-center-center">
                            <div className="flex-start mb-10 mt-36">
                                <img className="home_service_item_icon mr-10" src={require('src/images/service_qita.png')} alt=""/>
                                <div className="home_service_item_title">其他服务</div>
                            </div>
                            <div className="home_service_item_desc">利用平台整合服务资源的优势，为平台用户提供项目申报、管理咨询等其他相关服务。</div>
                        </div>
                        <img className="home_services_item_right" src={require('src/images/home_service_right.png')} alt=""/>
                    </div>
                </Slider>
            </div>
            <div className="flex-center-center">
                <div className="home_services_button">立即登记</div>
            </div>
        </div>
    )

    return (
        <div className="home">
            {
                HomeHeader
            }
            {
                CertificationServices
            }
            {
                WorksList
            }
            {
                PlatformAdvantage
            }
            {
                CertificationProcess
            }
            {
                CertificateTemplate
            }
            {
                CooperativePartner
            }
            {
                ValueAddedServices
            }
        </div>
    )
}
