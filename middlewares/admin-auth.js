const jwt = require("jsonwebtoken");

function AdminAuth(req, res, next) {
  const { headers } = req;
  const { authorization } = headers;

  if (authorization) {
    const decoded = jwt.verify(authorization, process.env.SECRET_KEY);
    if (decoded) {
      next();
    } else {
      res.status(401).json({ status: "error", message: "Not Authorized" });
    }
  } else {
    res.status(401).json({ status: "error", message: "Not Authorized" });
  }
}

module.exports = AdminAuth;

// client > Nodejs > Middleware > Route
