
module.exports = function(grunt) {
  
  var globalConfig  = {
    src: '../DemoSrc',
    dist: '.tmp'
  };
  
  grunt.initConfig({
    configger: globalConfig,
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %>  ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      'Author: <%= pkg.author.name %> */\n',
      watch: {
      options: {
        livereload: true
      },
      main: {
        files: [
          '<%= configger.src %>/jade/**/*.*',
          '<%= configger.src %>/css/**/*.css',
          '<%= configger.src %>/css/**/*.styl',
          '<%= configger.src %>/images/**/*.*',
          '<%= configger.src %>/js/**/*.js'
        ],
        tasks: 'build'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        files: {
          '<%= configger.dist %>/js/app.js': [
            '<%= configger.dist %>/js/app.js'
          ]
        }
      }
    },
    clean: {
      build: {
        src: ["<%=configger.dist%>"]
      }
    },  
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%=configger.src%>',
          dest: '<%=configger.dist%>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.{gif,webp,png,jpg}',
            'css/font/*',
            'js/plugins/*.js'
          ]
        }]
      }
    },  
    htmlmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= configger.src %>',
          src: ['*.html'],
          dest: '<%= configger.dist %>'
        }]
      }
    },    
    open: {
      file: {
        path: 'dist/index.html'
      }
    },    
    cssmin: {
      options: {
        banner:'<%= banner %>',
        report: 'min'
      }
    },
    jade: {
      compile: {
        options: {
          basedir: "src/jade/",
          pretty: true
        },
        files: {
          "<%=configger.src %>/index.html": ["<%=configger.src %>/jade/*.jade"]
        }
      }
    },
    useminPrepare: {
      html: '<%=configger.src %>/index.html',
      options: {
        dest: '<%=configger.dist%>'
      }
    },
    usemin: {
      html: ['<%= configger.dist %>/{,*/}*.html'],
      css: ['<%= configger.dist %>/css/{,*/}*.css'],
      options: {
        dirs: ['<%=configger.dist%>']
      }
    },
    rev: {
        files: {
          src: ['<%= configger.dist %>/js/app.js', '<%= configger.dist %>/css/main.css']
        }
    },  
    stylus: {
      compile: {
        files: {
          '<%= configger.dist %>/css/style.css': '<%= configger.src %>/css/style.styl'//, // 1:1 compile
        }
      }
    },    
    browserify: {
      dist: {
      files: {
          '<%= configger.dist %>/js/main.js': '<%=configger.src %>/js/main.js'          
        },
        options: {
          extensions: ['.jsx'],
          transform: ['reactify']
        }
      }
    } ,     
    connect: {
       options: {
            port: 9002,
            //livereload: 35730,
            hostname: 'localhost'
        },
        livereload: {
            options: {
                open: true,
                base: [
                    '<%= configger.dist %>'
                ]
            }
        }
      }
  });

  // These plugins provide necessary tasks.
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);  
  require('time-grunt')(grunt);
  
  grunt.registerTask('default', ['clean','build','connect','watch']);  

  grunt.registerTask('build', [
    'jade',
    'useminPrepare',
    'concat',
    'copy',
    'htmlmin',
    'stylus',
    'cssmin',
    'browserify',
    //'uglify',
    'rev', 
    'usemin'
    ]);

};
