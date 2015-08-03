var gulp = require('gulp'),
  browsersync = require('browser-sync'),
  changed = require('gulp-changed'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  htmlinject = require('bs-html-injector'),
  jade = require('gulp-jade'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  webpack = require('webpack-stream');

var paths = {
  img: './src/img/*',
  jade: './src/views/*.jade',
  jadeInc: './src/views/**/*.jade',
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
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browsersync.reload({stream: true}));
});

gulp.task('scripts', function() {
  return gulp.src(paths.jsEntry)
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('default', ['images', 'views', 'styles', 'scripts'], function () {
  browsersync.use(htmlinject);
  browsersync.init({
    proxy: 'http://192.168.33.10/gulp-whiskey-flow/dist/', // scotch-box default
    notify: true
  });

  gulp.watch(paths.img, ['images']);
  gulp.watch(paths.jadeInc, ['views']);
  gulp.watch(paths.scss, ['styles']);
  gulp.watch(paths.js, ['scripts']);
  gulp.watch(dist.img, browsersync.reload);
  gulp.watch(dist.html, htmlinject);
  gulp.watch(dist.js, browsersync.reload);
});
