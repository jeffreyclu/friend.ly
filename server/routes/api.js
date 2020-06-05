const express = require('express');
const usersController = require('../controllers/usersController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');
const chatController = require('../controllers/chatController');

const router = express.Router();

router.post('/adduser',
  usersController.checkUsername,
  usersController.addUser,
  cookieController.setSSIDCookie,
  (req, res) => res.json(res.locals.userCreated));

router.post('/edituser',
  sessionController.isLoggedIn,
  usersController.editUser,
  chatController.deleteChat,
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

router.post('/checkformatch',
  usersController.getCurrentUser,
  usersController.checkForMatch,
  (req, res) => {
    res.json(res.locals.result);
  });

router.post('/getuserinfo',
  usersController.getUserInfo,
  (req, res) => {
    res.json(res.locals.userInfo);
  });

module.exports = router;
