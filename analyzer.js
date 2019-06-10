const fs = require('fs');

const constants = require('./constants');

/*
 *
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

exports.distHttpCodeStats = requests => {
    const sumObj = {};
    const codes = constants.STATUS_CODES;
    codes.forEach(code => {
        sumObj[code] = 0;
    });

    requests.forEach(request => {
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

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    // return sumObj.sort(function(a, b){return b-a});
    return sortable;
};

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

exports.reqsPerMinStats = requests => {
    const sumObj = this.initSumObj();
    requests.forEach(req => {
        const key = req.datetime.hour + ':' + req.datetime.minute;
        sumObj[key]++;
    });
    return sumObj;
};

exports.getStats = () => {
    const content = fs.readFileSync('resources/requests.json', 'utf8');
    let stats = {};
    try {
        const requests = JSON.parse(content); // this is how you parse a string into JSON
        stats = {
            reqsPerMin: this.reqsPerMinStats(requests),
            distHttpMethods: this.distHttpMethodStats(requests),
            distHttpCodeStats: this.distHttpCodeStats(requests),
            distBodySize: this.distBodySize(requests),
        };
    } catch (ex) {
        console.error(ex);
    }

    return stats;
};

const main = () => {
    const res = this.distHttpMethodStats();
};

if (require.main === module) {
    main();
}
