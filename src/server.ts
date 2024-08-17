import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const dbURI = process.env.MongoDB_URI;
        
        if (!dbURI) {
            throw new Error('MongoDB_URI is not defined in the environment variables');
        }

        await mongoose.connect(dbURI);

        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); 
    }
};
