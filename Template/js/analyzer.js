const fs = require('fs');

fs.readFile('resources/output.json', 'utf8', function(err, contents) {
    try {
        const obj = JSON.parse(contents); // this is how you parse a string into JSON 
        //console.log(obj.length);

      } catch (ex) {
       // console.error(ex);
      }

});