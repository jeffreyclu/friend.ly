const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.get('/createuser',
  usersController.addUser,
  (req, res) => res.status(200).json(res.locals.user));

module.exports = router;
