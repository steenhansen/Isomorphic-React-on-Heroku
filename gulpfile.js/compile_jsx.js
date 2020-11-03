const { dest, series, src, watch } = require('gulp');
const del = require('del');
const babel = require('gulp-babel');

const my_funcs = require('./gulp-funcs');
const css_color = 'bgCyan';
const is_watching = true;
const { startMess, stopMess } = my_funcs.coloredBars(
  'compile',
  css_color,
  is_watching
);
const showFilename = my_funcs.printFile('COMPILE');

function compile_init () {
  startMess();
  return del(['../mediaServer/react/js/**/*.js'], { force: 'true' });
}

function compile_jsx () {
  return src('./mediaServer/react/jsx/**/*.jsx')
    .pipe(babel({ presets: ['@babel/preset-react'] }))
    .pipe(dest('./mediaServer/react/js'))
    .pipe(showFilename());
}

function compile_done (cb) {
  stopMess();
  cb();
}

const compile_series = series(compile_init, compile_jsx, compile_done);


exports.compile_jsx= compile_series;