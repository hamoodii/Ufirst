const assert = require('chai').assert;

const parser = require('../parser');

describe('parser', function() {
    describe('getTimeParts()', function() {
        const result = parser.getTimeParts('[29:23:53:25]');
        it("should return type []", function() {
            assert.isArray(result, 'we expected []-type here!');
        });

        it('should be length 4', function() {
            assert.lengthOf(result, 4, 'we expected length 4');
        });

        it('should keep order', function() {
            const expected = ['29', '23', '53', '25'];
            assert.deepEqual(result, expected)
        });
    });
});