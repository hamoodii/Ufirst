const assert = require('chai').assert;

const analyzer = require('../analyzer');

describe('analyzer', function() {
    const requests = analyzer.getRequestsJSON();
    describe('initSumObj()', function() {
        const result = analyzer.initSumObj();
        it('should return type {}', function() {
            assert.isObject(result, 'we expected {}-type here!');
        });

        it('should be size 1440', function() {});
    });

    describe('disHttpMethodsStats()', function() {
        const result = analyzer.distHttpMethodStats(requests);
        it('should return type {}', function() {
            assert.isObject(result, 'we expected {}-type here!');
        });

        it('should be size 9', function() {
            assert.lengthOf(Object.keys(result), 9, 'we expected size 9');
        });
    });
});
