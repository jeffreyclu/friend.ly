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
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  city: { type: String, required: true },
  primary_interest: { type: String, required: true },
  secondary_interest: { type: String, required: false },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: false },
});

const User = mongoose.model('users', usersSchema);

module.exports = User;
