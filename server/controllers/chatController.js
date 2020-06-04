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
  const promises = [];
  let participants = [];
  let participantIds = [];
  const promise1 = Chat.findOne({ _id: req.cookies.chatssid })
    .exec()
    .then((resp) => {
      if (resp) {
        participantIds = resp.participants;
        res.locals.messages = resp.messages;
      }
      next();
    })
    .catch(next);
  promises.push(promise1);
  const promise2 = User.find(mongoose.mongo.ObjectID(participantIds[0]))
    .exec()
    .then((resp) => {
      if (resp) {
        participants[0] = resp.name;
      }
    })
    .catch(next);
  promises.push(promise2);
  const promise3 = User.findOne(participantIds[1])
    .exec()
    .then((resp) => {
      if (resp) {
        console.log(resp.name)
        participants[1] = resp.name;
      }
    })
    .catch(next);
  promises.push(promise3);
  Promise.all(promises)
    .then(() => {
      console.log(participants);
      res.locals.participants = participants;
    });
};

module.exports = chatController;
