import cors from "cors";
import express from "express";
import fs from "fs";
import authMiddleware from "./middleware/auth-middleware";
const mongoose = require("mongoose");


require("dotenv").config();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();


// apply middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// db
mongoose
  .connect(process.env.CLOUD_DATABASE, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));

// route
fs.readdirSync("./routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);


app.get("/test", authMiddleware, (req, res) => {
  res.send("Hello world from node js");
  User.find(req.uid)
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
