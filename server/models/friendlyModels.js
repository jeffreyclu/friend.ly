const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://jeffb:jeffb2020!@cluster0-cfqng.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'friendly',
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const { Schema } = mongoose;

const usersSchema = new Schema({
  name: String,
  age: Number,
  gender: String,
  city: String,
  primary_interest: String,
  secondary_interest: String,
});

const User = mongoose.model('users', usersSchema);

module.exports = User;
