const { ErrorResponse } =require('../../utils/appResponse');
const ResponseBody = require('../validate.middleware');

module.exports = {
  teamMemberValidation: (req, res, next) => {
    req
      .checkBody('name')
      .notEmpty()
      .isLength({ min: 2 });
    req
      .checkBody('latitude')
      .notEmpty()  
    req
      .checkBody('longitude')
      .notEmpty()

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json(new ErrorResponse(ResponseBody(errors)));
    }
    next();
  }
};
