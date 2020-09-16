import { get, post, postQuery } from '../axios';

export default {


    //---------------------------------------original Controller---------------------------------------

    /**
    * 新建实名认证
    * 
    */
    postIdentificationCreate: (data) => post(`/v1/identification/create`, data),

    /**
     * 查询实名认证信息
     */
    getIdentificationInfo: () => get(`/v1/identification/findByUser`),

    /**
     * 上传文件
     * 
     */
    postFileUpload: (data) => post(`/v1/files/fileUpload`, data),

    /**
     * 作品原创登记
     * 
     */
    postOriginalCopyrightCreate: (data) => get(`/v1/originalCopyright/create`, data),

    /**
     * 获取短信验证码
     * 
     */
    getAuthMessageSmsCaptcha: (data) => get(`/v1/user/sendVerificationCode`, data),
    
    /**
     * 查询手机号是否已经注册
     * 
     */
    getPhoneNumberUsed: (data) => get(`/v1/user/findByTelephone`, data),

    /**
     * 设置&修改支付密码
     * {"phoneCaptcha":"", "payPwd":"要md5"}
     */
    postAuthModifyPayPwd: (data) => post(`/auth/modify/pay_pwd`, data),

}
