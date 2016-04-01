'use strict';

const request  = require('request');
const Promise  = require('bluebird');
const BRequest = Promise.promisify(request, {multiArgs: true});

module.exports = (app, passport) => {

  let fitbitAuthenticate = passport.authenticate('fitbit', {
    successRedirect: '/auth/fitbit/success',
    failureRedirect: '/auth/fitbit/failure'
  });

  app.get('/auth/fitbit', fitbitAuthenticate);

  app.get('/auth/fitbit/callback', fitbitAuthenticate);

  app.get('/auth/fitbit/success', (req, res) => {

    let userCredentials = {
      userId: req.user.profile.id,
      accessToken: req.user.accessToken,
      refreshToken: req.user.refreshToken
    };

    let options = {
      url: 'https://api.fitbit.com/1/user/-/activities/steps/date/today/7d.json',
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${userCredentials.accessToken}`
      }
    };

    BRequest(options).spread((response, body) => {
      console.log([body]);

      res.status(200).json([body]);
    });

  });
};