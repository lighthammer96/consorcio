/*
 *
 *  * Created by Jair Vásquez.
 *
 */

//var
var gulp = require('gulp');
//var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
//var express = require('express');
//var imageop = require('gulp-image-optimization');
var uglifycss = require('gulp-uglifycss');
var templateCache = require('gulp-angular-templatecache');

var paths = {
  angular: ['angular/scripts/**/**/*.js'],
  templatecache: ['angular/templates/**/*.html']
};

//task concat js
gulp.task('js', function () {
    gulp.src(paths.angular)
        .pipe(concat('public/js/recopro.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});

gulp.task('templatecache', function () {
    //gulp.src(paths.templatecache)
    //    .pipe(templateCache({
    //        root: 'angular/scripts/views/',
    //        module: 'sys.templates',
    //        standalone: true
    //    }))
    //    .pipe(gulp.dest('angular/scripts'));

    gulp.src(paths.templatecache)
        .pipe(gulp.dest('public/templates'));

});

gulp.task('sys', function () {
    //cualquier cambio en esta carpeta o archivos ejecuta la tarea ['js']
    gulp.watch(paths.angular, ['js']);
    gulp.watch(paths.templatecache, ['templatecache']);
});

gulp.task('recopro', ['templatecache', 'js']);

//region GULP OPTIONS

//gulp.task('concat-sys-vendor', function () {
//    gulp.src([
//        'sistravent/static/js/vendor/angular.min.js',
//        'sistravent/static/js/vendor/angular-touch/angular-touch.min.js',
//        'sistravent/static/js/vendor/angular-animate/angular-animate.min.js'
//    ])
//        .pipe(concat('sistravent/static/js/vendor.min.js'))
//        .pipe(gulp.dest('./'))
//});
//endregion


