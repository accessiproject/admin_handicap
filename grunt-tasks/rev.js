module.exports = {
  dist: {
    files: {
      src: [
        '<%= app.dirs.dist %>/{,*/}*.js',
        '<%= app.dirs.dist %>/{,*/}*.css',
        '<%= app.dirs.dist %>/assets/fonts/*',
        '!<%= app.dirs.dist %>/server/*',
        '!<%= app.dirs.dist %>/bower_components/Chart.js',
        '!<%= app.dirs.dist %>/bower_components/angular-chart.js',
        '!<%= app.dirs.dist %>/bower_components/Chart.StackedBar.js',
        '!<%= app.dirs.dist %>/bower_components/mapbox.js'
      ]
    }
  }
};
