module.exports = function (grunt) {
    //配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //检查Style CSS语法
        csslint: {src: ['public/stylesheets/*.css']},
        //合并 css 文件!!
        concat: {
            css: {
                src: ['public/stylesheets/*.css'],
                //根据目录下文件情况配置
                dest: 'public/stylesheets/dist/<%= pkg.name %>.css'
            }
        },
        //压缩min
        cssmin: {
            options: {
                //移除 css 文件中的所有注释
                keepSpecialComments: 0
            },
            minify: {
                expand: true,
                cwd: 'public/stylesheets/',
                src: ['dist/<%= pkg.name %>.css'],
                dest: 'public/stylesheets',
                ext: 'min.css'
            }
        },
        //压缩优化图片大小
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: 'public/images/',
                    //优化 img 目录下所有 png/jpg/jpeg 图片
                    src: ['**/*.{png,jpg,jepg}'],
                    //优化后的图片保存位置，默认覆盖
                    dest: 'public/images/'
                }]
            }
        },
        //检查JavaScript语法
        jshint: {
            all: ['Gruntfile.js',
                'public/javascripts/index.js',
                'public/javascripts/jquery_event.js'
            ]
        },
        //最小化、混淆、合并 JavaScript 文件
        uglify: {
            bulid: {
                //src: 'src/<%= pkg.name %>.js'，
                src: 'public/javascripts/*.js',
                dest: 'public/build/javascripts/<%= pkg.name %>.min.js'
            }
        },
        //监控
        watch: {
            css: {
                files: 'public/stylesheets/*.css',
                tasks: ['csslint'],
                options: {
                    livereload: true,
                    spawn: false
                }
            },
            scripts: {
                files: 'public/javascripts/*.js',
                tasks: ['jshint'],
                options: {
                    spawn: false
                }
            }
        },
        less:{
            
        }
    });


    //加载插件
    [
        'grunt-contrib-imagemin',
        'grunt-contrib-csslint',
        'grunt-contrib-concat',
        'grunt-contrib-cssmin',
        'grunt-contrib-jshint',
        'grunt-contrib-uglify',
        'grunt-contrib-watch'
    ].forEach(function (task) {
        grunt.loadNpmTasks(task);
    });
    //默认任务用于后端（服务器端）
    grunt.registerInitTask('default', ['watch']);
    //静态任务用于前端静态资源
    grunt.registerInitTask('static', ['csslint', 'concat', 'cssmin', 'imagemin','jshint','uglify']);
    //监控
    // grunt.registerInitTask('watch',['watch']);
};