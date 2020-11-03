const { dest, series, src, watch } = require('gulp');


var babel = require('gulp-babel');
var del = require('del');

const JS_IN_SAME_DIR = file => file.base;


const my_funcs = require('./gulp-funcs');
const showFilename = my_funcs.printFile('LINT');

 ///  '../test/acceptance/**/*.es6',  kill all es6 file and folders
function test_init () {
  //startMess();
  return del(['../test/acceptance/**/*.js'], { force: 'true' });
}

function compile_jsx () {
  return src('./test/acceptance/**/*.jsx')
  .pipe(showFilename())
    .pipe(babel(  { "presets": ["@babel/preset-react"] }))
    .pipe(dest(JS_IN_SAME_DIR));   
}

function compile_done (cb) {
 // stopMess();
  cb();
}

const test_series = series(test_init, compile_jsx, compile_done);
exports.compile_test = test_series;
