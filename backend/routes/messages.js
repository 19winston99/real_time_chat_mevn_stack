import express from 'express';
import { deleteMessage, getMessages, insertMessage, updateMessage } from '../controllers/messages';
const router = express.Router();

router.get('/', getMessages);
router.post('/', insertMessage);
router.patch('/:id', updateMessage);
router.delete('/:id', deleteMessage);

export default router;