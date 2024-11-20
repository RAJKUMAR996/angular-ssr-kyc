import { Document, ObjectId } from "mongoose";

export class User extends Document {
    public static COLLECTION_NAME = "User";
    private _password!: string;
    public email!: string;
    public username!: string;
    public gender: 'male' | 'female' | 'trans' | 'unknown' = 'unknown';
    public profilePicture!: string;    
    public role!: string;
    public passwordHash!: string;
    public contactPhone!: string;
    public createdDate!: Date;
    public isActive: boolean = true;

    public dob?: Date;
    public isLocked?: boolean = false;
    public mobile?: number;
    public mobilecode?: string;    
    public firstname?: string;
    public lastname?: string;
    public createdBy?: ObjectId;
    public emailVerified?: boolean;
    public mobileVerified?: boolean;
    public modifiedBy?: string;
    public modifiedDate?: Date;
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