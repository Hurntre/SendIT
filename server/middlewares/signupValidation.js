import Joi from '@hapi/joi';
import joiFormater from '../helpers/joi-formatter';

const signupValidation = (req, res, next) => {
  const { body } = req;
  const schema = Joi.object({
    firstName: Joi.string()
      .required()
      .pattern(/^[a-zA-Z]{5,30}$/),
    lastName: Joi.string()
      .required()
      .pattern(/^[a-zA-Z]{5,30}$/),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    phoneNumber: Joi.string()
      .required()
      .max(11),
    password: Joi.string()
      .required()
      .pattern(/^[a-zA-Z0-9]{8,30}$/),
    confirmPassword: Joi.ref('password'),
  }).with('password', 'confirmPassword');

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

export default signupValidation;
