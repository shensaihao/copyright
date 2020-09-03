import { get, post, postQuery } from '../axios';

export default {


    //---------------------------------------original Controller---------------------------------------

    /**
    * 新建商标原创登记
    */
    postOriginalBrandCreate: (data) => post(`/v1/originalBrand/create`, data),

    /**
     * 上传文件
     * 
     */
    postFileUpload: (data) => post(`/v1/files/fileUpload`, data),

    /**
     * 新建作品原创登记
     * 
     */
    postOriginalCopyrightCreate: (data) => post(`/v1/originalCopyright/create`, data),

    /**
    * 获取作品原创登记信息
    * 
    */
   postOriginalCopyrightInfo: (data) => get(`/v1/originalCopyright/findById`, data),

    /**
     * 新建货品原创登记
     * 
     */
    postOriginalSourceAreaCreate: (data) => post(`/v1/originalSourceArea/create`, data),

     /**
    * 获取货品原创登记信息
    * 
    */
   postOriginalSourceAreaInfo: (data) => get(`/v1/originalSourceArea/findById`, data),
   
    /**
     * 新建技术原创登记
     */
    postOriginalTechCreate: (data) => post(`/v1/originalTech/create`, data),

    /**
    * 获取技术原创登记信息
    */
   postOriginalTechInfo: (data) => get(`/v1/originalTech/findById`, data),

    /**
     * 新建传统知识登记
     */
    postOriginalTraditionalCreate: (data) => post(`/v1/originalTraditional/create`, data),

    /**
     * 获取传统知识登记信息
     */
    postOriginalTraditionalInfo: (data) => get(`/v1/originalTraditional/findById`, data),

    /**
     * 获取传统知识登记信息
     */
    postCopyrightVerifyInfo: (id) => get(`/v1/copyrightVerify/findByRelevanceId`, id),

    /**
     * 分页查询原创作品
     * 
     */
    getCopyrightVerifyByCondition: (registerType, data) => get(`/v1/copyrightVerify/getByCondition`,registerType, data),
}
