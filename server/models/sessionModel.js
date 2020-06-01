const mongoose = require('mongoose');

const { Schema } = mongoose;

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, index: { expires: '5m'} }, // TODO figure out how long to leave a session open for
});

const Session = mongoose.model('sessions', sessionSchema);
module.exports = Session;
