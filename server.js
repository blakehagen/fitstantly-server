'use strict';

// REQUIRES //
const express  = require('./server/config/express.js');
const passport = require('passport');
require('./server/config/passport.fitbit')(passport);

// RUN EXPRESS //
let app = express();

// PASSPORT //
app.use(passport.initialize());
app.use(passport.session());

// TEST ROUTE //
app.get('/api/test', (req, res) => {
  res.status(200).send('This is working -- ' + new Date());
});

// PATH TO AUTH ROUTES //
require('./server/features/fitbitAuth/fitbitAuth.server.routes')(app, passport);

// PORT //
let port = process.env.PORT || 8100;

app.listen(port, () => {
  console.log('Listening on port ' + port);
});