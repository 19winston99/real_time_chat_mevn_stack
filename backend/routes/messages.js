import express from 'express';
import { deleteMessage, getConversations, getMessages, insertMessage, updateMessage } from '../controllers/messages.js';
const router = express.Router();

router.get('/', getMessages);
router.get('/conversations/:id', getConversations);
router.post('/', insertMessage);
router.patch('/:id', updateMessage);
router.delete('/:id', deleteMessage);

export default router;