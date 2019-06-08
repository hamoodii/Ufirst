// access to the file
const fs = require('fs');

exports.getTimeParts = timeString => {
    return timeString
        .replace('[', '')
        .replace(']', '')
        .split(':');
};

exports.createTimeObj = timeParts => {
    return {
        day: timeParts[0],
        hour: timeParts[1],
        minute: timeParts[2],
        second: timeParts[3],
    };
};

exports.readFile = path => {
    const requestLines = fs
        .readFileSync(path, 'utf8')
        .trim()
        .replace(/"/g, '')
        .split('\n');
    return requestLines;
};

exports.splitLine = line => {
    return line.split(' ');
};

exports.createReqObj = lineParts => {
    const reqObj = {};
    reqObj.id = 0;
    reqObj.host = lineParts[0];
    reqObj.datetime = this.createTimeObj(this.getTimeParts(lineParts[1]));
    reqObj.request = lineParts[2];
    reqObj.response_code = lineParts[3];
    reqObj.document_size = lineParts[4];
    reqObj.valid = true;
    return reqObj;
};

const main = () => {
    fs.readFile('resources/epa-http.txt', 'utf8', (err, contents) => {
        const lines = contents
            .replace(/"/g, '')
            .split('\n')
            .filter(line => line.trim().length);
        const objArr = [];
        const errArr = [];
        let id = 0;
        lines.forEach(line => {
            const lineParts = line.split(' ');
            const obj = {};
            obj.id = ++id;
            obj.host = lineParts[0];

            const timeParts = this.getTimeParts(lineParts[1]);
            obj.datetime = {};
            obj.datetime.day = timeParts[0];
            obj.datetime.hour = timeParts[1];
            obj.datetime.minute = timeParts[2];
            obj.datetime.second = timeParts[3];

            obj.request = {};
            obj.request.method = lineParts[2];
            obj.request.url = lineParts[3];
            const protocolParts = lineParts[4].split('/');
            obj.request.protocol = protocolParts[0];
            obj.request.protocol_version = protocolParts[1];

            obj.response_code = lineParts[5];
            obj.document_size = parseInt(lineParts[6]);
            if (lineParts.length === 7) {
                objArr.push(obj);
            } else {
                errArr.push(obj);
            }
        });
        fs.writeFile(
            'resources/requests.json',
            JSON.stringify(objArr),
            function(err) {
                if (err) {
                    return console.log(err);
                }
            }
        );
        fs.writeFile('resources/errors.json', JSON.stringify(objArr), function(
            err
        ) {
            if (err) {
                return console.log(err);
            }
        });
    });
};

if (require.main === module) {
    main();
}
