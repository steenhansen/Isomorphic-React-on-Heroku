'use strict'
//var shared_constants = require('./sharedConstants')

var shared_methods = {

    sizeOfLargestId: function (first_id){
       var first_number = 0 + first_id
          if (first_number>9999){
            var episode_digits = 5
        }else if (first_number>999){
            var episode_digits = 4
        } else{
           var episode_digits = 3
        }
        return episode_digits
    },

    leadingZerosDigits: function (episode_digits, int_id) {
        var digits_from_end = -1 * episode_digits
        var id_digits = String("00000" + int_id).slice(digits_from_end)
        return id_digits
    },



}

module.exports = shared_methods
