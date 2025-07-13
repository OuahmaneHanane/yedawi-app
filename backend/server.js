import express from 'express';
import { connectDB } from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer'; 
import fs from 'fs';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import menuRoutes from './routes/userMenuRoutes.js';
import userRoutes from './routes/userRoutes.js';   // keep only one import here
import donationRoutes from './routes/donationRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

import path from 'path';

dotenv.config();

const port = process.env.PORT;
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('Uploads directory created.');
}

const app = express()

// Allow requests from Vite dev server
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/user/donations', donationRoutes);
app.use('/api/user/requests', requestRoutes); 
app.use('/api/requests', requestRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', menuRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(morgan('dev'));

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message.includes("Unsupported")) {
    return res.status(400).json({ message: err.message });
  }
  next(err);
});

(async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
})();
