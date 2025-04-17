// import './config/instrument.js'
// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './config/db.js';
// import * as Sentry from "@sentry/node";
// import { clerkWebhooks } from './controllers/webhooks.js'
// <<<<<<< HEAD
// import companyRoutes from './routes/companyRoutes.js'
// import connectCloudinary from './config/cloudinary.js';
// import jobRoutes from './routes/jobRoutes.js';
// import userRoutes from './routes/userRoutes.js';
// import {clerkMiddleware} from '@clerk/express';
// =======
// >>>>>>> ea0fbc0276cd166f04f1dc357e9bdf8db86abdd2



// // Initialize Express
// const app = express();

// //Connect to database
// await connectDB()
// <<<<<<< HEAD
// await connectCloudinary()
// =======
// >>>>>>> ea0fbc0276cd166f04f1dc357e9bdf8db86abdd2

// // Middlewares
// app.use(cors());
// app.use(express.json())
// <<<<<<< HEAD
// app.use(clerkMiddleware())
// =======
// >>>>>>> ea0fbc0276cd166f04f1dc357e9bdf8db86abdd2

// // Routes
// app.get('/',(req, res)=> res.send("API Working"))
// app.get("/debug-sentry", function mainHandler(req, res) {
//     throw new Error("My first Sentry error!");
//   });

// app.post('/webhooks',clerkWebhooks)
// <<<<<<< HEAD
// app.use('/api/company',companyRoutes)
// app.use('/api/jobs',jobRoutes)
// app.use('/api/users', userRoutes)

// =======
// >>>>>>> ea0fbc0276cd166f04f1dc357e9bdf8db86abdd2
  

// // port
// const PORT = process.env.PORT || 5000;

// Sentry.setupExpressErrorHandler(app);

// app.listen(PORT,()=>{
//     console.log(`Server is running on port ${PORT}`);
// })


import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js';
import companyRoutes from './routes/companyRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { clerkMiddleware } from '@clerk/express';

// Initialize Express
const app = express();

// Connect to database and Cloudinary
await connectDB();
await connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.get('/', (req, res) => res.send("API Working"));

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.post('/webhooks', clerkWebhooks);
app.use('/api/company', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

// Port
const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

