'use strict'
var shared_constants = require('./sharedConstants')

var shared_methods = {

    leadingZerosDigits: function (int_id) {
        var digits_from_end = -1 * shared_constants.EPISODE_DIGITS
        var id_digits = String("00000" + int_id).slice(digits_from_end)
        return id_digits
    },



}

module.exports = shared_methods
