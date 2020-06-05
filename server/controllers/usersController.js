require('dotenv').config();
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2; // TODO investigate this
const User = require('../models/friendlyModels');
const Session = require('../models/sessionModel');
const Chat = require('../models/chatModel');

const usersController = {};

cloudinary.config(process.env.CLOUDINARY_URI);

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
    .catch(next); // TODO refactor all of this
};

usersController.editUser = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.cookies.ssid },
    {
      city: req.body.newUser.city,
      primary_interest: req.body.newUser.primary_interest,
      potentialMatches: [],
      matchedUsers: [],
    },
  )
    .exec()
    .then((resp) => {
      if (resp) res.locals.result = { message: 'success' };
      else res.locals.result = { message: 'failed' };
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
            Session.create({ cookieId: ssid }); // TODO refactor
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
    .then((resp) => {
      if (resp) {
        res.locals.currentUser = resp;
        if (resp.potentialMatches.length > 0) {
          res.locals.gotPotentials = true;
          res.locals.potentialMatches = resp.potentialMatches;
        }
        if (resp.matchedUsers.length > 0) {
          res.locals.gotMatches = true;
          res.locals.matchedUsers = resp.matchedUsers;
        }
      }
      next();
    })
    .catch(next);
};

usersController.getPotentials = (req, res, next) => {
  const user = res.locals.currentUser;
  const promises = [];
  if (user && !res.locals.gotPotentials && !res.locals.gotMatches) {
    const promise1 = User.find(
      {
        city: user.city,
        primary_interest: user.primary_interest,
      },
    )
      .exec()
      .then((resp) => {
        if (resp.length > 0) {
          const potentialMatches = resp.map((match) => {
            const { _id } = match;
            return { _id };
          });
          res.locals.potentialMatches = potentialMatches;
          res.locals.result = { message: 'got potentials' };
        }
        next();
      })
      .catch(next);
    promises.push(promise1);
  }
  Promise.all(promises)
    .then(() => {
      res.locals.result = { message: 'already matched' };
      next();
    });
};

usersController.addPotentialMatches = (req, res, next) => {
  const promises = [];
  if (res.locals.potentialMatches && res.locals.currentUser && !res.locals.gotPotentials) {
    const promise1 = User.findOneAndUpdate(
      { _id: res.locals.currentUser._id },
      { potentialMatches: res.locals.potentialMatches },
    )
      .exec()
      .then((resp) => {
        next();
      })
      .catch(next);
    promises.push(promise1);
  }
  Promise.all(promises)
    .then(() => next());
};

usersController.syncPotentialMatches = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: res.locals.currentUser._id },
    { potentialMatches: req.body },
  )
    .exec()
    .then((resp) => {
      if (resp) res.locals.result = { message: 'success' };
      else res.locals.result = { message: 'failed' };
      next();
    })
    .catch(next);
};

usersController.addMatch = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: res.locals.currentUser._id },
    { matchedUsers: req.body },
  )
    .exec()
    .then((resp) => {
      if (resp) res.locals.result = { message: 'success' };
      else res.locals.result = { message: 'failed' };
      next();
    })
    .catch(next);
};

usersController.checkForMatch = (req, res, next) => {
  console.log('checking')
  User.findOne({ _id: req.body._id })
    .then((resp) => {
      if (resp.matchedUsers.length > 0) {
        resp.matchedUsers.forEach((match) => {
          console.log('second')
          console.log(match._id, res.locals.currentUser._id)
          if (JSON.stringify(match._id) === JSON.stringify(res.locals.currentUser._id)) {
            console.log('third')
            res.locals.result = { message: "matched" };
            const participants = [match._id, req.body._id];
            Chat.create({
              participants,
            });
          }
          else {
            res.locals.result = { message: "not matched" };
          }
        });
      } else {
        res.locals.result = { message: "not matched" };
      }
      next();
    })
    .catch(next);
};

module.exports = usersController;
