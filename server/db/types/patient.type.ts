import { ObjectId } from "mongoose";

export interface IPatient {
    patientId: ObjectId;
    patientName: string;
    mobile: string;
    mobileCode: string;
    email: string;
    kycVerified: boolean;
    recordsFolder: string;
}