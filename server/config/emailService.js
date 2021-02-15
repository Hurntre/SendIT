import nodeMailer from 'nodemailer';

const env = process.env.NODE_ENV;
const emailSender = async mailOptions => {
  if (env === 'test' || env === 'development') {
    try {
      const testAccount = await nodeMailer.createTestAccount();

      const transporter = nodeMailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      const info = await transporter.sendMail({
        from: '"SENDIT" <admin@sendit.com>',
        to: mailOptions.to,
        subject: mailOptions.subject,
        text: mailOptions.text,
      });
      // eslint-disable-next-line no-console
      console.log('Message sent:%s', info.messageId);
      // eslint-disable-next-line no-console
      console.log('Preview URL:%s', nodeMailer.getTestMessageUrl(info));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
};
export default emailSender;
