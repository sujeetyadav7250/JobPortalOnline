import mongoose  from "mongoose";

// Function to connect to MongoDB database

const connectDB = async () => {

    mongoose.connection.on(`connected`,() => console.log('Database Connected'))

    await mongoose.connect(`${process.env.MONGODB_URL}/job-portal`)

}

export default connectDB


//5:25