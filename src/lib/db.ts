import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern_auth_refreshToken_and_accessToken';

if (!MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable in .env.local');
}

let isConnected = 0; 

const connectDB = async (): Promise<void> => {
    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        const db = await mongoose.connect(MONGO_URI);
        isConnected = db.connections[0].readyState;
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Failed to connect to MongoDB');
    }
};


export default connectDB;

