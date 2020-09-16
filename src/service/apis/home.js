import { get, post, postQuery } from '../axios';

export default {


    //---------------------------------------Auth Controller---------------------------------------

    /**
    * 首页搜索
    * 
    */
   findByProductionName: (data) => get(`/v1/copyrightVerify/findByProductionName`, data),


}