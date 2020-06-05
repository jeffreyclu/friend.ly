const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
  sender: {type: String, required: true },
  message: {type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const chatSchema = new Schema({
  participants: { type: Array, required: true },
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now },
});

const Chat = mongoose.model('chats', chatSchema);
module.exports = Chat;
