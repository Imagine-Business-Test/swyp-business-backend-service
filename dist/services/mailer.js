"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_mailgun_transport_1 = __importDefault(require("nodemailer-mailgun-transport"));
class Mailer {
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
        this.transporter = nodemailer_1.default.createTransport(nodemailer_mailgun_transport_1.default({
            auth: {
                api_key: this.config.mail.secret,
                domain: config.mail.domain
            }
        }));
    }
    sendPasswordChanged(name, email) {
        const text = `Hello ${name} . \n Your password on swyp app was changed.`;
        this.send(text, "Password Changed", email);
    }
    welcome(name, creator, email, link) {
        const text = `Hello ${name[0].toUpperCase()}${name.slice(1)}
    \n A Swyp business account has been created for you by ${creator}. \n\n
    Use the link below to update your password and start using your account. \n
    ${link}`;
        this.send(text, "Welcome To Swyp", email);
    }
    welcomeAdmin(businessName, userName, email) {
        const text = `Hello ${userName[0].toUpperCase()}${userName.slice(1)}
    \n Welcome to swyp, you and ${businessName} have just began a journey of endless possibilities.
    \nPlease take a little time to setup your account fully.\n
     Our statistics show that businesses with good logo art work, clean forms, quick form processing time recieves more user interactions than those with poor art work, confusing forms, and long form processing time.\n You can add more users to your team to help you get your create beautiful forms for your users.\n\n
     Happy Swyping!!`;
        this.send(text, "Welcome To Swyp", email);
    }
    sendPasswordRequest(name, email, resetUrl) {
        const text = `Hello ${name}. \n click on the link below to complete your password reset.
    ${resetUrl}`;
        this.send(text, "Password Reset", email);
    }
    send(text, subject, to) {
        const mailOptions = this.configureMailOPtion();
        mailOptions.to = to;
        mailOptions.text = `${text}`;
        mailOptions.subject = subject;
        this.transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                this.logger.error("Error Sending mail: " + err);
            }
            else {
                this.logger.info(" Mail sent, Response: " + JSON.stringify(info, undefined, 2));
            }
        });
    }
    configureMailOPtion() {
        return {
            from: "'Swyp' <info@swyp.com>",
            to: "",
            subject: "",
            "h:Reply-To": "info@swyp.com",
            text: ""
        };
    }
}
exports.Mailer = Mailer;
//# sourceMappingURL=mailer.js.map