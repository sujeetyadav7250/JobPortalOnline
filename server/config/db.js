// import mongoose  from "mongoose";

// // Function to connect to MongoDB database

// const connectDB = async () => {

//     mongoose.connection.on(`connected`,() => console.log('Database Connected'))

//     await mongoose.connect(`${process.env.MONGODB_URL}/job-portal`)

// }

// export default connectDB


// <<<<<<< HEAD
// //5:46
// =======
// //5:25
// >>>>>>> ea0fbc0276cd166f04f1dc357e9bdf8db86abdd2


import mongoose from "mongoose";

// Function to connect to MongoDB database
const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log('Database Connected'));
    await mongoose.connect(`${process.env.MONGODB_URL}/job-portal`);
};

export default connectDB;

