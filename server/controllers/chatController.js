const Chat = require('../models/chatModel');

const chatController = {};

chatController.getChatroom = (req, res, next) => {
  const { participant1, participant2 } = req.params;
  Chat.findOne({
    participants: participant1,
    participants: participant2,
  })
    .exec()
    .then((resp) => {
      if (resp) {
        res.locals.result = { message: 'matched' };
      }
      next();
    })
    .catch(next);
};

module.exports = chatController;
