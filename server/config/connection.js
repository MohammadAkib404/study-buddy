import mongoose from "mongoose";
import 'dotenv/config'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB Connected");
    } catch (error) {
        console.log('DB Connection Failed:', error);
        process.exit(1);
    }
}

mongoose.connection.on("disconnected", () => {
  console.log("DB Disconnected");
});

export default connectDB;