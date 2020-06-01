const express = require('express');
const usersController = require('../controllers/usersController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.get('/getusers',
  sessionController.isLoggedIn,
  usersController.getUsers,
  (req, res) => res.status(200).json(res.locals.users));

router.post('/adduser',
  usersController.checkUsername,
  usersController.addUser,
  cookieController.setSSIDCookie,
  (req, res) => res.status(200).json(res.locals.userCreated));
  
router.get('/matchusers',
  usersController.getCurrentUser,
  usersController.matchUsers,
  (req, res) => res.status(200).json(res.locals.matchedUsers));

module.exports = router;
