module.exports= function(grunt) {
  grunt.initConfig({
    uglify: {
      my_target: {
        files:  {
          "public/javascripts/vendor/all.js": ["public/javascripts/vendor/all.js"],
          "public/stylesheets/vendor/all.css": ["public/stylesheets/vendor/css.js"]
        }
      }
    },

    bower_concat: {
      all: {
        dest:  {
            cssDest: "public/stylesheets/vendor/all.css",
            js: "public/javascripts/vendor/all.js"
        }
      }
    }
    
  }); //config

  [
  "grunt-bower-concat",
  "grunt-contrib-uglify"
  ].forEach(function(task) {
    grunt.loadNpmTasks(task);
  });

  grunt.registerTask("default", ["bower_concat", "uglify"]);


}

