'use strict';

var path = require('path');

global.rootAppRequire = function (name) {
  var app_root_dir = path.join(__dirname, '../' + name);
  //console.log('root app req', app_root_dir)
  return require(app_root_dir);
};

global.fromAppRoot = function (abs_filepath) {
  var from_app_root = path.join(__dirname, '../' + abs_filepath);
  return from_app_root;
};

// global.rootWorkingDir = function () {
//   try {
//     // throw new Error ('exception test - global.rootWorkingDir')
 
 
//   //  const swig_dirname = path.join( path.basename(__dirname));

// //console.log('ddddddddddd', swig_dirname)

//  //   process.chdir(swig_dirname); // Swig module needs this
//   } catch (e) {
//     throw e;
//   }
// };
