const User = require('../models/user.model');
const { Response } = require('http-status-codez');

const { hashedPassword } = require('../utils/encrypt');
const {
  ErrorResponse,
  SuccessResponse,
} = require('../utils/appResponse.js');

// Get all and return all users.
const UserController = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json(new SuccessResponse(users));
    } catch (err) {
      res
        .status(Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(err));
    }
  },

  getUser: async (req, res) => {
    try {
      //Can be used for get profile of get single user
      const id = req.params.id || req.decoded._id;
      const user = await User.findById(id);

      if (!user) {
        return res
          .status(Response.HTTP_NOT_FOUND)
          .json(new ErrorResponse('NOT FOUND'));
      }
      return res.status(200).json(new SuccessResponse(user));
    } catch (err) {
      return res
        .status(Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(err));
    }
  },

  patchUser: async (req, res) => {
    // A user can update his profile
    const { _id } = req.decoded;
    if (req.params.userId) {
      return res
        .status(Response.HTTP_NOT_ACCEPTABLE)
        .json(new ErrorResponse('Not authorized'));
    }

    const userId = req.params.userId || _id;

    try {
      //Validation passed, handle request
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res
          .status(Response.HTTP_NOT_FOUND)
          .json(new ErrorResponse('Not found'));
      }

      if (req.body.password) {
        // eslint-disable-next-line require-atomic-updates
        req.body.password = await hashedPassword(req.body.password);
      }

      delete req.body.email;
      await User.findByIdAndUpdate(userId, { $set: { ...req.body } }).exec();
      return res.status(200).json(
        new SuccessResponse({
          ...user._doc,
        })
      );
    } catch (err) {
      if (err.code === 11000) {
        err.message = 'Values not authorized';
        err.name = 'Unauthorized';
      }
      return res
        .status(Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(err));
    }
  },

  addTeamMember: async (req) =>
    await User.findByIdAndUpdate(req.decoded._id, {
      $push: { teamMembers: req.body },
    }).exec(),

  updateTeamMember: async (req, res) => {
    try {
      const user = await UserController.addTeamMember(req);
      return res.status(200).json(new SuccessResponse(user));
    } catch (err) {
      if (err.code === 11000) {
        err.message = 'not authorized';
        err.name = 'Unauthorized';
      }
      return res
        .status(Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(err));
    }
  },

};

module.exports = UserController;
