const fs = require('fs');

const constants = require('./constants');

/**
 * instalization an object
 *
 * @return {dict}
 */
exports.initSumObj = () => {
    const sumObj = {};
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute++) {
            const key =
                hour.toString().padStart(2, '0') +
                ':' +
                minute.toString().padStart(2, '0');
            sumObj[key] = 0;
        }
    }
    return sumObj;
};

/**
 * create an objects with keys
 *
 * @param {dict[]} requests
 *
 * @return {dict} sumObj
 */
exports.distHttpMethodStats = requests => {
    const sumObj = {};
    const methods = constants.HTTP_METHODS;
    methods.forEach(method => {
        sumObj[method] = 0;
    });

    requests.forEach(request => {
        if (!methods.includes(request.request.method)) {
            console.log(request);
        }
        const key = request.request.method;
        sumObj[key]++;
    });

    return sumObj;
};

/**
 * count which respons code was sent how many times.
 *
 * @params {dict[]} requests
 *
 * @return {array[]} sortable
 */
exports.distHttpCodeStats = requests => {
    const sumObj = {};
    const codes = constants.STATUS_CODES;
    codes.map(code => (sumObj[code] = 0));

    requests.map(request => {
        const key = request.response_code;

        if (!codes.includes(key)) {
            console.log(request);
        }
        sumObj[key]++;
    });

    const sortable = [];
    for (let obj in sumObj) {
        sortable.push([obj, sumObj[obj]]);
    }

    sortable.sort((a, b) => {
        return b[1] - a[1];
    });

    // return sumObj.sort(function(a, b){return b-a});
    return sortable;
};

/**
 *
 *
 *
 */
exports.distBodySize = requests => {
    const sumObj = {};

    for (let i = 0; i < 1000; i++) {
        sumObj[i] = 0;
    }

    requests = requests.filter(
        req => req.response_code === '200' && req.document_size < 1000
    );

    requests.forEach(request => {
        const key = request.document_size;
        sumObj[key]++;
    });
    return sumObj;
};

/**
 *
 *
 *
 */
exports.reqsPerMinStats = requests => {
    const sumObj = this.initSumObj();
    requests.forEach(req => {
        const key = req.datetime.hour + ':' + req.datetime.minute;
        sumObj[key]++;
    });
    return sumObj;
};

/**
 *
 *
 *
 */
exports.getRequestsJSON = path => {
    const content = fs.readFileSync('resources/requests.json', 'utf8');
    let requests = [];
    try {
        requests = JSON.parse(content);
    } catch (ex) {
        console.error(ex);
    }
    return requests;
};

/**
 *
 *
 *
 */
exports.getStats = () => {
    let stats = {};
    const requests = this.getRequestsJSON(); // this is how you parse a string into JSON
    stats = {
        reqsPerMin: this.reqsPerMinStats(requests),
        distHttpMethods: this.distHttpMethodStats(requests),
        distHttpCodeStats: this.distHttpCodeStats(requests),
        distBodySize: this.distBodySize(requests),
    };

    return stats;
};

const main = () => {
    const res = this.distHttpMethodStats();
};

if (require.main === module) {
    main();
}
