/*
 Rational: Call tests so that WebStorm can debug them

 rsd> node call-tests-programatically.js

 */

var Mocha = require('mocha'),       //  https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically
    fs = require('fs'),
    path = require('path')

var mocha = new Mocha()          // Instantiate a Mocha instance.
var testDir = 'test'


fs.readdirSync(testDir).filter(function (file) {         // Add each .js file to the mocha instance
    return file.substr(-3) === '.js'                   // Only keep the .js files
}).forEach(function (file) {
    mocha.addFile(
        path.join(testDir, file)
    )
})

mocha.run(function (failures) {           // Run the tests.
    process.on('exit', function () {
        process.exit(failures)          // exit with non-zero status if there were failures
    })
})