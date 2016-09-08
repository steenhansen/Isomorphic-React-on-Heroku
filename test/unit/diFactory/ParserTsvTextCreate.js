'use strict'

var the_information = rootAppRequire('mediaServer/modules/rsdInformation')
var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(the_information)

var expect = require('expect')


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('test/unit/diFactory/ParserTsvTextCreate.js', function () {
    it("should return a Error when called with a header mismatch", function () {
        var tsv = '#Welcome\n"title","author","pdf link 1"\n"a1","t1","x.pdf"\n"a2","t2","z.pdf"'
        var parser_tsv_text = di_factory.ParserTsvTextCreate(tsv)
        var not_an_array = 'is not array'
        var error_not_array = parser_tsv_text._firstRow(not_an_array)

        expect(error_not_array).toBeA(Error)
        expect(error_not_array.message).toBe("output_array parameter is not an array")

    })
})