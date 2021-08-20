const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(data) {
    this.to = data.email;
    this.firstName = data.name.split(" ")[0];
    this.amount = data.amount;
    this.paymentId = data.paymentId;
    this.description = data.description;
    this.date = data.date;
    this.mode = data.mode;
    this.from = `Helping Hands Foundation <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: "SendinBlue",
      auth: {
        user: process.env.SENDINBLUE_USERNAME,
        pass: process.env.SENDINBLUE_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      name: this.firstName,
      paymentId: this.paymentId,
      date: this.date,
      description: this.description,
      amount: this.amount,
      total: this.amount,
      mode: this.mode,

      subject,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendReceipt() {
    await this.send("receipt", "Donation Receipt");
  }
};
