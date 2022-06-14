const resetUrl = process.env.RESET_URL;
const resetMailOptions = (email, firstName, link) => {
  return {
    to: email,
    subject: '[SENDIT] Please reset your password',
    text: `Hi ${firstName} \n
  We heard that you lost your SendIT password.\n
  Sorry about that! \n
  But don't worry! You can use the following link to reset your password: \n
  ${link} \n
  if you don't use this link within 1 hours, it will expire. To get a new password reset link,
  visit ${resetUrl}`,
  };
};
export default resetMailOptions;
