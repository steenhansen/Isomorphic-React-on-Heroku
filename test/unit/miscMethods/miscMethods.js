'use strict'

var expect = require('expect')
var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')

describe('test/unit/miscMethods/miscMethods.js', function () {

    describe('trimString()', function () {

        it('should not trim numbers', function () {
            var number_var_trimmed = miscMethods.trimString(14)
            expect(number_var_trimmed).toBeA('number')
        })

        it('should not change numbers', function () {
            var number_var_trimmed = miscMethods.trimString(14)
            expect(number_var_trimmed).toBe(14)
        })

        it('should trim blanks', function () {
            var str_trimmed = miscMethods.trimString('  word  ')
            expect(str_trimmed).toBe('word')
        })

    })
    describe('objectHasMethods()', function () {

        it('should match same', function () {
            function An_object() {
                this.method1 = function () {
                }
                this.method2 = function () {
                }
            }

            var the_object = new An_object()
            var method_names = ['method2', 'method1']
            var missing_methods = miscMethods.objectHasMethods(the_object, method_names)

            expect(missing_methods).toBe('')

        })

        it('should not match different methods', function () {
            function An_object() {
                this.method1 = function () {
                }
                this.method2 = function () {
                }
            }

            var the_object = new An_object()
            var method_names = ['method2', 'method3']
            var missing_methods = miscMethods.objectHasMethods(the_object, method_names)
            expect(missing_methods).toBe('method3')
        })

        it('should not match different types', function () {
            function An_object() {
                this.method1 = function () {
                }
                this.method2 = "a string"
            }

            var the_object = new An_object()
            var method_names = ['method1', 'method2']
            var missing_methods = miscMethods.objectHasMethods(the_object, method_names)
            expect(missing_methods).toBe('method2')
        })
    })
    describe('firstInSecond() ', function () {
        it('same should match', function () {
            var small_array = [1]
            var large_array = [1]
            var small_in_large = miscMethods.firstInSecond(small_array, large_array)
            expect(small_in_large).toBe(true)
        })

        it('small in large should match', function () {
            var small_array = [1]
            var large_array = [1, 2]
            var small_in_large = miscMethods.firstInSecond(small_array, large_array)
            expect(small_in_large).toBe(true)
        })

        it('empty should fail', function () {
            var small_array = [1]
            var large_array = []
            var small_in_large = miscMethods.firstInSecond(small_array, large_array)
            expect(small_in_large).toBe(false)
        })

        it('different should fail', function () {
            var small_array = [1]
            var large_array = [2]
            var small_in_large = miscMethods.firstInSecond(small_array, large_array)
            expect(small_in_large).toBe(false)
        })

        it('small in different order should match', function () {
            var small_array = [2, 1]
            var large_array = [1, 2]
            var small_in_large = miscMethods.firstInSecond(small_array, large_array)
            expect(small_in_large).toBe(true)
        })
    })
    describe('readLocalFile()', function () {
        it('should fail on non-existant file', function () {
            miscMethods.readLocalFile('x:/does_not_exist').then(
                function onFulfilled() {
                    expect(false)
                },
                function onRejected() {
                    expect(true)
                }
            )
        })
    })
    describe('readUrlFile()', function () {
        it('should fail on bad url', function () {
            miscMethods.readUrlFile('httx:').then(
                function onFulfilled(value) {
                    console.log('s value', value)
                    expect(false)
                },
                function onRejected(value) {
                    expect(true)
                }
            )
        })


    })

})