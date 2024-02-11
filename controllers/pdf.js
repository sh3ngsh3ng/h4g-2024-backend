import { PDFDocument, rgb } from "pdf-lib";
import { uploadImage, uploadPdf } from "../services/cloudinary";
const fs = require("fs");

export const generatorFromScratch = async (req, res) => {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    // Adding an image
    const imageUrl = "./certificateTemplate.png";
    const image = await pdfDoc.embedPng(fs.readFileSync(imageUrl));

    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });

    // Adding text
    const textOptions = { x: 50, y: 300, size: 24, color: rgb(0, 0, 0) };

    const content = pdfDoc
      .getPages()
      .map((page) => page.drawText("Hello, pdf-lib!", textOptions));

    const pdfBytes = await pdfDoc.save();

    // save the pdf document
    fs.writeFileSync("./output.pdf", pdfBytes);

    return res.send({ success: true });
  } catch (err) {
    res.status(400).send(err);
  }
};

export const generatorFromPdf = async (user) => {
  try {
    const existingPdf = fs.readFileSync("./certificateTemplate.pdf");
    const pdfDoc = await PDFDocument.load(existingPdf);

    const page = pdfDoc.getPage(0);

    const { width, height } = page.getSize();

    const volunteerName = user;
    const adjustment = volunteerName.length * 12;

    // Adding text
    const textOptions = {
      x: (width - adjustment) / 2,
      y: height / 2 + 30,
      size: 24,
      color: rgb(0, 0, 0),
    };

    page.drawText(volunteerName, textOptions);

    const pdfBytes = await pdfDoc.save();

    // save the pdf document
    fs.writeFileSync("./output.pdf", pdfBytes);

    const output = await uploadPdf("output.pdf", "Testing");

    return output;
  } catch (err) {
    res.status(400).send("Unable to generate => " + err);
  }
};
