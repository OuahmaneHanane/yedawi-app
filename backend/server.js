import express from 'express';
import { connectDB } from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer'; 

import authRoutes from './routes/authRoutes.js';
import menuRoutes from './routes/userMenuRoutes.js';
import userRoutes from './routes/userRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import adminRoutes from './routes/adminRoutes.js';


dotenv.config();

const port = process.env.PORT;


const app = express()
 // Allow requests from Vite dev server
app.use(cors(
    {
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/user/donations', donationRoutes);
app.use('/api/user/requests', requestRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', menuRoutes);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message.includes("Unsupported")) {
    return res.status(400).json({ message: err.message });
  }
  next(err);
});

// app.listen(port, () =>{
//     connectDB(),
//     console.log(`your app is running on port ${port}`);
// })
(async () => {
  try {
    await connectDB();                     // wait for DB
    app.listen(port, () =>
      console.log(`server running on port ${port}`)
    );
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
})();
