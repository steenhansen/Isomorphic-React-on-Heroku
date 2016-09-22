'use strict'

// >mocha

require('../rootAppRequire')

rootWorkingDir()

var testHelpers = rootAppRequire('test/testHelpers')

var config_environment = rootAppRequire('configEnvironment')
var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')
miscMethods.setTimeZone(config_environment.TIME_ZONE)


miscMethods.testingUncaughtException()

if (!config_environment.NODE_DATABASE.includes('/localhost/')) {
    console.log('Use localhost MongoDb for testing, not a real mlab.com database', config_environment.NODE_DATABASE)
    process.exit()
}

describe('all tests', function () {
    rootAppRequire('test/integration/saveRealToDb/success/saveRealToDb')
    rootAppRequire('test/integration/saveTestToDb/failure/saveTestToDb')
    rootAppRequire('test/integration/saveTestToDb/success/saveTestToDb')


    rootAppRequire('test/unit/diFactory/ParserTsvTextCreate')
    rootAppRequire('test/unit/miscMethods/miscMethods')
    rootAppRequire('test/unit/RsdMedia/RsdMedia')
    rootAppRequire('test/unit/makeRssXml/success/makeRssXml')
    rootAppRequire('test/unit/produceXmlRss/success/produceXmlRss')
    rootAppRequire('test/unit/saveXmlToDb/success/saveXmlToDb')
    rootAppRequire('test/unit/saveMediaToDb/failure/saveMediaToDB')
    rootAppRequire('test/unit/saveMediaToDb/success/saveMediaToDB')
    rootAppRequire('test/unit/upsertMedia/success/upsertMedia')

    rootAppRequire('test/acceptance/component/testComponent')
    rootAppRequire('test/acceptance/clear/testClear')
    rootAppRequire('test/acceptance/filter/testFilter')
    rootAppRequire('test/acceptance/genre/testGenre')
    rootAppRequire('test/acceptance/sort/testSort')

})





