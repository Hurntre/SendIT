const deliveryDateSetter = (req, res, next) => {
  // date setters
  // to be updated with code that factor pickup date and address put in by user
  const today = new Date();

  const expectedDeliveryDate = today.setDate(today.getDate() + 7);

  req.body.expectedDeliveryDate = expectedDeliveryDate;

  return next();
};

export default deliveryDateSetter;
