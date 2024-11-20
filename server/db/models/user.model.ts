import { Connection, connections, Model, Schema } from 'mongoose';
import { User } from '../types/user.type';
import { genSalt, hash } from 'bcrypt';
"use strict";

const UserSchema = new Schema<User, User>(
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
            enum: ['patient', 'doctor', 'representative'],
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
console.log("connections", connections);
export const UserSchemaModel: Model<User> = connections[
    getObjectIndex(
        connections,
        "id",
        0
    )
].model(
    User.COLLECTION_NAME,
    UserSchema,
    User.COLLECTION_NAME
);

function getObjectIndex(array: Connection[], key: keyof Connection, value: any) {
    return array.findIndex((ind) => ind[key] == value);
}