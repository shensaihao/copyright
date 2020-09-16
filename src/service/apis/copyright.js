import { get, post } from '../axios';

export default {


    //---------------------------------------original Controller---------------------------------------

    /**
    * 新建商标原创登记
    */
   postOriginalBrandCreate: (data) => post(`/v1/authBrand/create`, data),

   /**
    * 获取商标原创登记信息
    */
   postOriginalBrandInfo: (data) => get(`/v1/authBrand/findById`, data),

   /**
    * 上传文件
    * 
    */
   postFileUpload: (data) => post(`/v1/files/fileUpload`, data),

   /**
    * 新建作品原创登记
    * 
    */
   postOriginalCopyrightCreate: (data) => post(`/v1/authCopyright/create`, data),

   /**
    * 获取作品原创登记信息
    * 
    */
   postOriginalCopyrightInfo: (data) => get(`/v1/authCopyright/findById`, data),

   /**
    * 新建货品原创登记
    * 
    */
   postOriginalSourceAreaCreate: (data) => post(`/v1/authSourceArea/create`, data),

   /**
    * 获取货品原创登记信息
    * 
    */
   postOriginalSourceAreaInfo: (data) => get(`/v1/authSourceArea/findById`, data),

   /**
    * 新建技术原创登记
    */
   postOriginalTechCreate: (data) => post(`/v1/authTech/create`, data),

   /**
    * 获取技术原创登记信息
    */
   postOriginalTechInfo: (data) => get(`/v1/authTech/findById`, data),

    /**
     * 新建传统知识登记
     */
    postOriginalTraditionalCreate: (data) => post(`/v1/authTraditional/create`, data),

    /**
     * 获取传统知识登记信息
     */
    postOriginalTraditionalInfo: (data) => get(`/v1/authTraditional/findById`, data),

    /**
     * 详情
     */
    getDetailInfo: (data) => get(`/v1/copyrightVerify/findById`, data),

    /**
     * 查询所有公开作品
     */
    getAllByCondition: (data) => get(`/v1/copyrightVerify/getByCondition`, data),
}
