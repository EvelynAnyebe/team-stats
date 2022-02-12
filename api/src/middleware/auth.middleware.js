const { Response } = require('http-status-codez');
const { ErrorResponse } = require('./../utils/appResponse.js');
const JWT = require('jsonwebtoken');

const validateMiddleware = {
  validateToken: (req, res, next) => {
    try {
      // eslint-disable-next-line no-invalid-this
      const cookies = validateMiddleware.parseCookie(req);
      const accessToken =
        req.headers.authorization || req.params.token || cookies?.refreshToken;
      if (!accessToken) {
        return res
          .status(Response.HTTP_FORBIDDEN)
          .send(new ErrorResponse('No Authorization headers'));
      }

      JWT.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res
            .status(Response.HTTP_UNAUTHORIZED)
            .send(new ErrorResponse(err));
        }
        req.decoded = decoded;
        next();
      });
    } catch (err) {
      res
        .status(Response.HTTP_INTERNAL_SERVER_ERROR)
        .send(new ErrorResponse(err));
    }
  },

  parseCookie: (req) => {
    const list = {};
    const headerCookie = req.headers.cookie;

    if (headerCookie) {
      headerCookie.split(';').forEach((cookie) => {
        const parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
      });
    }
    return list;
  },
};

module.exports = validateMiddleware;
