const jwt = require('jsonwebtoken');

exports.generateToken = (payload)=> jwt.sign({schoolId:payload},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRATION})
