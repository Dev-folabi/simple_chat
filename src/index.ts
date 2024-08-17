import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { connectDB } from './server';
import authRoutes from './routes/authRoute';
import chatRoutes from './routes/chatRoutes';
import Message from './models/chatModel';
import { setupSwagger } from './swagger';
import { socketAuthMiddleware } from './middlewares/socketAuthMiddleware'; 

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Setup Swagger
setupSwagger(app);

// Connect to the database
connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to connect to the database:', err);
    process.exit(1); // Exit process with failure
});

// Socket.IO authentication middleware
io.use(socketAuthMiddleware);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('sendMessage', async (data) => {
        try {
            const message = new Message({ sender: (socket as any).user.username, content: data.content });
            await message.save();
            io.emit('receiveMessage', message);
        } catch (err) {
            console.error('Error saving message:', err);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
