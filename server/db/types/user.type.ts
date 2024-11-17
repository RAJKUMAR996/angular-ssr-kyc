import { ObjectId } from "mongoose";

export interface IUser {
    userId: ObjectId;
    email: string;
    username: string;
    mobile: string;
    mobilecode: string;
    role: string;
    firstname: string;
    lastname: string;
    passwordHash: string;
    contactPhone: string;
    createdDate: Date;
    createdBy: ObjectId;
    modifiedBy: string;
    modifiedDate: Date;
    isActive: boolean;
    isLocked: boolean;
    activatedDate: Date;
    lockedDate: Date;
    deactivateDate: Date;
}