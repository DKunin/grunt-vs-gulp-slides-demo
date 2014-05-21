
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
      jade: {
        files: [
          '<%= configger.src %>/jade/**/*.*',
        ],
        options: {
          reload: true
        },
        tasks: 'jade'
      },  
      styles: {
        files: [
          '<%= configger.src %>/css/**/*.css',
          '<%= configger.src %>/css/**/*.styl',
        ],options: {
          reload: true
        },
        tasks: 'stylus'
      },
      scripts: {
        files: [
          '<%= configger.src %>/js/**/*.js'
        ],options: {
          reload: true
        },
        tasks: ['jshint','browserify']
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
    jshint: {
      options: {
          reporter: require('jshint-stylish')
      },
      target: ['<%= configger.src %>/js/main.js']
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

  // These plugins provide necessary tasks.
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);  
  require('time-grunt')(grunt);
  
  grunt.registerTask('default', ['clean','build','connect','watch']);  

  grunt.registerTask('build', [
    'jade',
    'copy',
    'stylus',
    'jshint',
    'browserify'    
    ]);

};
