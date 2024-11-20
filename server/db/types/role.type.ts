import { Document, ObjectId } from "mongoose";

export interface Role extends Document {
    name: string;
    isActive: boolean;
    allowAsLogin: boolean;
}