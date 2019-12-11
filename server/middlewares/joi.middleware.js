import Joi from '@hapi/joi';

const joiValidation = (req, res, next) => {
  const { User } = req.body;
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
    repeat_password: Joi.ref('password'),
  });

  const { error } = schema.validate(User);

  if (error) {
    // console.log(error);
    res.status(400).send(error.details[0].message);
  } else {
    return next();
  }
};

export default joiValidation;
