import { adminApp } from "../firebase";

function authMiddleware(request, response, next) {
  const headerToken = request.headers.authorization;
  if (!headerToken) {
    return response.send({ message: "No token provided" }).status(401);
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    response.send({ message: "Invalid token" }).status(401);
  }

  const token = headerToken.split(" ")[1];
  console.log(token);
  adminApp
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      console.log(decodedToken.email);
      console.log("Below is uid");
      console.log(uid);
    })
    .then(() => next())
    .catch((err) => response.send({ message: err }).status(403));
}

export default authMiddleware;