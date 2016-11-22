'use strict'

// >mocha

require('../rootAppRequire')

rootWorkingDir()

var testHelpers = rootAppRequire('test/testHelpers')

var config_environment = rootAppRequire('configEnvironment')
var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')
miscMethods.setTimeZone(config_environment.TIME_ZONE)

global.Method_logger = rootAppRequire('mediaServer/modules/base/MethodLogger')('logs', 'test')
global.Method_logger.clearAll();
miscMethods.testingUncaughtException()

if (!config_environment.NODE_DATABASE.includes('/localhost/')) {
    console.log('Use localhost MongoDb for testing, not a real mlab.com database', config_environment.NODE_DATABASE)
    process.exit()
}


describe('all tests', function () {
   
     rootAppRequire('test/acceptance/all_3/testAll3')  // [brave bart] 
   
   
   rootAppRequire('test/acceptance/podcast/clear/testClear')  // [tipping tsar]
    rootAppRequire('test/acceptance/podcast/component/testComponent')  // [hello heli] 
    rootAppRequire('test/acceptance/podcast/filter/testFilter')   // [klingon klaxon]
    rootAppRequire('test/acceptance/podcast/kind/testKind') //[boney m]
    rootAppRequire('test/acceptance/podcast/sort/testSort')  // [sunny night]
    
   
   
   
   rootAppRequire('test/acceptance/pdf/clear/testClear')  // [bubble bath]
    rootAppRequire('test/acceptance/pdf/component/testComponent')  // [cheap ceasar]
    rootAppRequire('test/acceptance/pdf/filter/testFilter')   // [tisk task]
    rootAppRequire('test/acceptance/pdf/sort/testSort')  // [jingoistic jallopy]
   
   rootAppRequire('test/acceptance/rsd/clear/testClear')  // [defending defenestration]
    rootAppRequire('test/acceptance/rsd/component/testComponent')  // [orange olive] 
    rootAppRequire('test/acceptance/rsd/filter/testFilter')   // [voting vixen]
    rootAppRequire('test/acceptance/rsd/genre/testGenre') //[silicon feet]
    rootAppRequire('test/acceptance/rsd/sort/testSort')  // [low budget]
    
    
    rootAppRequire('test/integration/saveRealToDb_p4/success/saveRealToDb_pass')  // [dancing dane] 
    rootAppRequire('test/integration/saveRealToRss_p5/success/saveRealToRss_pass')  // [catapulting cars]
    
   
   
   
    rootAppRequire('test/integration/saveTestToDb/failure/saveTestToDb_fail')   //[yuletide yak][zero zebra][fancy flags][grim gold][indian iris][red blue][strong bad]
     //[artificial art][somber sombraro][goofy golf][trex apex][same same]
    
    rootAppRequire('test/integration/saveTestToDb/success/saveTestToDb_pass') //[eloping elephants] [dread deer]
   
    
    rootAppRequire('test/unit/BaseMedia/VersionStorage_insertRows')  //[clinky cranky]
    rootAppRequire('test/unit/BaseMedia/VersionStorage_saveNewVersion')  //[stoned stones]
    rootAppRequire('test/unit/diFactory/ParserTsvTextCreate') //[the big club]
    rootAppRequire('test/unit/miscMethods/miscMethods')  // [xerox xerces] [happy hippos][jinxed jallopy][kinky kill] [lame limerick]
    rootAppRequire('test/unit/ParserTsvFile/_getTsvText/_getTsvText')  //  [maroon moon]
    rootAppRequire('test/unit/ParserTsvText/allRows/allRows')  // [nattering nabobs]
    rootAppRequire('test/unit/ParserTsvText/getTitles/getTitles')  // [opposite orangutans] 
    rootAppRequire('test/unit/ParserTsvUrl/_getTsvText/_getTsvText')  //[primative pals] [quaint quisling] 
    rootAppRequire('test/unit/RsdMedia/getDocument') // [riksy rhino]
    rootAppRequire('test/unit/RsdMedia/saveDocument')    // [thanks obama]
    rootAppRequire('test/unit/RsdMedia/saveItem') // [slathering snakes]
    rootAppRequire('test/unit/RsdMedia/upsertDocument') // [timorous tigers] 
    rootAppRequire('test/unit/saveItemsToDb_saveRssToDb/success/saveItemsToDb_saveRssToDb_pass') // [thirsty thistle] [flip fantasia]
    rootAppRequire('test/unit/saveMediaToDb/failure/saveMediaToDB_fail')   // [evolving eel]
    rootAppRequire('test/unit/saveMediaToDb/success/saveMediaToDB_pass') //[foolish fan]
    rootAppRequire('test/unit/saveXmlToDb/success/saveXmlToDb_pass')      // [belittled beatle]
    rootAppRequire('test/unit/VariablesTsvFile/_getTsvText/_getTsvText') // [urgent ugly] 
    rootAppRequire('test/unit/VariablesTsvText/allVariables/allVariables') //[vivacious vixen]
    rootAppRequire('test/unit/variablesTsvUrl/_getTsvText/_getTsvText')  // [witless wombat]
    
   
   

    

})





