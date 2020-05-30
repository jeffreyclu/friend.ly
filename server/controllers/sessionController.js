const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
  Session.find({ cookieId: req.cookies.ssid })
    .then((resp) => {
      if (resp.length > 0) res.locals.session = true;
      next();
    })
    .catch(next);
};

module.exports = sessionController;
