import mongoose from "mongoose";

const connection = async () => {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true, // Though deprecated, it's fine to keep as it doesn't harm
            });
            console.log("Database connected successfully");
        } else {
            console.log("Already connected to the database");
        }
    } catch (error) {
        console.error("Database connection error:", error.message);
    }
};

export default connection;
