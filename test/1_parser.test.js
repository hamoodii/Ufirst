const fs = require('fs');

const assert = require('chai').assert;

const parser = require('../parser');

describe('parser', function() {
    describe('readFile()', function() {
        const result = parser.readFile('resources/epa-http.txt');
        it('should return type []', function() {
            assert.isArray(result, 'we expected []-type here!');
        });

        it('should return array-content', function() {
            assert.lengthOf(result, 47748, 'we expected 47,748 requests');
        });
    });

    describe('splitLine()', function() {
        const line =
            '141.243.1.172 [29:23:53:25] "GET /Software.html HTTP/1.0" 200 1497';
        const result = parser.splitLine(line);

        it('should be []', function() {
            assert.isArray(result, 'we expected []-type here!');
        });
    });

    describe('getTimeParts()', function() {
        const result = parser.getTimeParts('[29:23:53:25]');
        it('should return type []', function() {
            assert.isArray(result, 'we expected []-type here!');
        });

        it('should be length 4', function() {
            assert.lengthOf(result, 4, 'we expected length 4');
        });

        it('should keep order', function() {
            const expected = ['29', '23', '53', '25'];
            assert.deepEqual(result, expected);
        });
    });

    describe('createTimeObj()', function() {
        const result = parser.createTimeObj(['29', '23', '53', '25']);
        it('should be {}-type', function() {
            assert.isObject(result, 'we expected {} here!');
        });

        it('should have the size 4', function() {
            assert.lengthOf(Object.keys(result), 4, 'we expected size 4');
        });
    });

    describe('createReqParts()', function() {
        const result = parser.createReqParts(
            'GET',
            '/Software.html',
            'HTTP/1.0'
        );

        it('should be {}-type', function() {
            assert.isObject(result, 'we expected {} here!');
        });

        it('should have the size 4', function() {
            assert.lengthOf(Object.keys(result), 4, 'we expected size 4');
        });
    });

    describe('createReqObj()', function() {
        const lineParts = [
            '141.243.1.172',
            '[29:23:53:25]',
            'GET',
            '/Software.html',
            'HTTP/1.0',
            '200',
            '1497',
        ];
        const result = parser.createReqObj(lineParts, 1);
        it('should be {}', function() {
            assert.isObject(result, 'we expected {}-type here!');
        });

        it('should have 7 main-keys', function() {
            assert.lengthOf(Object.keys(result), 7, 'we expected 7 main-keys');
        });

        it('should have the correct key-names', function() {
            const keys = [
                'id',
                'host',
                'datetime',
                'request',
                'response_code',
                'document_size',
                'valid',
            ];
            assert.deepEqual(
                Object.keys(result),
                keys,
                'we expected the correct key-names!'
            );
        });

        it('should check object-values', function() {
            assert.isNumber(result.id, 'we expected number here!');
            assert.isString(result.host, 'we expected string here!');
            assert.isNotEmpty(result.host, 'we expected value here!');
            assert.isObject(result.datetime, 'we expected {} here!');
        });
    });

    describe('createReqsArr()', function() {
        const result = parser.createReqsArr();
        it('should be []', function() {
            assert.isArray(result, 'we expected [] here!');
        });
    });
});
