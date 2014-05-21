
module.exports = function(grunt) {
  
  var globalConfig = require('./.gruntconfig/config');

  grunt.initConfig({
    configger: globalConfig,
    pkg: grunt.file.readJSON('package.json'),
    banner: globalConfig.banner,
    watch: {
      options: {
        livereload: true
      },
      jade: {
        files: [
          '<%= configger.src %>/jade/**/*.*',
        ],
        tasks: 'jade'
      },  
      styles: {
        files: [
          '<%= configger.src %>/css/**/*.css',
          '<%= configger.src %>/css/**/*.styl',
        ],
        tasks: 'stylus'
      },
      scripts: {
        files: [
          '<%= configger.src %>/js/**/*.js'
        ],
        tasks: 'browserify'
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
    jade: {
      compile: {
        options: {
          basedir: "src/jade/",
          pretty: true
        },
        files: {
          "<%=configger.dist %>/index.html": ["<%=configger.src %>/jade/*.jade"]
        }
      }
    },
    stylus: {
      compile: {
        files: {
          '<%= configger.dist %>/css/style.css': '<%= configger.src %>/css/style.styl'
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

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  //require('load-grunt-tasks')(grunt);
  
  require('time-grunt')(grunt);
  
  grunt.registerTask('default', ['clean','build','connect','watch']);  

  grunt.registerTask('build', [
    'jade',
    'copy',
    'stylus',
    'browserify'
    ]);

};
