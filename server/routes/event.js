const express = require('express');
const eventController = require('../controllers/eventController');


const router = express.Router();

router.get('/',
  eventController.getEvents,
  (req, res) => {
    res.json(res.locals.events);
  });

module.exports = router;
