import { ObjectId } from "mongoose";

export class User {
    private _password!: string;
    public userId!: ObjectId;
    public email!: string;
    public username!: string;
    public mobile!: number;
    public mobilecode!: string;
    public gender: 'male' | 'female' | 'trans' | 'unknown' = 'unknown';
    public profilePicture!: string;
    public dob!: Date;
    public role!: string;
    public firstname?: string;
    public lastname?: string;
    public passwordHash!: string;
    public emailVerified?: boolean;
    public mobileVerified?: boolean;
    public contactPhone!: string;
    public createdDate!: Date;
    public createdBy!: ObjectId;
    public modifiedBy?: string;
    public modifiedDate?: Date;
    public isActive!: boolean;
    public isLocked?: boolean;
    public activatedDate?: Date;
    public lockedDate?: Date;
    public userVerified?: boolean
    public deactivateDate?: Date;
    public loginConditions?: {
        loginAttempt: number;
        loginFailedDateTime: Date;
        nextLoginDateTime: Date;
    };
}