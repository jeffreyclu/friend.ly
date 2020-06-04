const Chat = require('../models/chatModel');
const User = require('../models/friendlyModels');
const mongoose = require('mongoose');

const chatController = {};

chatController.checkChatroom = (req, res, next) => {
  const { participant1, participant2 } = req.params;
  Chat.findOne({
    participants: participant1,
    participants: participant2,
  })
    .exec()
    .then((resp) => {
      if (resp) {
        res.locals.chatId = resp._id;
        res.locals.result = { message: 'matched' };
        res.locals.participants = [participant1, participant2];
      } else {
        res.locals.result = { message: 'not matched' };
      }
      next();
    })
    .catch(next);
};

chatController.getChats = (req, res, next) => {
  Chat.findOne({ _id: req.cookies.chatssid })
    .exec()
    .then((resp) => {
      if (resp) {
        res.locals.participants = resp.participants;
        res.locals.messages = resp.messages;
      }
      next();
    })
    .catch(next);
};

chatController.getParticipants = (req, res, next) => {
  const promises = [];
  const participants = [];
  const promise1 = User.findOne({_id: res.locals.participants[0]})
    .exec()
    .then((resp) => {
      participants.push(resp.name);
    })
    .catch(next);
  promises.push(promise1);
  const promise2 = User.findOne({ _id: res.locals.participants[1] })
    .exec()
    .then((resp) => {
      participants.push(resp.name);
    })
    .catch(next);
  promises.push(promise2);
  Promise.all(promises)
    .then(() => {
      res.locals.participants = participants;
      next();
    });
};

chatController.postMessage = (req, res, next) => {
  console.log('here', req.cookies.chatssid);
  Chat.findOneAndUpdate(
    { _id: req.cookies.chatssid },
    { $push: { messages: { sender: req.body.sender, message: req.body.message } } }
    )
    .exec()
    .then((resp) => {
      res.locals.messages = resp.messages;
      next()
    })
    .catch(next);
}

module.exports = chatController;
