// Thanks to @chriskjaer for this great gulpfile!
// https://gist.github.com/chriskjaer/8634047

var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    sass        = require('gulp-sass'),
    csso        = require('gulp-csso'),
    bourbon = require('node-bourbon').includePaths,
    uglify      = require('gulp-uglify'),
    jade        = require('gulp-jade'),
    concat      = require('gulp-concat'),
    livereload  = require('gulp-livereload'), // Livereload plugin needed: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
    tinylr      = require('tiny-lr'),
    express     = require('express'),
    app         = express(),
    marked      = require('marked'), // For :markdown filter in jade
    path        = require('path'),
    server      = tinylr(),
    deploy      = require("gulp-gh-pages");


// --- Basic Tasks ---
gulp.task('css', function() {
  return gulp.src('src/stylesheets/*.scss')
    .pipe( 
      sass( { 
        includePaths: ['src/stylesheets'].concat(bourbon),
        errLogToConsole: true
      } ) )
    .pipe( csso() )
    .pipe( gulp.dest('dist/stylesheets/') )
    .pipe( livereload( server ));
});

gulp.task('js', function() {
  return gulp.src('src/scripts/*.js')
    .pipe( uglify() )
    .pipe( concat('all.min.js'))
    .pipe( gulp.dest('dist/scripts/'))
    .pipe( livereload( server ));
});

gulp.task('templates', function() {
  return gulp.src('src/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
    .pipe( livereload( server ));
});

gulp.task('express', function() {
  app.use(express.static(path.resolve('./dist')));
  app.listen(1337);
  gutil.log('Listening on port: 1337');
});

gulp.task('watch', function () {
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err);
    }

    gulp.watch('src/stylesheets/*.scss',['css']);

    gulp.watch('src/js/*.js',['js']);

    gulp.watch('src/**/*.jade',['templates']);
    
  });
});

gulp.task('deploy', ['js','css','templates'], function() {
  gulp.src("dist/**/*")
    .pipe(deploy('git@github.com:masondesu/ghost-shield.git', 'origin'));
});

// Default Task
gulp.task('default', ['js','css','templates','express','watch']);