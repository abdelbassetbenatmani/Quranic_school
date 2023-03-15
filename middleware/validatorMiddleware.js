const { validationResult } = require('express-validator');

const validatorMiddleware =(fileName,renderOpts) => (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('errors', errors.array())
        req.flash("added", false);
        console.log(renderOpts);
        return res.render(fileName,{
            errors: errors.array() ,
            added:false,
            ...renderOpts
        })
        // return res.status(400).json({ errors: errors.array() });       
    }
    next();
}
module.exports = validatorMiddleware;