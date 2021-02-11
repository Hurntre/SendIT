import Joi from '@hapi/joi';
import joiFormater from '../helpers/joi-formatter';

const newParcelValidation = (req, res, next) => {
  const { body } = req;
  const schema = Joi.object({
    description: Joi.string().required(),
    weight: Joi.string().required(),
    pickUpDate: Joi.date().required(),
    receiverName: Joi.string().required(),
    receiverPhoneNumber: Joi.string()
      .required()
      .max(11),
    receiverAddress: Joi.string().required(),
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

export default newParcelValidation;
