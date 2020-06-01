const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
  Session.findOne({ cookieId: req.cookies.ssid })
    .then((resp) => {
      if (resp) res.locals.session = true;
      next();
    })
    .catch(next);
};

// TODO FIX THIS
sessionController.addSession = (req, res, next) => {
  Session.create({ cookieId: res.locals.userId })
    .then(next)
    .catch(next);
};

module.exports = sessionController;
