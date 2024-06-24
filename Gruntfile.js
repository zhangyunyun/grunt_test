module.exports = function (grunt) {
  //初始化配置grunt任务
  grunt.initConfig({
    //注册合并js任务
    concat: {
      options: {
        separator: ";",
      },
      dist: {
        src: ["src/js/test1.js", "src/js/test2.js"],
        dest: "dist/js/build.js",
      },
    },

    //注册压缩js任务
    pkg: grunt.file.readJSON("package.json"),
    uglify: {
      options: {
        //不是必须的
        banner:
          "/*! <%= pkg.name %> - v<%= pkg.version %> - " +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      dist: {
        files: {
          //"压缩后后的文件目录和名称"："压缩的是合并以后的js文件"
          "dist/js/build.mn.js": ["dist/js/build.js"],
        },
      },
    },

    //注册js语法检查
    jshint: {
      options: {
        jshintrc: ".jshintrc", //指定配置文件
      },
      dist: ["Gruntfile.js", "src/js/test1.js", "src/js/test2.js"], //指定检查的文件
    },

    //注册合并/压缩css任务
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1,
      },
      target: {
        files: {
          //"压缩后后的文件目录和名称"："需要合并的css文件"
          "dist/css/build.min.css": ["src/css/*.css"],
        },
      },
    },

    //注册监听任务
    watch: {
      scripts: {
        files: ["src/js/*.js", "src/css/*.css"], //源文件目录
        tasks: ["concat", "uglify", "jshint", "cssmin"], //执行任务(当源文件发生变化时，就执行响应的任务)
        options: {
          spawn: false, //false:变量更新  true:全量更新
          livereload: true, //自动编译
        },
      },
    },
  });

  //grunt任务执行的时候去加载对应的任务插件
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-watch");

  //默认被执行的任务列表。
  grunt.registerTask("default", ["concat", "uglify", "jshint", "cssmin", "watch"]);
  grunt.registerTask("myWatch",["default", "watch"]);
};
