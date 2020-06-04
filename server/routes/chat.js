const express = require('express');
const usersController = require('../controllers/usersController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');
const chatController = require('../controllers/chatController');
const path = require('path');

const router = express.Router();

router.get('/:participant1/:participant2',
  chatController.getChatroom,
  (req, res) => res.json(res.locals.result));

module.exports = router;
