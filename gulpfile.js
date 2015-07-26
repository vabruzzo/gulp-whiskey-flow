var gulp = require('gulp'),
    browsersync = require('browser-sync'),
    concat = require('gulp-concat'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass');

var paths = {
    jade: './src/views/*.jade',
    scss: './src/scss/**/*.scss'
};

gulp.task('browser-sync', function() {
    browsersync.init({
        proxy: 'http://localhost/~vga/gulp-whiskey-flow/dist/',
        notify: false
    });
});

gulp.task('views', function() {
    return gulp.src(paths.jade)
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function () {
    return gulp.src(paths.scss)
        .pipe(sass({
            includePaths: require('node-neat').includePaths,
            // outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('default', ['views', 'sass', 'browser-sync'], function () {
    gulp.watch('./src/views/*.jade', ['views']);
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./dist/*.html', browsersync.reload);
    gulp.watch('./dist/css/*.css', browsersync.reload);
});
