const express = require('express');
const usersController = require('../controllers/usersController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.get('/getusers',
  usersController.getUsers,
  (req, res) => res.status(200).json(res.locals.users));

router.post('/adduser',
  cookieController.setSSIDCookie,
  usersController.checkUsername,
  usersController.addUser,
  (req, res) => res.status(200).json(res.locals.userCreated));

module.exports = router;
