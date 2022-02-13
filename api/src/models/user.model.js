const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Schema, model } = mongoose;

const UserSchema = Schema(
    {
        userName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
            select: false,
        },
        firstName: {
            type: String,
            minLength: 2,
        },
        lastName: {
            type: String,
            minLength: 2,
        },
        otherNames: String,
        gender: String,
        dob: Date,
        phone: {
            type: String,
            minLength: 11,
            maxLength: 15,
        },
        address: {
            houseNumber: String,
            address: String,
            street: String,
            city: String,
            postCode: String,
            country: String,
            region: String,
            location: { type: Array, "default": [] }
        },
        teamMembers: [{
                name: String,
                latitude: Number,
                longitude: Number
            }]
    },
    { timestamps: true }
);

if (!UserSchema.options.toObject) {
    UserSchema.options.toObject = {};
}

UserSchema.options.toObject.transform = function (doc, ret, options) {
    delete ret.__v;
    delete ret.password;
    return ret;
};

UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(
            this.password,
            await bcrypt.genSalt()
        );
        this.password = hashedPassword;
        return next();
    } catch (err) {
        return next(err);
    }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        return err;
    }
};

UserSchema.methods.GetAccessToken = async (user, time = '7d') => {
    try {
        const token = await jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: time,
            issuer: 'Team-stats',
        });
        return token;
    } catch (err) {
        return err;
    }
};

module.exports = model('User', UserSchema);
