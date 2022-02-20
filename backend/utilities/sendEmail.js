import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
const __dirname = path.resolve();



const sendEmail = async (email, subject, payload, template) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 5000,
      secure: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS, // naturally, replace both with your real credentials or an application-specific password
      },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: process.env.USER_EMAIL,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send email
    // await transporter.sendMail({
    //   from: process.env.USER_EMAIL,
    //   to: email,
    //   subject: subject,
    //   text: text,
    // });
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        console.log(error, "Email not sent");
        return error;
      } else {
        console.log("Email sent successfully!");
      }
    });
  } catch(error) {
    console.log(error, "Email not sent");
  }
};

export default sendEmail;