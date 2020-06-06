const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const usersController = require('./controllers/usersController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');
const chatController = require('./controllers/chatController');

const apiRouter = require('./routes/api');
const chatRouter = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/client', express.static(path.join(__dirname, '../client')));
app.use('/api', apiRouter);
app.use('/chatroom', chatRouter);

app.get(
  '/',
  sessionController.isLoggedIn,
  (req, res) => {
    if (res.locals.session === true) res.redirect('/dashboard');
    else res.status(200).sendFile(path.join(__dirname, '../index.html'));
  },
);

app.post(
  '/login',
  usersController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.isLoggedIn,
  (req, res) => {
    res.status(200).json({
      session: res.locals.session,
      result: res.locals.result,
    });
  },
);

app.get(
  '/dashboard',
  sessionController.isLoggedIn,
  cookieController.clearChatSSIDCookie,
  (req, res) => {
    if (res.locals.session === true) {
      res.status(200).sendFile(path.join(__dirname, '../dashboard.html'));
    } else {
      res.redirect('/');
    }
  },
);

app.get(
  '/settings',
  sessionController.isLoggedIn,
  (req, res) => {
    if (res.locals.session === true) {
      res.status(200).sendFile(path.join(__dirname, '../settings.html'));
    } else {
      res.redirect('/');
    }
  },
);

app.get(
  '/logout',
  cookieController.logout,
  (req, res) => {
    res.redirect('/');
  },
);

app.get(
  '/checklogin',
  sessionController.isLoggedIn,
  usersController.getCurrentUser,
  (req, res) => {
    res.send({
      currentSession: res.locals.session,
      currentUser: res.locals.currentUser,
      matchedUsers: res.locals.matchedUsers,
      potentialMatches: res.locals.potentialMatches,
    });
  },
);

// app.get('/addFake',
//   (req, res) => {
//     res.sendFile(path.join(__dirname, '../addFake.html'));
//   });

app.get('/notauthorized',
  (req, res) => {
    res.sendFile(path.join(__dirname, '../notauthorized.html'));
  });

app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../lost.html'));
});

app.use((err, req, res, next) => {
  // console.log(err)
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  res.json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
