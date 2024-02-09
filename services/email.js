const nodemailer = require("nodemailer");
const fs = require("fs");
const hbs = require("handlebars");
let transport;

if (process.env.NODE_ENV === "LOCAL") {
  const smtpConfig = {
    host: "localhost",
    port: 2500,
    secure: false,
  };
  transport = nodemailer.createTransport(smtpConfig);
} else {
  console.log("Starting in prd env");
  transport = nodemailer.createTransport({
    service: "Gmail",
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_SMTP_USERNAME,
      pass: process.env.EMAIL_SMTP_PASSWORD
    }
  })
}

async function testEmail() {
  try {
    // Sending test email
    await transport.sendMail({
      from: "VOLUNTEERWAVE@EMAIL.COM",
      to: "USER@EMAIL.COM",
      subject: "TESTING EMAIL",
      html: "<h1>Hello!</h1>",
    });
    console.log("Test email sent successfully.");
  } catch (e) {
    console.error("Test email send failed.", e);
  }
}

// Call the testEmail function
// testEmail();

export async function sendCompletionEmail(name, userEmail, cert) {
  console.log("sendCompletinoEmail called")
  try {
    let subject = "Certificate of Participation with VolunteerWave"
    let data = {
      name, cert, subject
    };
    const templateSource = fs.readFileSync("./views/completionEmail.hbs", "utf8");
    const completionEmail = hbs.compile(templateSource);
    await transport.sendMail({
      from: process.env.USERNAME,
      to: userEmail,
      subject: "APPRECIATION EMAIL",
      html: completionEmail(data),
    }, (error, info) => {
      if (error) {
        console.error("Message coudl not be sent: ", error)
      } else {
        console.log("Message sent", info)
      }
    });
  } catch (e) {
    console.log("Completion email send failed: ", e);
  }
}

