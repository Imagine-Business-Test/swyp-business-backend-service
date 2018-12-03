import nodemailer from "nodemailer";
import mailgun from "nodemailer-mailgun-transport";
import { IConfig } from "../contracts/config";
import { Logger } from "../contracts/infra";

export class Mailer {
  private config: IConfig;
  private transporter: any;
  private logger: Logger;

  constructor(config: IConfig, logger: any) {
    this.config = config;
    this.logger = logger;
    this.transporter = nodemailer.createTransport(
      mailgun({
        auth: {
          api_key: this.config.mail.secret,
          domain: config.mail.domain
        }
      })
    );
  }

  public sendPasswordChanged(name: string, email: string) {
    const text = `Hello ${name} . \n Your password on swyp app was changed.`;
    this.send(text, "Password Changed", email);
  }

  public welcome(
    name: string,
    creator: string,
    businessName: string,
    email: string,
    link: string
  ) {
    const text = `Hello ${name[0].toUpperCase()}${name.slice(1)}.
    \n A Swyp business account has been created on your behalf by ${creator}
    for ${businessName}. \n\n
    Use the link below to update your password and start using your account. \n
    ${link}`;
    this.send(text, "Welcome To Swyp", email);
  }

  public welcomeAdmin(businessName: string, userName: string, email: string) {
    const text = `Dear ${userName[0].toUpperCase()}${userName.slice(1)}.
    \n Welcome to swyp, you and ${businessName} have just began a journey of endless possibilities.
    \nPlease take a little time to setup your account fully.\n
     Our statistics show that businesses with good logo art work, clean forms, quick form processing time recieves more user interactions than those with poor art work, confusing forms, and long form processing time.\n You can add more users to your team to help you get your create beautiful forms for your users.\n\n
     Happy Swyping!!`;
    this.send(text, "Welcome To Swyp", email);
  }

  public sendPasswordRequest(name: string, email: string, resetUrl: string) {
    const text = `Hello ${name}. \n click on the link below to complete your password reset.
    ${resetUrl}`;
    this.send(text, "Password Reset", email);
  }

  private send(text: string, subject: string, to: string) {
    const mailOptions = this.configureMailOPtion();
    mailOptions.to = to;
    mailOptions.text = `${text}`;
    mailOptions.subject = subject;
    this.transporter.sendMail(mailOptions, (err: any, info: any) => {
      if (err) {
        this.logger.error("Error Sending mail: " + err);
      } else {
        this.logger.info(
          " Mail sent, Response: " + JSON.stringify(info, undefined, 2)
        );
      }
    });
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
}
