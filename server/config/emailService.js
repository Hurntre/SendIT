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
      console.log('Message sent:%s', info.messageId);
      console.log('Preview URL:%s', nodeMailer.getTestMessageUrl(info));
    } catch (error) {
      console.log(error);
    }
  }
};
export default emailSender;
