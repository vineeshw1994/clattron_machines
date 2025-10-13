const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const routes = require("./routes");
const Customer = require("./models/Customer");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const email = process.env.EMAIL_USER;
const password = process.env.EMAIL_PASSWORD;
// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Your existing contact form endpoint
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: email,
    pass: password,
  },
});

app.post("/api/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;

  const customer = new Customer({ name, email, phone, message });
  await customer.save();

  const emailTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contact Form Submission</title>
      <style type="text/css">
        body { margin: 0 !important; padding: 0 !important; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f0f2f5; color: #333333; }
        a { color: #1a2a44; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .container { max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); }
        .header { background: linear-gradient(90deg, #1a2a44, #2e4057); color: #ffffff; padding: 25px; text-align: center; }
        .header img { max-height: 60px; display: block; margin: 0 auto 10px; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 600; line-height: 1.2; }
        .content { padding: 35px; }
        .section { margin-bottom: 25px; }
        .section h2 { color: #1a2a44; font-size: 22px; font-weight: 600; margin-bottom: 12px; }
        .section p { margin: 8px 0; line-height: 1.6; font-size: 14px; }
        .details { background-color: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #1a2a44; }
        .details p { margin: 6px 0; }
        .cta-button { display: inline-block; padding: 12px 25px; background-color: #ff6b6b; color: #ffffff; font-weight: 600; border-radius: 6px; text-decoration: none; transition: background-color 0.3s ease; }
        .cta-button:hover { background-color: #e63946; }
        .footer { background: linear-gradient(90deg, #2e4057, #1a2a44); color: #ffffff; text-align: center; padding: 20px; font-size: 12px; line-height: 1.5; }
        .footer p { margin: 4px 0; }
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; border-radius: 0; }
          .header { padding: 15px; }
          .header h1 { font-size: 22px; }
          .header img { max-height: 50px; }
          .content { padding: 20px; }
          .section h2 { font-size: 18px; }
          .cta-button { width: 100%; text-align: center; }
        }
      </style>
    </head>
    <body style="margin: 0 !important; padding: 0 !important; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f0f2f5; color: #333333;">
      <div class="container" style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);">
        <div class="header" style="background: linear-gradient(90deg, #1a2a44, #2e4057); color: #ffffff; padding: 25px; text-align: center;">
          <!--[if mso]>
            <img src="https://vineeshw1994.github.io/machines-site/logo.png" alt="Clattron Machines Logo" style="max-height: 60px; display: block; margin: 0 auto 10px;" />
          <![endif]-->
          <img src="https://vineeshw1994.github.io/machines-site/logo.png" alt="Clattron Machines Logo" style="max-height: 60px; display: block; margin: 0 auto 10px;" onerror="this.style.display='none';">
          <h1 style="margin: 0; font-size: 28px; font-weight: 600; line-height: 1.2;">New Contact Form Submission</h1>
        </div>
        <div class="content" style="padding: 35px;">
          <div class="section" style="margin-bottom: 25px;"> 
            <h2 style="color: #1a2a44; font-size: 22px; font-weight: 600; margin-bottom: 12px;">Submission Details</h2>
            <div class="details" style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #1a2a44;">
              <p style="margin: 6px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 6px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #1a2a44; text-decoration: none;">${email}</a></p>
              <p style="margin: 6px 0;"><strong>Phone:</strong> ${phone}</p> 
              <p style="margin: 6px 0;"><strong>Message:</strong></p>
              <p style="margin: 6px 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div class="section" style="margin-bottom: 25px;">
            <p style="color: #666666; font-size: 12px;">This email was automatically generated on ${new Date().toLocaleString(
              "en-IN",
              { timeZone: "Asia/Kolkata" }
            )}. Please do not reply directly to this email.</p>
          </div>
        </div>
        <div class="footer" style="background: linear-gradient(90deg, #2e4057, #1a2a44); color: #ffffff; text-align: center; padding: 20px; font-size: 12px; line-height: 1.5;">
          <p style="margin: 4px 0;">&copy; ${new Date().getFullYear()} Clattron Machines. All rights reserved.</p>
          <p style="margin: 4px 0;">9-5-J, Chekkala Vilai Veedu, Mecode, Kaliyakkavilai, Kanyakumari, Tamil Nadu 629153</p>
          <p style="margin: 4px 0;"><a href="https://clattronmachines.com" style="color: #ffffff; text-decoration: underline;">Visit our website</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: email,
    to: "vineeshflorida@gmail.com", // Replace with your company email
    subject: `Contact Form Submission from ${name}`,
    html: emailTemplate,
  };
  // ... (keep your emailTemplate and mailOptions as-is)
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Failed to send message. Please try again.");
    } else {
      console.log("Email sent: " + info.response);
      res.status(201).json({ message: "Inquiry saved successfully", customer });
    }
  });
});

// Mount routes
app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
