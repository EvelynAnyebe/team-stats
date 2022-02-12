const { ErrorResponse } =require('../../utils/appResponse');
const ResponseBody = require('../validate.middleware');

module.exports = {
  createUserValidation: (req, res, next) => {
    req
      .checkBody('email')
      .notEmpty()
      .isLength({ min: 2 })
      .isEmail()
      .normalizeEmail();
    req
      .checkBody('password')
      .notEmpty()
      .isLength({ min: 6 })

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json(new ErrorResponse(ResponseBody(errors)));
    }
    next();
  },

  loginUserValidation: (req, res, next) => {
    req
      .checkBody('email')
      .notEmpty()
      .isLength({ min: 2 })
      .isEmail()
      .normalizeEmail();
    req.checkBody('password').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json(new ErrorResponse(ResponseBody(errors)));
    }
    next();
  },
};
