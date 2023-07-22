import express from 'express';
import { deleteUser, getAllUsers, updateUser } from '../controllers/users.js';

const router = express.Router();

router.get('/', getAllUsers);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;