'use strict';

module.exports = (app, passport) => {

  let fitbitAuthenticate = passport.authenticate('fitbit', {
    successRedirect: '/auth/fitbit/success',
    failureRedirect: '/auth/fitbit/failure'
  });

  app.get('/auth/fitbit', fitbitAuthenticate);

  app.get('/auth/fitbit/callback', fitbitAuthenticate);

  app.get('/auth/fitbit/success', (req, res) => {
    console.log(req.user.profile.id);
    res.send(req.user);
  });

};