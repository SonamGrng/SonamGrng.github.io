import mongoose from 'mongoose';

export async function connectToMongo(uri) {
  if (!uri) {
    throw new Error('Missing MONGODB_URI in environment');
  }
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  return mongoose.connection;
}
