var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    sass = require('gulp-sass');

var paths = {
    scss: 'src/scss/**/*.scss'
};

gulp.task('browser-sync', function() {
    var files = [
        'dist/css/main.css',
        'dist/*.html'
    ];
    browserSync.init(files, {
        proxy: "http://localhost/~vga/gulp-whiskey-flow/dist/",
        notify: false
    });
});

gulp.task('sass', function () {
    return gulp.src(paths.scss)
        .pipe(sass({
            includePaths: require('node-neat').includePaths
        }))
        .pipe(minifyCss({compatability:'ie8'}))
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch("src/scss/**/*.scss", ['sass']);
});
