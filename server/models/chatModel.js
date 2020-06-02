const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = new Schema({
  sender: { type: String, required: true },
  recepient: { type: String, required: true },
  message: { type: String, required: true },
});

const Chat = mongoose.model('chats', chatSchema);
module.exports = Chat;