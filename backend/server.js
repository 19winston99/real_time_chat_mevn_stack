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
import { uploadUsersImages, uploadMessagesImages } from './middlewares/imageUpload.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
dotenv.config();
const PORT = process.env.PORT || 3000;

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(helmet());
app.use(cookieParser());
app.use(mongoSanitize());

// app.use(cors({
//     credentials: true,
//     // origin: 'http://localhost:5173',
// }));

//ROUTES
app.use('/auth', uploadUsersImages.single('image'), authRoutes);
app.use('/users', authenticateToken, uploadUsersImages.single('image'), usersRoutes);
app.use('/messages', authenticateToken, uploadMessagesImages.single('image'), messagesRoutes);
app.use('/usersBlocked', authenticateToken, usersBlockedRoutes);

// Integrazione di Socket.IO
io.on('connection', (socket) => {
    socket.on("newUserConnected", (user) => {
        socket.broadcast.emit('newUserNotification', user);
    });

    socket.on('disconnect', () => {
        socket.disconnect();
    })

});

//CONNECT TO MONGO DB
mongoose.connect(process.env.CONNECTION_URL)
    .then(() => {
        server.listen(PORT, () => console.log(`server running on port: ${PORT}`));
    })
    .catch(error => console.log(error));