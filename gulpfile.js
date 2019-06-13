const themeName = 'theme-name';

// Set variables
const { src, dest, watch, series, parallel } = require('gulp'),
      autoprefixer = require('autoprefixer'),
      browserSync = require('browser-sync').create(),
      postcss = require('gulp-postcss'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps');

// Path variables
const srcFolder = '../' + themeName + '/',
      scssFolder = srcFolder + 'sass/',
      jsFolder = srcFolder + 'js/';

function scssTask() {
  return src(scssFolder + '{style.scss,rtl.scss}')
    .pipe(sourcemaps.init())
    .pipe(sass()
    .on('error', sass.logError))
    .pipe(postcss([autoprefixer]))
    .pipe(sourcemaps.write())
    .pipe(dest(srcFolder)
  );
}

function jsTask() {
  return src([jsFolder + '*.js'])
    .pipe(dest(jsFolder));
}

function watchTask() {
  watch([scssFolder + '{style.scss,rtl.scss}', jsFolder + '*.js'], parallel(scssTask, jsTask));
}

exports.default = series(watchTask);