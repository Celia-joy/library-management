import express from 'express';
import {PORT} from './config/env.js';
import connectDB from './Database/mongodb.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/',(req, res)=>{
    res.send('Welcome to the library management system');
});
await connectDB();
app.listen(PORT, async ()=>{
    console.log(`Server is running on port ${PORT}`);    
});