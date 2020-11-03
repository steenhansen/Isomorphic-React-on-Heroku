
const { dest, series, src, watch } = require('gulp');
const webpack = require('webpack');
const resolve = require('path').resolve;
const my_funcs = require('./gulp-funcs');
const del = require('del');
var rev = require('gulp-rev');

const showFilename = my_funcs.printFile('BIG BUNDLE');

const shared_constants = require('../mediaServer/react/sharedConstants');
const wepack_chunks_dir = shared_constants.WEBPACK_CHUNKS_DIR;
var js_chunks_file = shared_constants.JS_CHUNK_FILE;

const chunks_path =resolve(wepack_chunks_dir);


const css_color = 'bgCyan';
const is_watching = false;
const { startMess, stopMess } = my_funcs.coloredBars(
  'big bundle',
  css_color,
  is_watching
);

function big_init () {
  startMess();
  return del(['./public/*.js'], { force: 'true' });
}

function big_bundle (cb) {
  const webpack_config =  require('../webpack.config.js');
  webpack_config.optimization.minimize=false;
  webpack_config.output.path=chunks_path;

  const webpack_call =  webpack(webpack_config, (err, stats) => { 
    if (err || stats.hasErrors()) {
    	console.log('Big bundle error = ', err);
    }
    cb();

  });
  return webpack_call;
}

function big_hash () {
  return src('./MediaServer/chunks/**.js').pipe(rev()).pipe(dest('./public'));
}

function big_rev_id () {
  return src('./MediaServer/chunks/**.js')
    .pipe(rev())
    .pipe(rev.manifest(js_chunks_file))
    .pipe(dest('./public/'));
}
function big_done (cb) {
  stopMess();
  cb();
}

const big_series = series(big_init, big_bundle, big_hash, big_rev_id, big_done);

exports.bundle_big = big_series;