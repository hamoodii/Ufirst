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
