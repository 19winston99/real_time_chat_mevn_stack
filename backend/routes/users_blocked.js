import express from 'express';
import { deleteUserBlocked, getUsersBlocked, insertUserBlocked } from '../controllers/users_blocked.js';

const router = express.Router();

router.get('/:id', getUsersBlocked);
router.post('/', insertUserBlocked);
router.delete('/:id', deleteUserBlocked);

export default router;