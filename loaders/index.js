import expressLoader from './express';
import mongooseLoader from './mongoDB';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  console.log('MongoDB Initialized');
  await expressLoader({ app: expressApp });
  console.log('Express Initialized');

  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want
}