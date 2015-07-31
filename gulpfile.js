var gulp = require('gulp'),
    browsersync = require('browser-sync'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    webpack = require('webpack-stream');

var paths = {
    img: './src/img/*',
    jade: './src/views/*.jade',
    scss: './src/scss/**/*.scss',
    js: './src/js/**/*.js',
    jsEntry: './src/js/entry.js'
};

var dist = {
    img: './dist/img/*',
    html: './dist/*.html',
    css: './dist/css/*.css',
    js: './dist/js/*.js'
};

gulp.task('browser-sync', function() {
    browsersync.init({
        proxy: 'http://localhost/~vga/gulp-whiskey-flow/dist/',
        notify: true
    });
});

gulp.task('images', function () {
    return gulp.src(paths.img)
        .pipe(changed('./dist/img/'))
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
            pretty: '\t'
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('styles', function () {
    return gulp.src(paths.scss)
        .pipe(sass({
            includePaths: require('node-neat').includePaths,
            // outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('scripts', function() {
    return gulp.src(paths.jsEntry)
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('default', ['images', 'views', 'styles', 'scripts', 'browser-sync'], function () {
    gulp.watch(paths.img, ['images']);
    gulp.watch('./src/views/**/*.jade', ['views']);
    gulp.watch(paths.scss, ['styles']);
    gulp.watch(paths.js, ['scripts']);
    gulp.watch(dist.img, browsersync.reload);
    gulp.watch(dist.html, browsersync.reload);
    gulp.watch(dist.css, browsersync.reload);
    gulp.watch(dist.js, browsersync.reload);
});
