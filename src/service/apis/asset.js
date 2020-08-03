import { get, post } from '../axios';

export default {


    //---------------------------------------Wallet Controller---------------------------------------


    /**
     * 支持的币种
     * 
     */
    getWalletAssets: (data) => get(`/wallet/assets`, data),

    /**
     * 获取充币地址 modified
     * modified: add param: block_chain 
     */
    getWalletDepositAddress: (data) => get(`/wallet/deposit/address/`,data),

    /**
     * 充值记录
     * status:pending=充币中，finish=已完成
     */
    getWalletDepositPipelines: (data) => get(`/wallet/deposit_pipelines`, data),

    /**
     * 我的资产
     * 
     */
    getWalletMyAssets: (data) => get(`/wallet/my_assets`, data),

    /**
     * 平台划转
     * {"asset":"BTC","amount":100}
     */
    postWalletTransfer: (data) => post(`/wallet/transfer`, data),

    /**
     * 划转记录
     * 
     */
    getWalletTransferPipeline: (data) => get(`/wallet/transfer/pipeline`, data),

    /**
     * 提现 modified
     * {"block_chain":"", "asset":"(必传)","address":"(必传)","other":"","amount":"(必传)","fee":"","pay_pwd":"(必传)","ga_captcha":"(必传)","sms_captcha":"短信验证码(必传)","email_captcha":"邮箱验证码(必传)"} modified: add param: block_chain
     */
    postWalletWithdrawal: (data) => post(`/wallet/withdrawal`, data),

    /**
     * 提现记录
     * approving=审核中，pending=提币中，finish=已完成，refuse=拒绝
     */
    getWalletWithdrawalPipelines: (data) => get(`/wallet/withdrawal_pipelines`, data),

    /**
     * 币币交易记录
     * type: transfer=划转, deposit=充币, withdraw=提币, activity, all全部 {asset, page}
     */
    getWalletSpotPipelines: (data) => get(`/wallet/spot/pipeline`, data),

    /**
     * 认购交易记录
     * {asset, page}
     */
    getWalletSubPipelines: (data) => get(`/wallet/subscribe/pipeline`, data),

    /**
     * 获取当日元宝数量
     * 
     */
    getWalletTodayIngots: (data) => get(`/wallet/today/ingots`, data),


}
