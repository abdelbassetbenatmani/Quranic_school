const setBodyToRenderOptions = (req, res, next) => {
  if (!req.renderOptions) req.renderOptions = {};
  req.renderOptions.body = req.body;
  next();
};

module.exports = setBodyToRenderOptions;
