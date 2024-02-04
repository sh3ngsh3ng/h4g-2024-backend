import { PDFDocument, rgb } from "pdf-lib";
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
    const textOptions = { x: 50, y: 300, size: 24, color: rgb(0, 0, 0)};
    
    const content = pdfDoc.getPages().map(page => page.drawText("Hello, pdf-lib!", textOptions));
    
    const pdfBytes = await pdfDoc.save();
    
    // save the pdf document 
    fs.writeFileSync("./output.pdf", pdfBytes);

    return res.send({success: true});
  } catch (err) {
    res.status(400).send(err);
  }
}

export const generatorFromPdf = async (req, res) => {
  try {
    const existingPdf = fs.readFileSync("./certificateTemplate.pdf");
    const pdfDoc = await PDFDocument.load(existingPdf);
    console.log(pdfDoc)
    const page = pdfDoc.getPage(0)
    console.log(page)
    const { width, height } = page.getSize();

    const volunteerName = "Mr Lim";
    const adjustment = volunteerName.length * 12;

    // Adding text
    const textOptions = { x: (width - adjustment) / 2 , y: height / 2 + 30, size: 24, color: rgb(0, 0, 0)};
    
    page.drawText(volunteerName, textOptions);
    
    const pdfBytes = await pdfDoc.save();
    
    // save the pdf document 
    fs.writeFileSync("./output.pdf", pdfBytes);

    return res.send({success: true});
  } catch (err) {
    res.status(400).send("Unable to generate => " + err);
  }
}

