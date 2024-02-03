import { adminApp } from "../firebase";
import User from "../models/User";

export const authMiddleware = (req, res, next) => {
  const headerToken = req.headers.authorization;
  if (!headerToken) {
    return res.send({ message: "No token provided" }).status(401);
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    res.send({ message: "Invalid token" }).status(401);
  }

  const token = headerToken.split(" ")[1];
  adminApp
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const uid = decodedToken.uid;

      if (User.exists({uid})) {
        return res.send({message: "Account is not created. Please proceed to create account."}.status(401));
      }

      req.user = uid;
    })
    .then(() => next())
    .catch((err) => res.send({ message: err }).status(403));
};

export const registerMiddleware = (req, res, next) => {
  const headerToken = req.headers.authorization;
  if (!headerToken) {
    return res.send({ message: "No token provided" }).status(401);
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    res.send({ message: "Invalid token" }).status(401);
  }

  const token = headerToken.split(" ")[1];
  adminApp
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      const email = decodedToken.email;
      req.user = { uid, email };
    })
    .then(() => next())
    .catch((err) => res.send({ message: err }).status(403));
};
