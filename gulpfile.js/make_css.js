const { dest, series, src, watch } = require('gulp');
var del = require('del');
var rev = require('gulp-rev');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var css_color = 'bgMagenta';
const my_funcs = require('./gulp-funcs');
const is_watching = true;

var { startMess, stopMess } = my_funcs.coloredBars(
  'css',
  css_color,
  is_watching
);

var shared_constants = require('../mediaServer/react/sharedConstants');
var wepack_chunks_dir = shared_constants.WEBPACK_CHUNKS_DIR;
var css_chunks_file =  shared_constants.CSS_CHUNK_FILE;


function css_init () {
  startMess();
  return del(['./public/styles.min.css', './public/styles-*.min.css'], {
    force: 'true'
  });
}

function css_minify () {
  return src('./public/styles.css')
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(wepack_chunks_dir));
}

function css_hash () {
  return src(wepack_chunks_dir + 'styles.min.css').pipe(rev()).pipe(dest('./public'));
}

function css_rev_id () {
  return src(wepack_chunks_dir + 'styles.min.css')
    .pipe(rev())
    .pipe(rev.manifest(css_chunks_file))
    .pipe(dest('./public/'));
}

function css_done (cb) {
  stopMess();
  cb();
}

const css_series = series(css_init, css_minify, css_hash, css_rev_id, css_done);


exports.make_css = css_series;