'use strict';
// REQUIRES //
const express = require('./server/config/express.js');

// RUN EXPRESS //
let app = express();

// TEST ROUTE //
app.get('/api/test', (req, res) => {
  res.status(200).send('This is working -- ' + new Date());
});

// PORT //
let port = process.env.PORT || 8100;

app.listen(port, () => {
  console.log('Listening on port ' + port);
});