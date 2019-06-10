// access to the file
const fs = require('fs');

const constants = require('./constants');

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
        .split('\r\n');
    return requestLines;
};

exports.cleanLines = lines => {
    return lines.map(line => {
        return line;
    });
};

exports.checkLines = lines => {
    let id = 0;
    let errors = 0;
    lines.map(line => {
        lineParts = this.splitLine(line);
        id++;
        if (lineParts.length !== 8) {
            console.log(id + ' ' + lineParts.length + ' ' + line);
            errors++;
        }
    });

    console.log('Total:' + lines.length);
    console.log('Errors: ' + errors);
};

exports.splitLine = line => {
    const lp = line.split('"');
    const lp1 = lp.shift().trim();
    const lp3 = lp.pop().trim();
    let lp2 = lp.join('"');

    const lp1Parts = lp1.split(' ');
    const lp3Parts = lp3.split(' ');

    const host = lp1Parts[0];
    const time = lp1Parts[1];
    const response_code = lp3Parts[0];
    const document_size = lp3Parts[1];

    let hasMethod = false;
    for (const method of constants.HTTP_METHODS) {
        if (lp2.startsWith(method)) {
            hasMethod = true;
            break;
        }
    }

    if (!hasMethod) {
        lp2 = 'GET ' + lp2;
    }
    const lp2Parts = lp2.split(' ');
    const method = lp2Parts.shift();
    let rest = lp2Parts.join(' ');

    if (!rest.endsWith(' HTTP/1.0')) rest += ' HTTP/1.0';

    rest = rest.split(' ');
    const protoParts = rest.pop().split('/');

    const protocol = protoParts[0];
    const protocol_version = protoParts[1];
    const url = rest.join(' ');

    return [
        host,
        time,
        method,
        url,
        protocol,
        protocol_version,
        response_code,
        document_size,
    ];
};

exports.createReqParts = (lp2, lp3, lp4, lp5) => {
    const reqObj = {};
    reqObj.method = lp2;
    reqObj.url = lp3;
    const protoParts = lp4.split('/');
    reqObj.protocol = protoParts[0];
    reqObj.protocol_version = lp5;
    return reqObj;
};

exports.createReqObj = (lineParts, id) => {
    const reqObj = {};
    reqObj.id = id;
    reqObj.host = lineParts[0];
    reqObj.datetime = this.createTimeObj(this.getTimeParts(lineParts[1]));
    reqObj.request = this.createReqParts(
        lineParts[2],
        lineParts[3],
        lineParts[4],
        lineParts[5]
    );
    reqObj.response_code = lineParts[6];
    reqObj.document_size = lineParts[7];
    reqObj.valid = false;
    return reqObj;
};

exports.validateReqObj = reqObj => {
    try {
        decodeURIComponent(reqObj.request.url);
        reqObj.valid = true;
    } catch (err) {
        console.log(reqObj.request.url);
        console.log(err);
    }
    return reqObj;
};

exports.createReqsArr = () => {
    const reqLines = this.cleanLines(this.readFile('resources/epa-http.txt'));
    this.checkLines(reqLines);
    let id = 0;
    const objArr = [];
    reqLines.forEach(reqLine => {
        const lineParts = this.splitLine(reqLine);
        const reqObj = this.createReqObj(lineParts, ++id);
        if (lineParts.length === 8) {
            this.validateReqObj(reqObj);
        }
        objArr.push(reqObj);
    });
    return objArr;
};

const main = () => {
    const objArr = this.createReqsArr();

    fs.writeFile(
        'resources/requests.json',
        JSON.stringify(objArr, null, 4),
        function(err) {
            if (err) {
                return console.log(err);
            }
        }
    );
};

if (require.main === module) {
    main();
}
