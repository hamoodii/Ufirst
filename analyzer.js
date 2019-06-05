const fs = require('fs');


/*
*
*/
const initSumObj = (sumObj => {
  for (let hour = 0; hour < 24; hour++ ) {
    for (let minute = 0; minute < 60; minute++) {
      const key = hour.toString().padStart(2, '0') 
                  + ':'
                  + minute.toString().padStart(2, '0');
      sumObj[key] = 0;
    }
  }
  return sumObj;
});


fs.readFile('resources/output.json', 'utf8', function(err, contents) {
    try {
        const obj = JSON.parse(contents); // this is how you parse a string into JSON 
        //console.log(obj.length);
        const sumObj = initSumObj({});
        obj.forEach(element => {
          const key = element.datetime.hour + ':' + element.datetime.minute;
          
          sumObj[key]++;
        });
        let i = 0;
        for ( const k in sumObj ){
          const minutes = document.getElementById(requestsPerMinuteChart);
          minutes.innerHTML.console.log(k + " -> " + sumObj[k]);
          i++;
        }
        console.log(Object.keys(sumObj).length);
      } catch (ex) {
        console.error(ex);
      }

});


