import { Injectable } from '@nestjs/common';
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

@Injectable()
export class EmailService {
  async send(email: string, body: string, subject: string) {
    const msg = {
      to: email,
      from: 'internship-social@codeep.io',
      subject,
      html: body,
    };

    sgMail.send(msg);
  }
}
