import { IResolvers } from "@graphql-tools/utils";
import bcrypt from "bcrypt";
import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";
import { Context, SignUpInput } from "../types/user.js";

const userResolver: IResolvers = {
    //Todo remove any and replace with proper types
    Query: {
        users: async (_, __,): Promise<any> => {
            try {
                const users = await User.find();
                if (!users) {
                    throw new Error("No users found");
                };
                return users;
            } catch (err) {
                console.error("Error getting the users: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },
        user: async (_, {userId}: {userId: string}): Promise<any> => {
            try {
                const user = await User.findById(userId);
                
                if (!user) {
                    throw new Error("User not found");
                };
                return user;
            } catch (err) {
                console.error("Error getting the user: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },
        authUser: async (_, __, context: Context): Promise<any> => {
            try {
                const user = await context.getUser();
                return user;
            } catch (err) {
                console.error("Error in authUser: ", err);
                throw new Error(err.message || "Internal server error");
            }
        }
    },
    Mutation: {
        signUp: async (_, {input}: { input: SignUpInput }, context: Context): Promise<any> => {
            const { username, name, password, gender } = input;

            if (!username || !name || !password || !gender) {
                throw new Error("All fields are required");
            }
            try {
                const doesUserExist = await User.findOne({username});
                if (doesUserExist) {
                    throw new Error("User already exists");
                }
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const apiGeneratedProfilePicture = gender === "male" ? `https://avatar.iran.liara.run/public/boy?${username}`:`https://avatar.iran.liara.run/public/girl?${username}`;
                
                const newUser = await User.create({
                    username,
                    name,
                    password: hashedPassword,
                    gender,
                    profilePicture: apiGeneratedProfilePicture
                });
                if (!newUser) {
                    throw new Error("Could not create user");
                };
                await newUser.save();
                await context.login(newUser);

                return newUser;
            } catch (err) {
                console.error("Error signing up user: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },
        login: async (_, { input }, context) => {       
            const {username, password} = input;
            try {
                const {user} = await context.authenticate("graphql-local", {username, password});
                if (!user) {
                    throw new Error("Invalid username or password");
                }
                await context.login(user);
                return user;
            } catch (err) {
                console.error("Error logging in user: ", err);
                throw new Error(err);
            } 
        },
        logout: async (_, __, context) => {
            try {
                await context.logout();
                context.req.session.destroy(
                    (err) => {
                        if (err) {
                            console.error("Error destroying session: ", err);
                            throw new Error(err);
                        }
                    }
                );
                context.res.clearCookie("connect.sid");

                return {message: "Logged out successfully"};
            } catch (err) {
                console.error("Error logging out user: ", err);
                throw new Error(err);
            }
        }
    },
    User: {
        transactions: async (parent) => {
            try {
                const transactions = await Transaction.find({userId: parent._id});
                return transactions;
            } catch (err) {
                console.error("Error getting the transactions: ", err);
                throw new Error(err.message || "Internal server error");
            }
        }
    }
}

export default userResolver;