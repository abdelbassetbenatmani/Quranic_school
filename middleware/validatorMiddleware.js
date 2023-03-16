const { validationResult } = require('express-validator');

const validatorMiddleware = (fileName) => (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const renderObj = {
      errors: errors.array(),
      added: false,
      ...req.renderOptions,
    };
    console.log('render object : ', renderObj);
    return res.render(fileName, renderObj);
  }
  next();
};
module.exports = validatorMiddleware;
