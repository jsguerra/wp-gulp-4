const themeName = 'gcostudios';

// Set variables
const { src, dest, watch, series, parallel } = require('gulp'),
      sass = require('gulp-sass'),
      cssnano = require("cssnano"),
      babel = require('gulp-babel'),
      rename = require('gulp-rename'),
      uglify = require('gulp-uglify'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      sourcemaps = require('gulp-sourcemaps'),
      browserSync = require('browser-sync').create();

// Path variables
const srcFolder = '../' + themeName + '/src/',
      scss = srcFolder + 'sass/',
      js = srcFolder + 'js/',
      destFolder = '../' + themeName + '/';

// Site Styles
function styles() {
  return src(scss + '{style.scss,rtl.scss}')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      indentType: 'tab',
      indentWidth: '1'
    })
    .on('error', sass.logError))
    .pipe(postcss([autoprefixer('last 2 versions', '> 1%'), cssnano()]))
    .pipe(sourcemaps.write(scss + 'maps'))
    .pipe(dest(destFolder))
    .pipe(browserSync.stream())
}

// Site javascript
function scripts() {
  return src([js + '*.js'])
    .pipe(babel({
      presets: [
        [
          '@babel/env',
          {
            "useBuiltIns": "usage",
            "corejs": "3",
            "targets": {
              "browsers": [
                "last 5 versions",
                "ie >= 8"
              ]
            }
          }
        ]
      ]
    }))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest(destFolder + 'js/'));
}

// Watch function
function watchTask() {
  browserSync.init({ 
    open: 'external',
    host: 'default.local',
		proxy: 'default.local',
		port: 8080
  });
  watch([scss + '**/*.scss'], styles);
  watch([js + '**/*.js'], scripts).on('change', browserSync.reload);
  watch(destFolder + '**/*.php').on('change', browserSync.reload);
}

exports.default = series(
    parallel(styles, scripts),
    watchTask
  );
