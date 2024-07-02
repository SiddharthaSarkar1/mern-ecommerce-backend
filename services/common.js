const passport = require("passport");

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  //TODO : this is temporary token for testing without cookie
  // token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmIyMWUzM2ZiODhhOTc0MjU1YWNmOCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMDk1NzQyNn0.JIIt-5jy1NStcjVQt-A3LJJGOyd-oIO-Kffa3JK73aM";
  
  return token;
};
