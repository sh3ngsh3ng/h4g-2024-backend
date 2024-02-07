import { adminApp } from "../firebase";
import User from "../models/User";

export const authMiddleware = async (req, res, next) => {
  const headerToken = req.headers.authorization;

  if (!headerToken) {
    // return res.send({ message: "No token provided" }).status(401);
    console.log("Here");
    return res.redirect("http://localhost:3000/signup");
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    return res.send({ message: "Invalid token" }).status(401);
  }

  const token = headerToken.split(" ")[1];
  await adminApp
    .auth()
    .verifyIdToken(token)
    .then(async (decodedToken) => {
      const uid = decodedToken.uid;
      const isExist = await User.findOne({ uid });
      if (isExist == null) {
        return res
          .send({ message: "Account not found! Please sign up your accound." })
          .status(401);
      } else {
        req.user = uid;
      }
    })
    .then(() => next());
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
