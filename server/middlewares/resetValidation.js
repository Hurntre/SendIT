import Joi from '@hapi/joi';
import joiFormater from '../helpers/joi-formatter';

const newPasswordValidation = (req, res, next) => {
  const { body } = req;
  const schema = Joi.object({
    password: Joi.string()
      .strict()
      .trim()
      .required()
      .min(8)
      .pattern(/^[a-zA-Z0-9]{8,30}$/),
    confirmPassword: Joi.string()
      .strict()
      .trim()
      .required()
      .min(8)
      .pattern(/^[a-zA-Z0-9]{8,30}$/),
  });

  const { error } = schema.validate(body);
  if (error) {
    const { message } = error.details[0];
    const formatedMessage = joiFormater(message);

    return res.status(400).send({
      success: false,
      error: formatedMessage,
    });
  }
  return next();
};

const emailValidation = (req, res, next) => {
  const { body } = req;
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
  });
  const { error } = schema.validate(body);
  if (error) {
    const { message } = error.details[0];
    let formatedMessage = joiFormater(message);
    if (formatedMessage === 'email must be a valid email') {
      formatedMessage = 'Email entered is invalid';
    }

    return res.status(400).send({
      success: false,
      error: formatedMessage,
    });
  }
  return next();
};

const passwordMatchCheck = (req, res, next) => {
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).send({
      success: false,
      error: 'Both field do not match',
    });
  }
  return next();
};

const resetValidations = {
  newPasswordValidation,
  emailValidation,
  passwordMatchCheck,
};
export default resetValidations;
