import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import usersRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import messagesRoutes from './routes/messages.js';
import usersBlockedRoutes from './routes/users_blocked.js';
import { authenticateToken } from './middlewares/auth.js';
import { upload } from './middlewares/imageUpload.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(express.static('../frontend/public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(helmet());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(cors({
    credentials: true,
    // origin: 'http://localhost:5173',
}));

//ROUTES
app.use('/auth', upload.single('image'), authRoutes);
app.use('/users', authenticateToken, usersRoutes);
app.use('/messages', authenticateToken, messagesRoutes);
app.use('/usersBlocked', authenticateToken, usersBlockedRoutes);

//CONNECT TO MONGO DB
mongoose.connect(process.env.CONNECTION_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
    })
    .catch(error => console.log(error));