import { get, post } from '../axios';

export default {


    //---------------------------------------Subscribe Controller---------------------------------------

    /**
     * ignotsPipeline
     * 
     */
    getNewProjectIgnotsPipeline: (data) => get(`/new/project/ignots/pipeline`, data),

    /**
     * detail
     * 
     */
    getNewProjectAccessDetail: (data) => get(`/new/project/access/detail`, data),

    /**
     * newProjectList
     * 
     */
    getNewProjectAccessList: (data) => get(`/new/project/access/list`, data),

    /**
     * innerSubscribeAccountStatistic
     * 
     */
    getNewProjectInnerServiceSubscribeAccountStatistic: (data) => get(`/new/project/inner_service/subscribe/account/statistic`, data),

    /**
     * getOrderByNo
     * 
     */
    getNewProjectOrder: (data) => get(`/new/project/order`, data),

    /**
     * orders
     * 
     */
    postNewProjectOrders: (data) => post(`/new/project/orders`, data),

    /**
     * preSubscribe
     * 
     */
    postNewProjectPreSubscribe: (data) => post(`/new/project/pre/subscribe`, data),

    /**
     * sellOut
     * 
     */
    postNewProjectSell: (data) => post(`/new/project/sell`, data),

    /**
     * subscribe
     * 
     */
    postNewProjectSubscribe: (data) => post(`/new/project/subscribe`, data),

    /**
     * subscribeAccountDetail
     * 
     */
    getNewProjectSubscribeAccountPipeline: (data) => get(`/new/project/subscribe/account/pipeline`, data),

    /**
     * subscribeAccountStatistic
     * 
     */
    getNewProjectSubscribeAccountStatistic: (data) => get(`/new/project/subscribe/account/statistic`, data),


    /**
     * lastTicker
     * 
     */
    getNewProjectV1AccessTickers: (data) => get(`/new/project/v1/access/tickers`, data),

    /**
     * 贡献值维持
     * 
     */
    getNewProjectPlusMaintenance: (data) => get(`/new/project/plusMaintenance`, data),



}
