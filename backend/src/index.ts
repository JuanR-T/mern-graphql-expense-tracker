import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import connectMongo from "connect-mongodb-session";
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import { buildContext } from 'graphql-passport';
import http from 'http';
import passport from 'passport';
import path from 'path';
import { connectDB } from './db/connecDB';
import { configurePassport } from './passport/passport.config';
import mergedResolvers from './resolvers';
import mergedTypeDefs from './typeDefs';

dotenv.config();
configurePassport();
const __dirname = path.resolve();
const app = express();
const httpServer = http.createServer(app);

const MongoDBStore = connectMongo(session);

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions',
});

store.on("error", (err) => console.error(err));

app.use (
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
        },
        store: store,
    })
)
app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
    '/graphql',
    cors<cors.CorsRequest>(
        {
            origin: 'http://localhost:3000',
            credentials: true,
        }
    ),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req, res }) => (buildContext({req, res})),
    }),
);

app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});


await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
);

await connectDB();

console.log(`Server ready at http://localhost:4000`);