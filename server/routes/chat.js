const express = require('express');
const usersController = require('../controllers/usersController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');
const chatController = require('../controllers/chatController');
const path = require('path');

const router = express.Router();

router.get('/check/:participant1/:participant2',
  chatController.checkChatroom,
  cookieController.setChatSSIDCookie,
  (req, res) => {
    if (res.locals.result.message === 'matched') res.redirect('/chatroom');
    else res.redirect('/dashboard');
  });

router.get('/chats',
  chatController.getChats,
  chatController.getParticipants,
  (req, res) => {
    res.json({ messages: res.locals.messages, participants: res.locals.participants });
  });

router.post('/postmessage',
  chatController.postMessage,
  (req, res) => {
    res.json(res.locals.messages);
  }
)

module.exports = router;
