import { get, post, postQuery } from '../axios';

export default {


    //---------------------------------------Auth Controller---------------------------------------

    /**
    * 登录
    * {"phone":"","pwd":""}
    */
    postAuthAccessLogin: (username, password) => postQuery(`/v1/login`,username, password),

    /**
     * 注册
     */
    postUserCreate: (data) => post(`/v1/user/register`, data),

    /**
     * 退出登录
     * 
     */
    getAuthLogout: (data) => post(`/v1/security/logout`, data),

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
     * 获取用户作品
     */
    getOwnByCondition: (data) => get(`/v1/copyrightVerify/getOwnByCondition`, data),

    /**
     * 更改手机号
     */
    changeTelephone: (data) => get(`/v1/user/changeTelephone`, data),

}
