export interface User {
    email?: string;
    userId: string;
    username: string;
    mobile: string;
    role: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
    contactPhone: string;
    createdDate: Date;
    isActive: boolean;
    isLocked: boolean;
}
export interface MedicalRep extends User {
    institute?: string;
    position?: string;
}