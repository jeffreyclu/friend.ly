require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGO_URI = process.env.DB_URI;
const SALT_WORK_FACTOR = 10; // TODO dotenv node package - makes a .env that doesn't get uploaded to github. manual upload to production server

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'friendly',
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const { Schema } = mongoose;

const usersSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  city: { type: String, required: true },
  primary_interest: { type: String, required: true },
  secondary_interest: { type: String, required: false },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: false },
  avatar: { type: String, required: false },
  potentialMatches: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  matchedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  doubleMatched: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

usersSchema.pre('save', function (next) {
  const user = this;
  // eslint-disable-next-line prefer-arrow-callback
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }
    // eslint-disable-next-line prefer-arrow-callback
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model('users', usersSchema);

module.exports = User;
