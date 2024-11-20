import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env['DB_CONNECTION']!, {        
        dbName:"kyc",        
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

export default connectDB;