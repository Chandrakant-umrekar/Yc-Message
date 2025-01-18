import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("already connected to db");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    connection.isConnected = db.connections[0].readyState; //readyState gives number
    console.log("DB connected successfully");
  } catch (err) {
    console.log("Database connection failed : ", err);
    process.exit(1); //restart the server
  }
}

export default dbConnect;
