import cors from "cors";
import express from "express";
import fs from "fs";
import { authMiddleware } from "./middleware/auth-middleware";
import { generatorFromPdf, generatorFromScratch } from "./controllers/pdf";
const mongoose = require("mongoose");

require("dotenv").config();
require("./services/email");
require("./services/cloudinary/cloudinary");
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
fs.readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

app.get("/test", authMiddleware, (req, res) => {
  res.send("Hello world from node js");
});

app.get("/pdf1", generatorFromScratch);
app.get("/pdf2", generatorFromPdf);

app.get("/test-email", (req, res) => {
  console.log("called");
  res.send("ok");
});

app.get("/test-cloudinary", (req, res) => {
  console.log("called");
  res.send("ok");
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
