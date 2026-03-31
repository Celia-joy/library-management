import express from 'express';
import {PORT} from './config/env.js';
import connectDB from './Database/mongodb.js';
import authRouter from './Routes/auth.routes.js';
import errorMiddleware from './middleware/error.middleware.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1/auth', authRouter);
app.use(errorMiddleware)

app.get('/',(req, res)=>{
    res.send('Welcome to the library management system API');
});
await connectDB();
app.listen(PORT, async ()=>{
    console.log(`Server is running on port ${PORT}`);    
});