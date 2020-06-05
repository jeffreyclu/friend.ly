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

cookieController.clearChatSSIDCookie = (req, res, next) => {
  res.cookie('chatssid', undefined, { httpOnly: true });
  next();
}; // TODO where to use this?

module.exports = cookieController;
