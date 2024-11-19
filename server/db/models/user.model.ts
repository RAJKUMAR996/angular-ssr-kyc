const moment = require("moment");
import * as mongoose from 'mongoose'
import { User } from '../types/user.type';
import { genSalt, hash } from 'bcrypt';
"use strict";

var Schema = mongoose.Schema,
    crypto = require("crypto"),
    config = require("../../config/environment"),
    randtoken = require("rand-token"),
    ENUMS = require("../../enums"),
    ObjectId = Schema.ObjectId,
    Services = require("../../service"),
    UserSchema = new Schema<User>(
        {
            firstname: { type: String },
            email: {
                type: String,
                lowercase: true,
                unique: true,
                sparse: true,
                default: null,
            },
            mobilecode: { type: String, default: "IN" },
            role: {
                type: String,
                enum: ENUMS.USER_ROLES,
            },
            contactPhone: {
                type: String,
            },
            emailVerified: {
                type: Boolean,
                default: false,
            },

            passwordHash: {
                type: String,
                default:
                    "M/Zm+JuF+Q0xwG9XOWQSjLVSMkNUnIRfx8D6J2rfP9vFFp/DRmF+cx+db79J8DNm0XScry2gQHykvJlxh4+yVg==",
            },
            loginConditions: {
                loginAttempt: { type: Number, default: 0 },
                loginFailedDateTime: { type: Date },
                nextLoginDateTime: { type: Date },
            },
            mobile: { type: Number, unique: true, sparse: true },
            mobileVerified: { type: Boolean, default: false },
            profilePicture: { type: String, default: "" },
            dob: {
                type: Date,
            },
            gender: String,
            userVerified: { type: Boolean, default: false },
        },
        { timestamps: true }
    );

//console.log('ENUMS.AUTH_TYPES : ', ENUMS.AUTH_TYPES, ENUMS.DEFAULT_CURRICULUM);

/**
 * Virtuals
 */
UserSchema.virtual("password")
    .set(async function (password: string) {
        const salt = await genSalt(10);
        this.passwordHash = await hash(password, salt);
    })
    .get(function () {
        return this.passwordHash;
    });

// Non-sensitive info we'll be putting in the token
UserSchema.virtual("token").get(function () {
    return {
        _id: this._id,
        role: this.role,
    };
});

// Validate email is not taken
// UserSchema.path("email").validate(function (value, respond) {
//     var self = this;
//     this.fi.findOne({ email: value }, function (err, user) {
//         //console.log(err);
//         if (err) throw err;
//         if (user) {
//             if (self.id === user.id) return true;
//             return false;
//         }
//         true;
//     });
// }, "The specified email address is already in use.");

var validatePresenceOf = function (value) {
    return value && value.length;
};

// Validate Mobile is not taken
// UserSchema.path("phoneNumber").validate(function (value, respond) {
//     var self = this;
//     this.constructor.findOne({ phoneNumber: value }, function (err, user) {
//         //console.log(err);
//         if (err) throw err;
//         if (user) {
//             if (self.id === user.id) return respond(true);
//             return respond(false);
//         }
//         respond(true);
//     });
// }, "The specified mobile number is already in use.");

var validatePresenceOf = function (value) {
    return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema.pre("save", function (next) {
    if (!this.isNew) return next();

    if (
        !validatePresenceOf(this.hashedPassword) &&
        ENUMS.AUTH_TYPES.indexOf(this.provider) === -1
    )
        next(new Error("Invalid password"));
    else next();
});

var generateGlobalID = function () {
    // return randomize('0', 8);
    return randtoken.generate(8);
};

UserSchema.pre("save", function (next) {
    var self = this;
    self.emailVerifyToken = generateGlobalID();
    next();
});

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function (plainText: string) {
        //console.log("UserSchema password match ", this.encryptPassword(plainText), "this.hashedPassword>>>", this.hashedPassword, "plainText", plainText)
        return this.encryptPassword(plainText) === this.hashedPassword;
    },
    checkSamePassword: function (newpasswordPlainText: string) {
        return this.encryptPassword(newpasswordPlainText) === this.hashedPassword;
    },
    /**
     * Update the login attempt, if password is incorrect
     * @returns
     */
    updateLoginFailedConditions: async function (isFailed: boolean) {
        const user = this;
        const loginAttempt = user.loginConditions.loginAttempt + 1;
        if (isFailed) {
            if (loginAttempt === 3) {
                user.loginConditions.loginAttempt += 1;
                user.loginConditions.loginFailedDateTime = new Date();
            } else {
                user.loginConditions.loginAttempt += 1;
            }
        } else {
            user.loginConditions.loginAttempt = 0;
        }

        try {
            await user.save();
            return { loginAttempt: user.loginConditions.loginAttempt };
        } catch (error) {
            return { error };
        }
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function () {
        return crypto.randomBytes(16).toString("base64");
    },
    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function (password) {
        //console.log("encryptPassword", password, "this.salt", this.salt)
        if (!password || !this.salt) return "";
        var salt = new Buffer(this.salt, "base64");
        return crypto
            .pbkdf2Sync(password, salt, 10000, 64, "sha512")
            .toString("base64");
    },
    /**
     * Return true, if user is in free trail otherwise false
     * @return {Boolean}
     */
    checkFreeTrailPeriod: function () {
        const user = this;

        const currentDate = moment(new Date());
        const createdAt = moment(user.createdAt).add(
            process.env.FREE_TRIAL_DAYS,
            "d"
        );
        // if (!createdAt) return "Path: user.createdAt is missing";
        const dayDiff = moment.duration(createdAt.diff(currentDate)).asDays();
        console.log("freeDay: ", Math.floor(dayDiff));

        if (Math.floor(dayDiff) >= 0) return true;
        else return false;
    },
};

/**
 * Static Methods / Modal Methods
 * These methods can be invoked
 * directly on Modal like User.find()
 */
UserSchema.statics = {
    findUserByRole(role) {
        return this.find({ role: role });
    },
};

export const UserSchemaModel = mongoose.connections[
    Services.getObjectIndex(
        mongoose.connections,
        "name",
        "kyc"
    )
].model(
    ENUMS.KAPDEC_DB_COLLECTIONS.USER.name,
    UserSchema,
    ENUMS.KAPDEC_DB_COLLECTIONS.USER.name
);