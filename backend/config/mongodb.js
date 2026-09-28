import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("✅ Database Connected");
  });
  mongoose.connection.on("error", (err) => {
    console.error("❌ Database connection error:", err.message);
  });

  // NOTE: do not append a db name in the URI, we append it here (matches the
  // frontend/admin apps expecting a "doctor-booking" database)
  await mongoose.connect(`${process.env.MONGODB_URI}/doctor-booking`);
};

export default connectDB;
