import { Request, Response } from 'express';
import Message from '../models/chatModel'

export const getMessages = async (req: Request, res: Response) => {
    const messages = await Message.find();
    res.json(messages);
};
