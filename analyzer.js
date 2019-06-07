const fs = require('fs');

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

exports.test = () => {
    fs.readFile('resources/requests.json', 'utf8', function(err, contents) {
        return 'blaa';
        try {
            const obj = JSON.parse(contents); // this is how you parse a string into JSON
            //console.log(obj.length);
            const sumObj = initSumObj({});

            obj.forEach(element => {
                const key =
                    element.datetime.hour + ':' + element.datetime.minute;
                sumObj[key]++;
            });
            return 'Blaa';
            return sumObj;
        } catch (ex) {
            console.log(ex);
        }
    });
};

exports.distHttpMethodStats = () => {
    const sumObj = {};
    const methods = [
        'GET',
        'HEAD',
        'POST',
        'PUT',
        'DELETE',
        'CONNECT',
        'OPTIONS',
        'TRACE',
        'PATCH',
    ];
    methods.forEach(method => {
        sumObj[method] = 0;
    });

    const content = fs.readFileSync('resources/requests.json', 'utf8');

    try {
        const requests = JSON.parse(content); // this is how you parse a string into JSON
        requests.forEach(request => {
            if (!methods.includes(request.request.method)) {
                console.log(request);
            }
            const key = request.request.method;
            sumObj[key]++;
        });
    } catch (ex) {
        console.error(ex);
    }
    console.log(sumObj);
    return sumObj;
};

exports.distHttpCodeStats = () => {
    const sumObj = {};
    const codes = [
        '100',
        '101',
        '200',
        '201',
        '202',
        '203',
        '204',
        '205',
        '206',
        '300',
        '301',
        '302',
        '303',
        '304',
        '305',
        '306',
        '307',
        '308',
        '400',
        '401',
        '402',
        '403',
        '404',
        '405',
        '406',
        '407',
        '408',
        '409',
        '410',
        '411',
        '412',
        '413',
        '414',
        '415',
        '416',
        '417',
        '421',
        '426',
        '428',
        '429',
        '431',
        '451',
        '500',
        '501',
        '502',
        '503',
        '504',
        '505',
        '506',
        '507',
        '511',
    ];
    codes.forEach(code => {
        sumObj[code] = 0;
    });

    const content = fs.readFileSync('resources/requests.json', 'utf8');

    try {
        const requests = JSON.parse(content); // this is how you parse a string into JSON
        requests.forEach(request => {
            if (!codes.includes(request.response_code)) {
                console.log(request);
            }
            const key = request.response_code;
            sumObj[key]++;
        });
    } catch (ex) {
        console.error(ex);
    }
    console.log(sumObj);
    return sumObj;
};

exports.distBodySize = () => {
    const sumObj = {};

    for (let i = 0; i < 1000; i++) {
        sumObj[i] = 0;
    }

    const content = fs.readFileSync('resources/requests.json', 'utf8');

    try {
        let requests = JSON.parse(content); // this is how you parse a string into JSON
        requests = requests.filter(req => {
            return req.response_code === '200' && req.document_size < 1000;
        });

        console.log(requests);
        requests.forEach(request => {
            const key = request.document_size;
            sumObj[key]++;
        });
    } catch (ex) {
        console.error(ex);
    }
    return sumObj;
};

exports.reqsPerMinStats = () => {
    const content = fs.readFileSync('resources/requests.json', 'utf8');

    try {
        const obj = JSON.parse(content); // this is how you parse a string into JSON
        const sumObj = this.initSumObj();

        obj.forEach(element => {
            const key = element.datetime.hour + ':' + element.datetime.minute;
            sumObj[key]++;
        });
        return sumObj;
    } catch (ex) {
        console.error(ex);
    }
};

if (require.main === module) {
    main();
}
