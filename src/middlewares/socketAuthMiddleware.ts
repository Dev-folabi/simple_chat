import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';


export const socketAuthMiddleware = (socket: Socket, next: (err?: ExtendedError) => void) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error('Authentication error'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        (socket as any).user = decoded;
        next();
    } catch (err) {
        next(new Error('Authentication error'));
    }
};
