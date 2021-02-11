import Joi from '@hapi/joi';
import joiFormater from '../helpers/joi-formatter';

const newParcelValidation = (req, res, next) => {
  const { body } = req;
  const schema = Joi.object({
    description: Joi.string().required(),
    status: Joi.string().required(),
    weight: Joi.number().required(),
    pickUpDate: Joi.date().required(),
    expectedDeliveryDate: Joi.date().required(),
    dateDelivered: Joi.date(),
    senderID: Joi.string().required(),
    pickUpLocation: Joi.string().required(),
    receiverName: Joi.string().required(),
    receiverPhoneNumber: Joi.string()
      .required()
      .max(11),
    receiverAddress: Joi.string().required(),
  });

  const { error } = schema.validate(body);

  if (error) {
    console.log('the error is here');
    const { message } = error.details[0];
    const formatedMessage = joiFormater(message);
    return res.status(400).send({
      success: false,
      error: formatedMessage,
    });
  }
  return next();
};

const bodyFillers = (req, res, next) => {
  // date setters
  // to be updated with code that factor delivery and pickup address put in by user
  const today = new Date();

  const pickUpdate = today.setDate(today.getDate() + 1);
  const expectedDeliveryDate = today.setDate(today.getDate() + 7);

  req.body.pickUpDate = pickUpdate;
  req.body.expectedDeliveryDate = expectedDeliveryDate;

  // User ID Extractor
  const { _id } = req.user;
  req.body.senderID = _id;

  // Parcel Status
  req.body.status = 'Pickup Requested';
  return next();
};

const newParcelMiddlewares = {
  newParcelValidation,
  bodyFillers,
};
export default newParcelMiddlewares;
