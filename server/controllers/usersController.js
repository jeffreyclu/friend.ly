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
  console.log('here');
  User.create(req.body)
    .then((resp) => {
      console.log(resp);
      res.locals.user = resp;
      next();
    })
    .catch(next);
};

module.exports = usersController;
