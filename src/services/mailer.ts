import { Config } from "../contracts/config";
import nodemailer from "nodemailer";
import mailgun from "nodemailer-mailgun-transport";
import { Logger } from "../contracts/infra";

export class Mailer {
  private config: Config;
  private transporter: any;
  private logger: Logger;

  constructor(config: Config, logger: any) {
    this.config = config;
    this.logger = logger;
    this.transporter = nodemailer.createTransport(mailgun({
      auth: {
        api_key: this.config.mail.secret,
        domain: config.mail.domain
      }
    }));
  }

  private configureMailOPtion() {
    return {
      from: "'Swyp 👻' <foo@example.com>",
      to: "",
      subject: "",
      "h:Reply-To": "info@naijachamps.com",
      text: ""
    };
  }

  public sendPasswordChanged (name: string, email: string) {
    const text = `Hello ${name} . \n Your password on swyp app was changed.`;
    this.send(text, "Password Changed", email);
  }

  public sendPasswordRequest (name: string, email: string, resetUrl: string) {
    const text = `Hello ${name}. \n click on the link below to complete your password reset.
    ${resetUrl}`;
    this.send(text, "Password Reset", email);
  }

  private send (text: string, subject: string, to: string) {
    const mailOptions = this.configureMailOPtion();
    mailOptions.to = to;
    mailOptions.text = `${text}`;
    mailOptions.subject = subject;
    this.transporter.sendMail(mailOptions, (err: any, info: any) => {
      if (err) {
        this.logger.error("Error Sending mail: " + err);
      } else {
        this.logger.info(" Mail sent, Response: " + JSON.stringify(info, undefined, 2));
      }
    });
  }
}
