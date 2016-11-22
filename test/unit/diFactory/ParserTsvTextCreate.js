'use strict'

var the_information = rootAppRequire('mediaServer/modules/rsdSchema')
var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(the_information)

var expect = require('expect')


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('test/unit/diFactory/ParserTsvTextCreate.js', function () {
    it("[the big club] should return a Error when called with a header mismatch", function () {
        var tsv = '#Welcome\n"title","author","pdf link 1"\n"a1","t1","x.pdf"\n"a2","t2","z.pdf"'
        var parser_tsv_text = di_factory.ParserTsvTextCreate(tsv)
        var not_an_array = 'is not array'
        var was_caught = false
        try {

            var error_not_array = parser_tsv_text._firstRow(not_an_array)
        } catch (e) {
            expect(e).toBeA(Error)
            expect(e.message).toBe("exception test - ParserTsvText.prototype._firstRow")
            was_caught = true
        }
        expect(was_caught)
    })
})
