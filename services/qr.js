import qr from "qr-image"
import { uploadImage } from "./cloudinary/cloudinary";
const fs = require("fs");

export const generateQrCode= async (slug, token) => {
  try {
    const url = `http://localhost:3000/signup?event=${slug}&token=${token}`
    
    // generate qrcode
    const qr_png = qr.image(url, { type: "png" });

    qr_png.pipe(fs.createWriteStream("qr_code.png"));

    const output = await uploadImage("qr_code.png", "Testing");

    return output;
  } catch (err) {
    res.status(400).send("Qr code generate error => " + err);
  }
}