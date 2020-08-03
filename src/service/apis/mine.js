import { get, post } from '../axios';

export default {


    //---------------------------------------Auth Controller---------------------------------------

    /**
    * 登录
    * {"phone":"","pwd":""}
    */
    postAuthAccessLogin: (data) => post(`/auth/access/login`, data),

    /**
     * 登录信息
     * 
     */
    getAuthLoginInfo: (data) => get(`/auth/login_info`, data),

    /**
     * 退出登录
     * 
     */
    getAuthLogout: (data) => get(`/auth/logout`, data),

    /**
     * 获取短信验证码
     * 
     */
    getAuthMessageSmsCaptcha: (data) => get(`/auth/message/sms_captcha`, data),

    /**
     * 设置&修改支付密码
     * {"phoneCaptcha":"", "payPwd":"要md5"}
     */
    postAuthModifyPayPwd: (data) => post(`/auth/modify/pay_pwd`, data),

}
