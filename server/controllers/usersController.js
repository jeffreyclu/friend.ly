const bcrypt = require('bcryptjs');
const User = require('../models/friendlyModels');
const Session = require('../models/sessionModel');

const usersController = {};

// TODO do something with the list of users
usersController.getUsers = (req, res, next) => {
  if (res.locals.session === true) {
    User.find()
      .exec()
      .then((resp) => {
        res.locals.users = resp;
        next();
      })
      .catch(next);
  } else {
    next(); // TODO add "please login" page
  }
};

usersController.addUser = (req, res, next) => {
  User.create(req.body)
    .then((resp) => {
      const ssid = resp._id;
      res.locals.userId = ssid;
      res.locals.userCreated = true;
      Session.create({ cookieId: ssid });
      next();
    })
    .catch(next);
};

usersController.checkUsername = (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then((resp) => {
      if (resp.length === 0) {
        res.locals.newUser = req.body;
        next();
      } else {
        res.json(false);
      }
    })
    .catch(next);
};

usersController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  User.find({ username })
    .exec()
    .then((resp) => {
      if (resp.length === 0) {
        res.locals.result = { message: 'user not found' };
        next();
      } else {
        const storedHash = resp[0]._doc.password;
        bcrypt.compare(password, storedHash, (err, isMatch) => {
          if (!isMatch) res.locals.result = { message: 'incorrect password' };
          else {
            const ssid = resp[0]._doc._id;
            res.locals.userId = ssid;
            res.locals.result = { message: 'user found' };
            Session.create({ cookieId: ssid });
          }
          next();
        });
      }
    })
    .catch(next);
};

usersController.getCurrentUser = (req, res, next) => {
  const userId = req.cookies.ssid;
  User.findOne({ _id: userId })
    .exec()
    .then((resp)=>{
      if (resp) res.locals.currentUser = resp;
      next();
    })
    .catch(next);
};

usersController.matchUsers = (req, res, next) => {
  const user = res.locals.currentUser;
  if (user) {
    User.find({ city: user.city, primary_interest: user.primary_interest })
      .then((resp) => {
        if (resp) {
          const matchedUsers = resp.filter(match=>match.username !== user.username)
          res.locals.matchedUsers = matchedUsers;
        }
        next();
      })
      .catch(next);
  }
};

module.exports = usersController;
