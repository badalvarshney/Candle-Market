import dns from "dns";
import mongoose from "mongoose";

// Set Google DNS to fix MongoDB SRV (querySrv ECONNREFUSED) lookup issues on local ISP/Windows
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (error) {
  console.warn("DNS setServers warning:", error.message);
}

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

export default connectDB;