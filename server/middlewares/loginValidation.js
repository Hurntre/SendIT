import Joi from '@hapi/joi';
import joiFormater from '../helpers/joi-formatter';

const loginValidation = (req, res, next) => {
  const { body } = req;
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string().required(),
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

export default loginValidation;
