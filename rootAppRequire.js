'use strict'

global.rootAppRequire = function (name) {
    var app_root_dir = __dirname + '/' + name
    return require(app_root_dir)
}

global.fromAppRoot = function (abs_filepath) {
    var from_app_root = __dirname + '/' + abs_filepath
    return from_app_root
}

global.rootWorkingDir = function () {
    try {
        process.chdir(__dirname)      // Swig module needs this
    } catch (err) {
        global.Method_logger.chronicle('error', 'chdir', module.filename, 'directory', directory, 'err', err)
    }
}
