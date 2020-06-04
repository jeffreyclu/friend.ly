const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.userId, { httpOnly: true });
  next();
};

cookieController.logout = (req, res, next) => {
  res.cookie('ssid', undefined, { httpOnly: true });
  next();
};

cookieController.setChatSSIDCookie = (req, res, next) => {
  res.cookie('chatssid', res.locals.chatId, { httpOnly: true });
  next();
};

module.exports = cookieController;
