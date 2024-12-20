import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { connectDB } from './db/connecDB';
import mergedResolvers from './resolvers';
import mergedTypeDefs from './typeDefs';

dotenv.config();
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
    '/',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req }) => ({req}),
    }),
);

await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
);

await connectDB();

console.log(`Server ready at http://localhost:4000`);