const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

/**
 * Requires a token in request headers.
 * Header format is
 * Authorization: Bearer token
 */
const authRequired = () => async (req, res, next) => {
  const header = req.header('Authorization');
   
  if (!header) {
    return res.status(401).json({
      msg: 'Please Provide JWT',
    });
  }
  
  const token = header.replace('Bearer', '').trim();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
    if (!decoded) {
      return res.status(401).json({
        msg: 'Invalid token',
      });
    }
   
    let user = await User.findOne({ _id: decoded.id }).select({
      password: 0,
    })
    
    if (!user) {
      return res.status(404).json(`User not found!`);
    }

    req.token = token;
    req.user = user;
    res.locals.user = user;
    next();
  
  } catch (e) {
    return res.status(401).json({
      msg: 'Invalid token',
    });
  }
};

module.exports = { authRequired };