const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const usersController = require('./controllers/usersController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');

const apiRouter = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/client', express.static(path.join(__dirname, '../client')));
app.use('/api', apiRouter);

app.get(
  '/',
  sessionController.isLoggedIn,
  (req, res) => {
    if (res.locals.session === true) res.redirect('/dashboard');
    else res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.post(
  '/login',
  usersController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.isLoggedIn,
  (req, res) => {
    res.status(200).json({ session: res.locals.session, result: res.locals.result });
  },
);

app.get(
  '/dashboard',
  sessionController.isLoggedIn,
  (req, res) => {
    if (res.locals.session === true) {
      res.status(200).sendFile(path.join(__dirname, '../dashboard.html'));
    } else {
      res.redirect('/');
    }
});

app.get(
  '/logout',
  cookieController.logout,
  (req, res) => {
    res.redirect('/');
});

app.get(
  '/checklogin',
  sessionController.isLoggedIn,
  usersController.getCurrentUser,
  (req, res) => {
    res.send({ currentSession: res.locals.session, currentUser: res.locals.currentUser });
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
