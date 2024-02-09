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
testEmail();

async function sendReminderEmail() {
  try {
    let data = {
      date: "01/12/2024",
      greeting: "Hello",
      name: "Volunteer!",
    };
    const templateSource = fs.readFileSync("./views/reminderEmail.hbs", "utf8");
    const reminderEmail = hbs.compile(templateSource);
    await transport.sendMail({
      from: "VOLUNTEERWAVE@EMAIL.COM",
      to: "USER@EMAIL.COM",
      subject: "REMINDER EMAIL",
      html: reminderEmail(data),
    });
  } catch (e) {
    console.log("Reminder email send failed");
  }
  
}

// sendReminderEmail();
