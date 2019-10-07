import mongoose from 'mongoose';

export const establishConnection = async () => {
    try {
        mongoose.connect('mongodb://localhost:27017/carLoansCanada', { useNewUrlParser: true, useUnifiedTopology: true })        
    } catch (error) {
        console.log("error in connection", error)
    }
    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
}