'use strict'
require('../rootAppRequire')
var mongoose = require('mongoose')
var fs = require('fs')
var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')
global.Method_logger = rootAppRequire('mediaServer/modules/base/MethodLogger')('logs', 'test')

var testHelpers = {

    dropCollection: function (type_media) {
        type_media.dropCollection()
    },

    dropMediaCollectionDoneCallback: function (type_media) {
        var the_func = function the_func_324(doneCallback) {
            testHelpers.dropCollection(type_media)
            doneCallback()
        }
        return the_func
    },

    testMongooseConnect: function () {
        var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')
        var config_environment = rootAppRequire('configEnvironment')
        miscMethods.connectToMongoose(config_environment.NODE_DATABASE)
    },

    sentenceDifference: function (tabs_windows_1, tabs_windows_2) {
        if (tabs_windows_1 == tabs_windows_2) {
            return ''
        }
        var sentence_windows_1 = tabs_windows_1.replace(/\t/g, '')
        var sentence_windows_2 = tabs_windows_2.replace(/\t/g, '')
        if (sentence_windows_1 == sentence_windows_2) {
            return ''
        }
        var sentence_trim_1 = sentence_windows_1.trim()
        var sentence_trim_2 = sentence_windows_2.trim()
        if (sentence_trim_1 == sentence_trim_2) {
            return ''
        }
        var sentence_unix_1 = sentence_trim_1.replace(/\r\n/g, '\n')
        var sentence_unix_2 = sentence_trim_2.replace(/\r\n/g, '\n')
        if (sentence_unix_1 == sentence_unix_2) {
            return ''
        }
        var words_1 = sentence_unix_1.split(' ')
        var words_2 = sentence_unix_2.split(' ')
        var sentence_same = []
        if (words_1.length > words_2.length) {
            var word_count = words_1.length
        }
        else {
            var word_count = words_2.length
        }
        for (var i = 0; i < word_count; i++) {
            var word_1 = words_1[i]
            var word_2 = words_2[i]
            if (word_1 == word_2) {
                sentence_same.push(word_1)
            } else {
                var diff_string = sentence_same.join(' ') + " [[[" + word_1 + "]]] <> [[[" + word_2 + "]]]"
                return diff_string
            }
        }
        return ''
    },

    angle_spaces: function (angle_str) {
        angle_str = angle_str.replace(/\s+</g, '<')
        angle_str = angle_str.replace(/>\s+/g, '>')
        return angle_str
    },

    whiteSpaceFileDiff: function (produced_file, expected_file) {
        var produced_results = fs.readFileSync(produced_file, 'utf8')
        var expected_results = fs.readFileSync(expected_file, 'utf8')
        var file_diff = testHelpers.xmlDifference(produced_results, expected_results)
        return file_diff
    },

    xmlDifference: function (xml_windows_1, xml_windows_2) {
        if (xml_windows_1 == xml_windows_2) {
            return ''
        }
        var trim_windows_1 = xml_windows_1.trim()
        var trim_windows_2 = xml_windows_2.trim()
        if (trim_windows_1 == trim_windows_2) {
            return ''
        }
        var xml_unix_1 = trim_windows_1.replace(/\s\s+/g, ' ')
        var xml_unix_2 = trim_windows_2.replace(/\s\s+/g, ' ')
        if (xml_unix_1 == xml_unix_2) {
            return ''
        }

        var xml_angles_1 = testHelpers.angle_spaces(xml_unix_1)
        var xml_angles_2 = testHelpers.angle_spaces(xml_unix_2)
        if (xml_angles_1 == xml_angles_2) {
            return ''
        }
        var split_str = '<'
        var xmls_1 = xml_angles_1.split(split_str)
        var xmls_2 = xml_angles_2.split(split_str)
        if (xmls_1.length > xmls_2.length) {
            var xml_count = xmls_1.length
        }
        else {
            var xml_count = xmls_2.length
        }
        for (var i = 0; i < xml_count; i++) {
            var xml_production_1 = xmls_1[i]
            var xml_production_2 = xmls_2[i]
            if (xml_production_1 != xml_production_2) {
                var sentence_difference = testHelpers.sentenceDifference(xml_production_1, xml_production_2)
                return sentence_difference
            }
        }
        return 'ERROR in xmlDifference(), this is unreachable'
    }

}

module.exports = testHelpers

