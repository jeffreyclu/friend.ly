const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = new Schema({
  participants: { type: Array, required: true },
  messages: { type: Array, required: false },
});

const Chat = mongoose.model('chats', chatSchema);
module.exports = Chat;
