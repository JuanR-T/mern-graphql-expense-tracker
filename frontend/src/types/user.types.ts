export interface User {
    _id?: string;
    username: string;
    name: string;
    password: string;
    gender: string;
    profilePicture?: string;
}

export type LoginResponse = {
    username: string;
    password: string;
};
