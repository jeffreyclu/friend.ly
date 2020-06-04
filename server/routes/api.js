const express = require('express');
const usersController = require('../controllers/usersController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.get('/getusers',
  sessionController.isLoggedIn,
  usersController.getUsers,
  (req, res) => res.json(res.locals.users));

router.post('/adduser',
  usersController.checkUsername,
  usersController.addUser,
  cookieController.setSSIDCookie,
  (req, res) => res.json(res.locals.userCreated));

router.post('/edituser',
  sessionController.isLoggedIn,
  usersController.editUser,
  (req, res) => res.json(res.locals.result));

router.get('/getpotentials',
  usersController.getCurrentUser,
  usersController.getPotentials,
  usersController.addPotentialMatches,
  (req, res) => {
    res.json({
      potentialMatches: res.locals.potentialMatches,
      result: res.locals.result,
    });
  });

router.post('/syncpotentials',
  usersController.getCurrentUser,
  usersController.syncPotentialMatches,
  (req, res) => {
    res.json(res.locals.result);
  });

router.post('/addmatch',
  usersController.getCurrentUser,
  usersController.addMatch,
  (req, res) => {
    res.json(res.locals.result);
  });


module.exports = router;
