import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js'; 
import { connectDB } from './config/db.js';

dotenv.config();
connectDB();

const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@admin.com' });
    if (existingAdmin) {
      console.log(' Admin already exists.');
      process.exit();
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const newAdmin = new User({
      name: 'Super Admin',
      email: 'admin@admin.com',
      password: hashedPassword,
      role: 'admin',
    });

    await newAdmin.save();
    console.log(' Admin created successfully!');
    process.exit();
  } catch (err) {
    console.error(' Error creating admin:', err);
    process.exit(1);
  }
};

seedAdmin();