'use strict';

//Load gulp plugins ( présent dans node_modules après avoir fait toutes les installs )
//and assign them semantic names
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var notify = require('gulp-notify');
var scss_options = {
   outputStyle : 'expanded'
};

//Project Configuration for gulp tasks
var styles_input = 'scss/**/*.scss';
var styles_output = './css/'

gulp.task('styles', function(){
   return gulp
      .src(styles_input)
      .pipe(sourcemaps.init())
      .pipe(sass(scss_options).on('error', sass.logError)) // Permet de ne pas couper la tache en cas d'erreur de code
      .pipe(sourcemaps.write('./'))
      .pipe( gulp.dest(styles_output))
      .pipe(browserSync.stream())
      .pipe(notify({message : 'TASK : "styles" Completed !', onLast : true}));
});

gulp.task('serve', function(){
   browserSync.init({
      server : { baseDir : "./"},
      port : 8000
   });
});

// Default task (watch)
gulp.task('default', ['styles', 'serve'], function(){
   gulp.watch(styles_input, ['styles']);
   gulp.watch("./*.html").on('change', reload);
});
