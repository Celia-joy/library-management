import express from 'express';
import {PORT} from './config/env.js';
import connectDB from './Database/mongodb.js';
import authRouter from './Routes/auth.routes.js';
import bookRouter from './Routes/book.routes.js';
import loanRouter from './Routes/loan.routes.js';
import errorMiddleware from './middleware/error.middleware.js';
import {startReminderScheduler} from './utils/scheduler.js';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();
app.use(cors());
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/',(req, res)=>{
    res.send('Welcome to the library management system API');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/loans', loanRouter);
app.use(errorMiddleware)


const startServer = async () => {
    await connectDB();
    startReminderScheduler();
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
}

startServer();