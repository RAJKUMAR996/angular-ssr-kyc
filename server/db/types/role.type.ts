import { ObjectId } from "mongoose";

export interface Role {
    roleId: ObjectId;
    name: string;
    isActive: boolean;
    allowAsLogin: boolean;
}