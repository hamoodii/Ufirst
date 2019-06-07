const express = require('express');
const path = require('path');

const analyzer = require('./analyzer');

const PORT = process.env.PORT || 5000

const app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'));

  app.get('/ajax/test.json', (req, res) => {
    console.log(analyzer.reqsPerMinStats());
    res.send(
      JSON.stringify(
        analyzer.reqsPerMinStats()
      )
    );
  });
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))