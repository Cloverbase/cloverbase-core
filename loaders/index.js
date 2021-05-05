// import expressLoader from './express/index';
// import run from './mongoDB/index';

export default async (expressApp) => {
  const mongoConnection = await mongooseLoader();
  console.log('MongoDB Initialized');
  // await expressLoader(expressApp);
  console.log('Express Initialized');

  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want
}