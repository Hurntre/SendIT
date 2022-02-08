import Joi from '@hapi/joi';
import joiFormater from '../helpers/joi-formatter';

const newParcelValidation = (req, res, next) => {
  const { body } = req;
  const schema = Joi.object({
    description: Joi.string()
      .trim()
      .required(),
    status: Joi.string(),
    weight: Joi.number().required(),
    pickUpDate: Joi.date().required(),
    expectedDeliveryDate: Joi.date().required(),
    dateDelivered: Joi.string(),
    senderID: Joi.string(),
    pickUpAddress: Joi.string()
      .trim()
      .required(),
    receiverName: Joi.string()
      .trim()
      .required(),
    receiverPhoneNumber: Joi.string()
      .trim()
      .required()
      .max(11),
    receiverAddress: Joi.string()
      .trim()
      .min(5)
      .required(),
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
