package com.wfj.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jfinal.kit.PropKit;
import org.springframework.http.HttpMethod;

/**
 * Created  on 2016/8/30 17:54.
 * description
 */
public class ASIServiceImpl extends FreeapisClient {
    /**
     * @Author: admin-w
     * @Date: 2016/12/1 11:59
     * @Title: 获取实体的元数据定义
     * @Description:
     */
    public static JSONObject getProductParm(String agencyCode,String entityType,String entityId) throws Exception{
        return execute(PropKit.get("proxyBaseUrl") + "apis/1/asi/" + agencyCode+"/"+entityType+"/meta", HttpMethod.GET, null,null).getJSONObject("result");
    }

    /**
     * @Author: admin-w
     * @Date: 2016/12/1 11:58
     * @Title: 获取某个具体子分组的元数据和数据(异步根据子分组获取)
     * @Description:
     */
    public static JSONObject getParmASI(String agencyCode,String subCode,String entityType,String entityId) throws Exception{
        return execute(PropKit.get("proxyBaseUrl") + "apis/1/asi/" + agencyCode+"/"+subCode+"/"+entityType+"/"+entityId+"/values", HttpMethod.GET, null,null).getJSONObject("result");
}

    /**
     * @Author: admin-w
     * @Date: 2016/12/1 11:57
     * @Title: 根据父编码获取分组列表
     * @Description:
     */
    public static JSONArray getProductSecParm(String agencyCode,String subCode) throws Exception{
        return execute(PropKit.get("proxyBaseUrl") + "apis/1/asi/group/" + agencyCode+"/list?parentCode="+subCode, 
                HttpMethod.GET, null,null).getJSONArray("result");
    }

    /**
     * @Author: admin-w
     * @Date: 2016/12/1 11:56
     * @Title: 获取实体的动态表单数据(同步获取所有数据)
     * @Description:
     */
    public static JSONObject getParmASIAsync(String agencyCode,String entityType,String entityId) throws Exception{
        return execute(PropKit.get("proxyBaseUrl") + "apis/1/asi/" + agencyCode+"/"+entityType+"/"+entityId+"/values", 
                HttpMethod.GET, null,null).getJSONObject("result");
    }
    /**
     * @Author: admin-w
     * @Date: 2016/12/5 11:47
     * @Title: 根据id获取实体数据
     * @Description:
     */
    public static JSONObject getOneById(String agencyCode,String subCode,String entityType,String entityId,String id) throws Exception {
        return execute(PropKit.get("proxyBaseUrl") + "apis/1/asi/" + agencyCode + "/" + subCode + "/" + entityType + "/" + entityId + "/"+id, HttpMethod.GET, null, null).getJSONObject("result");
    }

    /**
     * @Author: admin-w
     * @Date: 2016/12/7 11:44
     * @Title: 分页获取表格数据
     * @Description:
     */
    public static JSONObject getDataByPage(String agencyCode,String groupCode,String entityType,String entityId,int start,int len)  throws Exception{
        return execute(PropKit.get("proxyBaseUrl") + "apis/1/asi/" + agencyCode + "/" + groupCode + "/" + entityType + "/" + entityId + "/page?start="+start+"&length="+len, HttpMethod.GET, null, null).getJSONObject("result");

    }
}
