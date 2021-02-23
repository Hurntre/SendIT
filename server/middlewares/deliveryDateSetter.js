const deliveryDateSetter = (req, res, next) => {
  // to be updated with code that factor in address (distance) put in by user

  // this extracts the validated pickup date inputed by the user
  const {
    body: { pickUpDate },
  } = req;

  // converted ISO formated date back to readable formated
  const newlyFormatedDate = new Date(pickUpDate);
  // this adds 7 days to the date of the month the parcel was scheduled to be delivered
  const expectedDeliveryDate = new Date(
    newlyFormatedDate.getTime() + 604800000
  );

  req.body.expectedDeliveryDate = expectedDeliveryDate;

  return next();
};

export default deliveryDateSetter;
