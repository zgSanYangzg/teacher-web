package com.wfj.support;

import com.jfinal.render.Render;
import org.beetl.ext.jfinal.BeetlRender;
import org.beetl.ext.jfinal.BeetlRenderFactory;

/**
 * Created by  on 2016/8/29 18:13.
 * description
 */
public class MyBeetlRenderFactory extends BeetlRenderFactory {
   /* public MyBeetlRenderFactory(ResourceLoader resourceLoader) {
        if(groupTemplate != null) {
            groupTemplate.close();
        }
        try {
            Configuration e = Configuration.defaultConfiguration();
            groupTemplate = new GroupTemplate(resourceLoader, e);
        } catch (IOException var3) {
            throw new RuntimeException("加载GroupTemplate失败", var3);
        }
    }*/
    @Override
    public Render getRender(String view) {
        BeetlRender render=new BeetlRender(groupTemplate, view);
        return render;
    }
    @Override
    public String getViewExtension() {
        return ".html";
    }
}
