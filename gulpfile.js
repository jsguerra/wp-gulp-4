const themeName = 'subatomic-blocks';

// Set variables
const { src, dest, watch, series, parallel } = require('gulp'),
      sass = require('gulp-sass'),
      cssnano = require("cssnano"),
      rename = require('gulp-rename'),
      uglify = require('gulp-uglify'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      sourcemaps = require('gulp-sourcemaps'),
      browserSync = require('browser-sync').create();

// Path variables
const srcFolder = '../' + themeName + '/src/',
      scssFolder = srcFolder + 'sass/',
      jsFolder = srcFolder + 'js/',
      destFolder = '../' + themeName + '/';

function scssTask() {
  return src(scssFolder + '{style.scss,rtl.scss}')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      indentType: 'tab',
      indentWidth: '1'
    })
    .on('error', sass.logError))
    .pipe(postcss([autoprefixer('last 2 versions', '> 1%'), cssnano()]))
    .pipe(sourcemaps.write(scssFolder + 'maps'))
    .pipe(dest(destFolder)
  );
}

function jsTask() {
  return src([jsFolder + '*.js'])
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest(destFolder + 'js/'));
}

function watchTask() {
  browserSync.init({ 
		open: 'external',
		proxy: 'genericdev.local',
		port: 8080
  });
  watch([scssFolder + '**/*.css', scssFolder + '**/*.scss'], scssTask);
  watch([jsFolder + '**/*.js'], jsTask);
  watch(destFolder + '**/*').on('change', browserSync.reload);
}

exports.default = series(
    parallel(scssTask, jsTask),
    watchTask
  );