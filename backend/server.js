import express from 'express';
import { connectDB } from './config/db.js';
const port = process.env.PORT;



const app = express()
app.listen(port, () =>{
    connectDB(),
    console.log(`your app is running on port ${port}`);
})

