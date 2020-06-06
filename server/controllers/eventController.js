const fetch = require('node-fetch');
const parser = require('fast-xml-parser');

const eventController = {};

eventController.getEvents = (req, res, next) => {
  fetch(
    'http://api.eventful.com/rest/events/search?app_key=rWRw8n5Ff9VHNRhZ&keywords=Live+Music?&date=This+Week&location=New+York+City',
  )
    .then((resp) => resp.text())
    .then((data) => {
      try {
        const jsonData = parser.parse(data, true);
        res.locals.events = jsonData.search;
      } catch (error) {
        console.log(error.message);
      }
      next();
    })
    .catch(next);
};

module.exports = eventController;
