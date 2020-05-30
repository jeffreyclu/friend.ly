const express = require('express');
const usersController = require('../controllers/usersController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.get('/getusers',
  usersController.getUsers,
  (req, res) => res.status(200).json(res.locals.users));

router.post('/adduser',
  usersController.checkUsername,
  usersController.addUser,
  cookieController.setSSIDCookie,
  // sessionController.addSession, // TODO FIX THIS
  (req, res) => res.status(200).json(res.locals.userCreated));

module.exports = router;
