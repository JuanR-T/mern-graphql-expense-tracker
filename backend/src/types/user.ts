import { Document, ObjectId } from 'mongoose';

export interface User extends Document{
    _id: ObjectId;
    username: string;
    name: string;
    password: string;
    profilePicture: string;
    gender?: "male" | "female";
    createdAt: Date;
    updatedAt: Date;
}

export interface SignUpInput {
    username: string;
    name: string;
    password: string;
    gender: string;
}

export interface LoginInput {
    username: string;
    password: string;
}

export interface Context {
    req: Request;
    res: Response;
    login: (user: any) => Promise<void>;
    logout: () => Promise<String>;
    authenticate: (strategy: string, options: object) => Promise<{ user: User }>;
    getUser: () => User;
}