import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import usersRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import { authenticateToken } from './middlewares/auth.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(helmet());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

//USERS ROUTES
app.use('/auth', authRoutes);
app.use('/users', authenticateToken, usersRoutes);

//CONNECT TO MONGO DB
mongoose.connect(process.env.CONNECTION_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
    })
    .catch(error => console.log(error));