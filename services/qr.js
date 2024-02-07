import qr from "qr-image"
const fs = require("fs");

export const generateQrCode = async (req, res) => {
  try {
    const url = `http://localhost:3000/signup?event=${slug}&token=${token}`
    
    // generate qrcode
    const qr_png = qr.image(url, { type: "png" });

    qr_png.pipe(fs.createWriteStream("qr_code.png"));

    return res.send(qr_png);
  } catch (err) {
    res.status(400).send("Qr code generate error => " + err);
  }
}