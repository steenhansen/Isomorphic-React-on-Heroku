const { dest, series, src, watch } = require('gulp');
const eslint = require('gulp-eslint');
const util = require('util');
const gulpIf = require('gulp-if'); 
const  my_funcs = require('./gulp-funcs'); 
var path = require('path');

const LINTED_DIRS = [
  "!./git/**/",
  "./gulpfile.js/*.js",

   "!./mediaServer/chunks/**/",
   "./mediaServer/cron/*.js",
   "./mediaServer/models/*.js",
   "./mediaServer/modules/**/*.js",
   "./mediaServer/react/**/*.jsx",
   "./mediaServer/react/*.js",
   "!./mediaServer/react/js/**/}",
   "./mediaServer/routes/*.js",

   "!./node_modules/**/",
   "!./public/*.js",
  "./server-funcs/*.js",
  "./test/**/*.{js,jsx}",
   "./*.js"
];
const showFilename  =my_funcs.printFile('LINT');
const OVERWRITE_FIX = file => file.base;
//const ESLINT_DO_FIX = {fix: true};






var ESLINT_DO_FIX = {fix: true,
  "parserOptions": {
    "ecmaVersion": 8,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },

  "env": {
    "es6": true,
    "node": true
  },

  "plugins": [
    "standard",
    "promise"
  ],

  "globals": [
  //  "document": false,
  //  "navigator": false,
  //  "window": false
  ],

  "rules": {
  
                      "camelcase": ["off", { "properties": "never" }],
                      "semi": ["error", "always"]
   
  }
};








const GULP_DIR_NAME = "gulpfile.js";

var fixed_files =[];

function isEsLintFixed(file) {
  const file_name = path.basename(file.path);
  if (file_name === GULP_DIR_NAME) {
    return false;
  }
  const was_lint_fixed = file.eslint !== null && file.eslint.fixed;
  if (was_lint_fixed) {
    fixed_files.push(file.path);
  }
  return was_lint_fixed;
}

function lint_check() {
  return src(LINTED_DIRS)
    .pipe(eslint(ESLINT_DO_FIX))
    .pipe(eslint.format())
    .pipe(gulpIf(isEsLintFixed, dest(OVERWRITE_FIX)))
    .pipe(eslint.failAfterError())
    .pipe(showFilename()); 
}

function lint_fix (cb) {
  const number_files_fixed = fixed_files.length;
  if (number_files_fixed===0){
    console.log('FIXED NONE');
  }else{
    fixed_files.forEach(file_path => console.log('FIXED', file_path));
  }
  cb();
}

const lint_series = series(lint_check, lint_fix);
exports.es_lint = lint_series;
