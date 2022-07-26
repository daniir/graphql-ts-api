import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express, { Express } from 'express';
import http from 'http';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { AuthResolvers } from './resolvers/authResolvers';
import { verifyToken } from './utils/tokenHandler';
import { TasksResolvers } from './resolvers/TasksResolvers';

export default async function startApolloServer(): Promise<Express> {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolvers, TasksResolvers],
    }),
    csrfPrevention: true,
    cache: 'bounded',
    context: ({req}) => ({
      user: verifyToken(req.headers?.authorization)
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  await server.applyMiddleware({ app, path: '/api' });

  return app;
  
};