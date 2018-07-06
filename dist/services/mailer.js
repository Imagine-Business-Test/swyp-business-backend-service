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
    welcome(name, creator, businessName, email, link) {
        const text = `Hello ${name[0].toUpperCase()}${name.slice(1)}. \n A business account for ${businessName} has been created on your behave by ${creator}. \n
    Use the link below to change your update your password. \n
    ${link}`;
        this.send(text, "Password Reset", email);
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
            from: "'Swyp 👻' <foo@example.com>",
            to: "",
            subject: "",
            "h:Reply-To": "info@naijachamps.com",
            text: ""
        };
    }
}
exports.Mailer = Mailer;
//# sourceMappingURL=mailer.js.map