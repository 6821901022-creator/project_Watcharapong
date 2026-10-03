import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// เก็บ connection ไว้ใน global เพื่อไม่ให้เชื่อมต่อซ้ำตอน hot reload
const globalCache = globalThis as unknown as {
  mongooseConn?: Promise<typeof mongoose>;
};

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set in .env");
  }

  if (mongoose.connection.readyState === 1) return;

  if (!globalCache.mongooseConn) {
    globalCache.mongooseConn = mongoose.connect(MONGODB_URI);
  }

  try {
    await globalCache.mongooseConn;
  } catch (error) {
    globalCache.mongooseConn = undefined;
    throw error;
  }
}
