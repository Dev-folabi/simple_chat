import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret = 'JWT_SECRET_KEY';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const decoded = jwt.verify(token, secret);
        (req as any).user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};
