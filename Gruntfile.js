module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: ['js/*.js', 'Gruntfile.js']
    },
  });

  // Load the plugins tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // "npm test" runs these task(s)
  grunt.registerTask('test', ['jshint']);

  // Default task(s).
  grunt.registerTask('default', ['test']);
};
