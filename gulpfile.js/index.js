const { series } = require('gulp');


const { es_lint } = require('./es_lint');
 
const {compile_test} = require('./compile_test');
const {run_test} = require('./run-test');



const { make_css } = require('./make_css');
const { compile_jsx } = require('./compile_jsx');
const { bundle_big } = require('./bundle-big');
const { bundle_small } = require('./bundle-small');
const dev_setup = series(make_css, compile_jsx, bundle_big);
const prod_setup = series(make_css, compile_jsx, bundle_small);



const do_all = series(
  make_css, 
  es_lint,  
  compile_test,
  compile_jsx,
  bundle_small
  );


module.exports = {
  _big: bundle_big,
  _compile_prog: compile_jsx,    
  _compile_test:compile_test,                         
  _css: make_css,
  _small: bundle_small,                 
          
  all:do_all,
  dev:dev_setup,
  lint: es_lint,
  prod:prod_setup,
  test:run_test,    
 };
