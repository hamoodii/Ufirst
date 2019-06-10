const assert = require('chai').assert;

const parser = require('../parser');
const constants = require('../constants');

describe('integrity test', function() {
    describe('reqObj', function() {
        const reqObjs = parser.createReqsArr();
        it('should be []', function() {
            assert.isArray(reqObjs, 'we expected []-type here!');
        });

        it('should have the length 47,748', function() {
            assert.lengthOf(reqObjs, 47748, 'we expected 47,748 here!');
        });

        it('should have 46,014 GET requests', function() {
            assert.lengthOf(
                reqObjs.filter(
                    reqObj => reqObj.valid && reqObj.request.method === 'GET'
                ),
                46014,
                'we expected 46,014 get-requests here!'
            );
        });

        it('should have 1,622 POST requests', function() {
            assert.lengthOf(
                reqObjs.filter(
                    reqObj => reqObj.valid && reqObj.request.method === 'POST'
                ),
                1622,
                'we expected 1,622 post-requests here!'
            );
        });

        it('should have 106 HEAD requests', function() {
            assert.lengthOf(
                reqObjs.filter(
                    reqObj => reqObj.valid && reqObj.request.method === 'HEAD'
                ),
                106,
                'we expected 106 head-requests here!'
            );
        });

        it('should have 6 illegal requests', function() {
            assert.lengthOf(
                reqObjs.filter(reqObj => !reqObj.valid),
                6,
                'we expected 6 illegal requests here!'
            );
        });

        it('should have no objects with impossible values', function() {
            let valuesReasonable = true;
            reqObjs.map(reqObj => {
                if (
                    typeof reqObj.id !== 'number' ||
                    reqObj.id < 1 ||
                    reqObj.id > 47748
                ) {
                    valuesReasonable = false;
                    console.log(
                        'impossible value for .id -> ' +
                            reqObj.id +
                            ' [' +
                            typeof reqObj.id +
                            ']'
                    );
                }

                if (typeof reqObj.host !== 'string' || !reqObj.host) {
                    valuesReasonable = false;
                    console.log(
                        'impossible value for .host -> ' +
                            reqObj.host +
                            ' [' +
                            typeof reqObj.host +
                            ']'
                    );
                }

                if (
                    typeof reqObj.request !== 'object' ||
                    Object.keys(reqObj.request).length !== 4
                ) {
                    valuesReasonable = false;
                    console.log(
                        'impossible value for .request -> ' +
                            reqObj.request +
                            ' [' +
                            typeof reqObj.request +
                            ']'
                    );
                }

                if (
                    typeof reqObj.request.method !== 'string' ||
                    !constants.HTTP_METHODS.includes(reqObj.request.method)
                ) {
                    valuesReasonable = false;
                    console.log(
                        'impossible value for .request.method -> ' +
                            reqObj.request.method +
                            ' [' +
                            typeof reqObj.request.method +
                            ']'
                    );
                }

                if (typeof reqObj.request.url !== 'string') {
                    valuesReasonable = false;
                    console.log(
                        'impossible value for .request.url -> ' +
                            reqObj.request.url +
                            ' [' +
                            typeof reqObj.request.url +
                            ']@' +
                            reqObj.id
                    );
                }

                if (
                    typeof reqObj.request.protocol !== 'string' ||
                    reqObj.request.protocol.toLowerCase() !== 'http'
                ) {
                    valuesReasonable = false;
                    console.log(
                        'impossible value for .request.protocol -> ' +
                            reqObj.request.protocol +
                            ' [' +
                            typeof reqObj.request.protocol +
                            ']'
                    );
                }

                if (
                    typeof reqObj.request.protocol_version !== 'string' ||
                    !['1.0', '1.1'].includes(reqObj.request.protocol_version)
                ) {
                    valuesReasonable = false;
                    console.log(typeof reqObj.request.protocol_version);
                    console.log(
                        'impossible value for .request.protocol_version -> ' +
                            reqObj.request.protocol_version +
                            ' [' +
                            typeof reqObj.request.protocol_version +
                            ']'
                    );
                }
            });
            assert.isTrue(
                valuesReasonable,
                'we expected reasonable values here!'
            );
        });
    });
});
