import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import "dotenv/config";

export const sendMail = async (recipient, subject, html, text) => {
  const mailerSend = new MailerSend({
    apiKey: process.env.EMAIL_API_KEY,
  });


  const sentFrom = new Sender(process.env.EMAIL_HOST, "VA Production");

  const recipients = [new Recipient(recipient, "Destinataire")];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject(subject)
    .setReplyTo(sentFrom)
    .setHtml(html)
    .setText(text);

  try {
    await mailerSend.email.send(emailParams);
  } catch (error) {
    console.log(error);
  }
};
