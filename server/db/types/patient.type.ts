import { Document, ObjectId } from "mongoose";

export interface IPatient extends Document {
    patientId: ObjectId;
    patientName: string;
    mobile: string;
    mobileCode: string;
    email: string;
    kycVerified: boolean;
    recordsFolder: string;
}