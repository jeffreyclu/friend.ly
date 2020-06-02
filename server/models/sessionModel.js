const mongoose = require('mongoose');

const { Schema } = mongoose;

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 6000, default: Date.now },
  testKey: { type: String },
});

const Session = mongoose.model('sessions', sessionSchema);
module.exports = Session;
