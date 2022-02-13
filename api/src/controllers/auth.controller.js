const User = require('../models/user.model');
const { Response } = require('http-status-codez');
const { createToken } = require('../utils/encrypt');
const {
    ErrorResponse,
    SuccessResponse,
} = require('../utils/appResponse');


module.exports = {
    createUser: async (req, res) => {
        try {
            //Check if email already exist
            const user = await User.findOne({ email: req.body.email });
            // 406 Not Acceptable
            if (user) {
                return res
                    .status(Response.HTTP_NOT_ACCEPTABLE)
                    .json(new ErrorResponse('User already exist'));
            }

            const userObj = new User({ email: req.body.email, password: req.body.password });

            // Create user access token, refresh token, save user
            const newUser = await userObj.save();
            if (!newUser) {
                    return res
                        .status(Response.HTTP_NOT_ACCEPTABLE)
                        .json(new ErrorResponse('User already exist'));
            }
            const accessToken = await userObj.GetAccessToken(newUser.toJSON());
            const refreshToken = await createToken(newUser.toJSON(), '7d');
            const { password, ...responseUser } = newUser._doc;
            return res
                .status(Response.HTTP_CREATED)
                .cookie('refreshToken', refreshToken, {
                    secure: true,
                    maxAge: 604800000,
                    httpOnly: true,
                    sameSite: 'None'
                })
                .json(
                    new SuccessResponse(
                        {
                            user: responseUser,
                            accessToken,
                        },
                        'User created successfully'
                    )
                );

        } catch (err) {
            return res
                .status(Response.HTTP_INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(err));
        }
    },

    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })
                .select('+password')
                .exec();
            // 406 Not Acceptable
            if (!user) {
                return res
                    .status(Response.HTTP_NOT_ACCEPTABLE)
                    .json(new ErrorResponse('Invalid account details.'));
            }
            const isPassword = await user.comparePassword(req.body.password);
            if (!isPassword) {
                return res
                    .status(Response.HTTP_NOT_ACCEPTABLE)
                    .json(new ErrorResponse('Invalid data'));
            }

            delete user._doc.password;
            const accessToken = await user.GetAccessToken(user._doc);
            const refreshToken = await createToken(user._doc, '7d');
            return res
                .cookie('refreshToken', refreshToken, {
                    secure: true,
                    maxAge: 604800000,
                    httpOnly: true,
                    sameSite: 'None'
                })
                .status(Response.HTTP_ACCEPTED)
                .json(
                    new SuccessResponse(
                        {
                            user: user._doc,
                            accessToken,
                        },
                        'User login successful successfully'
                    )
                );
        } catch (err) {
            return res
                .status(Response.HTTP_INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(err));
        }
    },

    refreshToken: async (req, res) => {
        try {
            const user = await User.findById(req.decoded._id);

            if (user) {
                const accessToken = await user.GetAccessToken(user._doc);
                const refreshToken = await createToken(user._doc, '7d');
                return res
                    .cookie('refreshToken', refreshToken, {
                        secure: true,
                        maxAge: 604800000,
                        httpOnly: true,
                        sameSite: 'None'
                    })
                    .status(Response.HTTP_ACCEPTED)
                    .json(
                        new SuccessResponse(
                            {
                                user: user._doc,
                                accessToken,
                            },
                            'User login successful successfully'
                        )
                    );
            }
            throw new Error({ message: 'Unable to refresh token. Please sign in' });
        } catch (error) {
            return res
                .status(Response.HTTP_INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error));
        }
    },


};
