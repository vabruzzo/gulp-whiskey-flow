var gulp = require('gulp'),
    browsersync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    webpack = require('webpack-stream');

var paths = {
    img: './src/img/*',
    jade: './src/views/*.jade',
    scss: './src/scss/**/*.scss',
    js: './src/js/**/*.js',
    jsEntry: './src/js/entry.js'
};

gulp.task('browser-sync', function() {
    browsersync.init({
        proxy: 'http://localhost/~vga/gulp-whiskey-flow/dist/',
        notify: false
    });
});

gulp.task('images', function () {
    return gulp.src(paths.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./dist/img/'));
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

gulp.task('scripts', function() {
    return gulp.src(paths.jsEntry)
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('default', ['images', 'views', 'sass', 'scripts', 'browser-sync'], function () {
    gulp.watch(paths.img, ['images']);
    gulp.watch(paths.jade, ['views']);
    gulp.watch(paths.scss, ['sass']);
    gulp.watch(paths.js, ['scripts']);
    gulp.watch('./dist/img/*', browsersync.reload);
    gulp.watch('./dist/*.html', browsersync.reload);
    gulp.watch('./dist/css/*.css', browsersync.reload);
    gulp.watch('./dist/js/*.js', browsersync.reload);
});
