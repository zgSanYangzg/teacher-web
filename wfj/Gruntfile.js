module.exports = function(grunt){
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        //清除目录
        clean:{
            all:['src/main/webapp/includes/lib/*/*']
        },
        requirejs : {
            compile: {
                options: {
                    appDir: "src/main/webapp/includes/lib-source",
                    baseUrl: ".",
                    dir: "src/main/webapp/includes/lib",
                    // generateSourceMaps: true,//是否生成SourceMaps文件
                    // preserveLicenseComments: false,//默认注释有授权在里面。当然，在大项目生成时，文件比较多，注释也比较多，这样可以把所有注释写在文件的顶部。
                    optimize: 'uglify', /*JavaScript 代码优化方式。可设置的值：
                                "uglify：使用 UglifyJS 压缩代码，默认值；
                                "uglify2"：使用 2.1.2+ 版本进行压缩；
                                "closure"： 使用 Google's Closure Compiler 进行压缩合并，需要 Java 环境；
                                "closure.keepLines"：使用 Closure Compiler 进行压缩合并并保留换行；
                                "none"：不做压缩合并；*/

                    optimizeCss: 'standard',/*CSS 代码优化方式，可选的值有：
                            "standard"：标准的压缩方式；
                            "standard.keepLines"：保留换行；
                            "standard.keepComments"：保留注释；
                            "standard.keepComments.keepLines"：保留换行；
                            "none"：不压缩；*/
                    keepBuildDir:false,
                    mainConfigFile:'src/main/webapp/includes/config-source.js',//mainConfigFile代表require.js主模块位置，通过读取主模块里的require.config({})配置来获取各个js的路径。
                    removeCombined: true,   //如果为true，将从输出目录中删除已合并的文件
                    findNestedDependencies: true,
      /*              modules:[
                        {
                        name: "jquery.treeview",
                        //　create：如果不存在，是否创建。默认 false；
                        include: [//额外引入的模块，和 name 定义的模块一起压缩合并；
                            'jquery.treeview.async',
                            'jquery.treeview.edit'
                        ],
                        exclude: [//要排除的模块。有些模块有公共的依赖模块，在合并的时候每个都会压缩进去，例如一些基础库。使用 exclude 就可以把这些模块在压缩在一个更早之前加载的模块中，其它模块不用重复引入
                            "jquery"
                        ]
                    }
                    ],*/
                    wrap: true,
                    logLevel: 0,
                    findNestedDependencies: true,
                    fileExclusionRegExp: /^(main)\.js|.*\.html|examples$/,
                    inlineText: true
                }
            }
        },
        concat : {
            css : {
                src: [
                    'src/main/webapp/includes/lib/smartadmin/js/plugin/bootstrap-select/dist/css/bootstrap-select.css',
                    'src/main/webapp/includes/lib/smartadmin/js/plugin/jquery-confirm/jquery-confirm.css',
                    'src/main/webapp/includes/lib-source/smartadmin/css/font-awesome.min.css',
                    'src/main/webapp/includes/lib-source/smartadmin/css/style.css',
                    'src/main/webapp/includes/lib-source/smartadmin/css/right.css'
                ],
                dest:'src/main/webapp/includes/lib/smartadmin/css/all.css'
            }

        },
       /* //压缩css
        cssmin:{
            compile:{
                files:[{
                    expand:true,
                    cwd:'src/main/webapp/includes/lib-source/',
                    src:['**!/!*.css'],//所有css文件
                    dest:'src/main/webapp/includes/lib/'//输出到此目录下
                }]
            }
        },*/
        //压缩图片
        imagemin:{
            compile:{
                options:{
                    optimizationLevel: 7,
                    pngquant: true
                },
                files:[{
                    expand:true,
                    cwd:'src/main/webapp/includes/lib-source/',
                    src:['**/*.{png,jpg,jpeg,gif,webp,svg}'],
                    dest:'src/main/webapp/includes/lib/'//输出到此目录下
                }]
            }
        }
    });
    /*grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.registerTask('default',['requirejs']);*/

    grunt.registerTask('compile',[
        //'cssmin',
        "requirejs",
        'concat',
        'imagemin'

    ]);

    grunt.registerTask('publish',['clean','compile']);
}