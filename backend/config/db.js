// import mongoose from "mongoose";
// import dns from "node:dns";

// // Fix for DNS resolution issues with MongoDB Atlas SRV records
// if (dns.setServers) {
//   dns.setServers(["8.8.8.8", "8.8.4.4"]);
// }

// const connectDB = async () => {
//   try {
//     if (!process.env.MONGO_URI) {
//       throw new Error("MONGO_URI is not defined in environment variables");
//     }
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB Connected ✅");
//   } catch (error) {
//     console.error("DB CONNECTION ERROR ❌");
//     console.error("Name:", error.name);
//     console.error("Message:", error.message);
//     if (error.reason) console.error("Reason:", error.reason);
//     process.exit(1);
//   }
// };

// export default connectDB;

import mongoose from "mongoose";
import dns from 'dns'
// dns.setServers(["1.1.1.1","8.8.8.8"]);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;