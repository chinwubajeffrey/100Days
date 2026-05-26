import mongoose from "mongoose";

async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`,
    );
    console.log(` \n The database connected successfully
        ${connectionInstance.connection.host}`);
  } catch (err) {
    console.log(`Connectioi failed`, err);
    process.exit(1);
  }
}

export default connectDB;
