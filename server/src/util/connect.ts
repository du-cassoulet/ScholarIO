import mongoose from "mongoose";

export default async function connect() {
  const connection = await mongoose.connect(
    `mongodb+srv://${Bun.env.MONGODB_USERNAME}:${Bun.env.MONGODB_PASSWORD}@${Bun.env.MONGODB_CLUSTER_ID}.mongodb.net/?retryWrites=true&w=majority&appName=${Bun.env.APP_NAME}`
  );

  return connection;
}
