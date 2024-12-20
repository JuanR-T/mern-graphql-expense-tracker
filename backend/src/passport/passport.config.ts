import bcrypt from "bcrypt";
import { GraphQLLocalStrategy } from "graphql-passport";
import passport from "passport";
import User from "src/models/user.model";

export const configurePassport = async () => {
    //these two functions are used to serialize and deserialize the user object, to open sessions
    passport.serializeUser((user: any, done) => {
        console.log("Serializing user");
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        console.log("Deserializing user");
        try {
            const user = await User.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    });

    //this is the local strategy used to authenticate the user
    passport.use(
        new GraphQLLocalStrategy(async (username, password, done) => {
            try {
                const user = await User.findOne({ username });
                const validPassword = await bcrypt.compare(password, user.password);
                if (!user || !validPassword) {
                    throw new Error("Invalid username or password");
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        })
    );
};