import { Router } from 'express';
import { getMessages } from '../controllers/chatController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat messaging routes
 */

/**
 * @swagger
 * /api/chat/messages:
 *   get:
 *     summary: Get all chat messages
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           description: Bearer token for user authentication
 *     responses:
 *       200:
 *         description: A list of chat messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sender:
 *                     type: string
 *                     description: The sender of the message
 *                   content:
 *                     type: string
 *                     description: The content of the message
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     description: The time when the message was sent
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
router.get('/messages', verifyToken, getMessages);

export default router;
