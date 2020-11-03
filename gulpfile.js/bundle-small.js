
const { dest, series, src, watch } = require('gulp');
const webpack = require('webpack');
const resolve = require('path').resolve;
const my_funcs = require('./gulp-funcs');
const del = require('del');
var rev = require('gulp-rev');

const showFilename = my_funcs.printFile('SMALL BUNDLE');

const shared_constants = require('../mediaServer/react/sharedConstants');
const wepack_chunks_dir = shared_constants.WEBPACK_CHUNKS_DIR;
var js_chunks_file = shared_constants.JS_CHUNK_FILE;

const chunks_path =resolve(wepack_chunks_dir);


const css_color = 'bgCyan';
const is_watching = false;
const { startMess, stopMess } = my_funcs.coloredBars(
  'small bundle',
  css_color,
  is_watching
);

function small_init () {
  startMess();
  return del(['./public/*.js'], { force: 'true' });
}

function small_bundle (cb) {
  const webpack_config =  require('../webpack.config.js');
  webpack_config.optimization.minimize=true;
  webpack_config.output.path=chunks_path;

  const webpack_call =  webpack(webpack_config, (err, stats) => { 
    if (err || stats.hasErrors()) {
    	console.log('Small bundle error = ', err);
    }
    cb();

  });
  return webpack_call;
}

function small_hash () {
  return src('./MediaServer/chunks/**.js').pipe(rev()).pipe(dest('./public'));
}

function small_rev_id () {
  return src('./MediaServer/chunks/**.js')
    .pipe(rev())
    .pipe(rev.manifest(js_chunks_file))
    .pipe(dest('./public/'));
}
function small_done (cb) {
  stopMess();
  cb();
}

const small_series = series(small_init, small_bundle, small_hash, small_rev_id, small_done);

exports.bundle_small = small_series;