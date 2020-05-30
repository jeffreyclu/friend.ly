const  User = require('../models/friendlyModels');

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

module.exports = usersController;
