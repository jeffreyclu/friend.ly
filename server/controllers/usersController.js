const bcrypt = require('bcryptjs');
const User = require('../models/friendlyModels');
const Session = require('../models/sessionModel');

const usersController = {};

usersController.getUsers = (req, res, next) => {
  console.log('here');
  User.find()
    .exec()
    .then((resp) => {
      console.log(resp);
      res.locals.users = resp;
      next();
    })
    .catch(next);
};

usersController.addUser = (req, res, next) => {
  User.create(req.body)
    .then((resp) => {
      console.log('user created', resp);
      res.locals.userCreated = true;
      next();
    })
    .catch(next);
};

usersController.checkUsername = (req, res, next) => {
  console.log('validating user');
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
  console.log(username, password);
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
            Session.create({ cookieId: ssid })
          }
          next();
        });
      }
    })
    .catch(next);
};

module.exports = usersController;
