import { Request,Response } from "express";
import { register, login } from "../service/authService";


export const registerUser = async (req: Request, res: Response) => {
    try {
        const token = await register(req.body.username, req.body.password);
        res.json({ token });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const token = await login(req.body.username, req.body.password);
        res.json({ token });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};