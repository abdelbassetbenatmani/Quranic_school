const { validationResult } = require('express-validator');

const validatorMiddleware = (fileName) => (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('errors', errors.array())
    req.flash("added", false);
    const renderObj = {
      errors: errors.array(),
      added: false,
      ...req.renderOptions,
    };
    return res.render(fileName, renderObj);
    // return res.status(400).json({ errors: errors.array() }); 
  }
  next();
};
module.exports = validatorMiddleware;
