package com.wfj.config;

import com.jfinal.config.*;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.ehcache.EhCachePlugin;
import com.jfinal.weixin.sdk.api.ApiConfigKit;
import com.wfj.controller.*;

public class LexingConfig extends JFinalConfig {
    public void configConstant(Constants me) {
        PropKit.use("config.properties");
     //   me.setMainRenderFactory(new BeetlRenderFactory());
      /*  GroupTemplate groupTemplate = BeetlRenderFactory.groupTemplate;*/
        me.setDevMode(PropKit.getBoolean("devMode", false));
        ApiConfigKit.setDevMode(me.getDevMode());
        me.setEncoding("utf-8");
    }

    /**
     * 配置路由
     */
    public void configRoute(Routes me) {
        me.add("/proxy/freeapis", FreeApisProxyController.class);
        me.add("/",DefaultController.class,"/WEB-INF/jsp");
        me.add("/role",RoleController.class,"/WEB-INF/jsp");
        me.add("/dept",DeptController.class,"/WEB-INF/jsp");
        me.add("/dictionary",DictionaryController.class,"/WEB-INF/jsp");
        me.add("/user",UserController.class,"/WEB-INF/jsp");
        me.add("/resource",ResourceController.class,"/WEB-INF/jsp");
        me.add("/people",PeopleController.class,"/WEB-INF/jsp");
    }

    /**
     * 配置插件
     */
    public void configPlugin(Plugins me) {
        EhCachePlugin ecp = new EhCachePlugin(this.getClass().getResource("ehcache.xml"));
        me.add(ecp);
    }

    /**
     * 配置全局拦截器
     */
    public void configInterceptor(Interceptors interceptors) {

    }

    /**
     * 配置处理器
     */
    public void configHandler(Handlers handlers) {

    }
}
