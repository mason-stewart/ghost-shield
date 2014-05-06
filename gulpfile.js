// Thanks to @chriskjaer for this great gulpfile!
// https://gist.github.com/chriskjaer/8634047

var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    sass        = require('gulp-sass'),
    csso        = require('gulp-csso'),
    bourbon     = require('node-bourbon').includePaths,
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

gulp.task('images', function() {
  return gulp.src('src/images/**/*.*')
    .pipe( gulp.dest('dist/images/'))
    .pipe( livereload( server ));
});

gulp.task('fonts', function() {
  return gulp.src('src/webfonts/*.*')
    .pipe( gulp.dest('dist/webfonts/'))
    .pipe( livereload( server ));
})

gulp.task('css', function() {
  return gulp.src('src/stylesheets/ghost-shield.scss')
    .pipe( 
      sass( { 
        includePaths: ['src/stylesheets'].concat(bourbon),
        errLogToConsole: true
      } ) )
    .pipe( csso() )
    .pipe( gulp.dest('.tmp/stylesheets/') )
    .pipe( livereload( server ));
});

gulp.task('copy-css', function() {
  return gulp.src('.tmp/stylesheets/ghost-shield.css')
    .pipe( gulp.dest('dist/stylesheets/') );
});

gulp.task('js', function() {
  return gulp.src('src/scripts/*.js')
    .pipe( uglify() )
    .pipe( gulp.dest('dist/scripts/'))
    .pipe( livereload( server ));
});

gulp.task('templates', function() {
  return gulp.src('src/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('.tmp/'))
});

gulp.task('express', function() {
  app.use(express.static(path.resolve('./dist')))
     .use(express.static(path.resolve('./src')))
     .use(express.static(path.resolve('./.tmp')));
  app.listen(1337);
  gutil.log('Listening on port: 1337');
});

gulp.task('watch', function () {
  
    gulp.watch('src/images/**/*.*',['images']);

    gulp.watch('src/stylesheets/*.*',['css']);

    gulp.watch('src/scripts/*.js',['js']);

    gulp.watch('src/**/*.jade',['templates']);

});

gulp.task('build', ['images','js','css','copy-css','templates', 'fonts']);

gulp.task('deploy', ['build'], function() {
  gulp.src("dist/**/*")
    .pipe(deploy('git@github.com:masondesu/ghost-shield.git', 'origin'));
});

// Default Task
gulp.task('default', ['images','js','css','templates', 'fonts', 'express','watch']);
