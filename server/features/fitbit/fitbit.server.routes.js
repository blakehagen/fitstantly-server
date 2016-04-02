'use strict';

const request         = require('request');
const Promise         = require('bluebird');
const BRequest        = Promise.promisify(request, {multiArgs: true});
const FITBIT_BASE_URL = 'https://api.fitbit.com/1/user/-';

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

    let fitbitResults  = [];
    let fitbitRequests = [
      {
        url: FITBIT_BASE_URL + '/profile.json',
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${userCredentials.accessToken}`
        }
      },
      {
        url: FITBIT_BASE_URL + '/activities/date/today.json',
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${userCredentials.accessToken}`
        }
      },
      {
        url: FITBIT_BASE_URL + '/activities/steps/date/today/7d.json',
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${userCredentials.accessToken}`
        }
      },
      {
        url: FITBIT_BASE_URL + '/activities/minutesVeryActive/date/today/7d.json',
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${userCredentials.accessToken}`
        }
      },
      {
        url: FITBIT_BASE_URL + '/activities.json',
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${userCredentials.accessToken}`
        }
      }
    ];


    // let options = {
    //   url: 'https://api.fitbit.com/1/user/-/activities/date/today.json',
    //   method: 'GET',
    //   headers: {
    //     "Authorization": `Bearer ${userCredentials.accessToken}`
    //   }
    // };


    BRequest(fitbitRequests[4])
      .spread((response, body) => {
        // console.log(body);
        res.status(500).json(body);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      })
  });
};