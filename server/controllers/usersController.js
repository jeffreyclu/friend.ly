const models = require('../models/friendlyModels');

const usersController = {};

usersController.addCharacter = (req, res, next) => {
  models.User.create(req.body)
    .then((resp) => {
      res.locals.user = resp;
      next();
    })
    .catch(next);
};

module.exports = usersController;
