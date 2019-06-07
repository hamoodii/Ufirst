const assert = require('chai').assert;

const analyzer = require('../analyzer');

describe('analyzer', function() {
    describe('initSumObj()', function() {
        const result = analyzer.initSumObj();
        it("should return type {}", function() {
            assert.isObject(result, 'we expected {}-type here!');
        });

        it('should be size 1440', function() {

        });
    });
});