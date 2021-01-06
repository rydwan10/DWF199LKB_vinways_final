const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  let header, token;

  console.log(header, token);
  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  ) {
    return res.status(401).send({
      status: "Response Fail",
      error: {
        message: "Access Denied",
      },
    });
  }

  try {
    const privateKey = process.env.JWT_PRIVATE_KEY;
    const verifiedToken = jwt.verify(token, privateKey);

    req.userId = verifiedToken;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      status: "Response Fail",
      error: {
        message: "Invalid Token",
      },
    });
  }
};
